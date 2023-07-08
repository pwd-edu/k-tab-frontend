importScripts("https://cdnjs.cloudflare.com/ajax/libs/idb-keyval/6.2.1/umd.js")
const sw: ServiceWorkerGlobalScope & {
    idbKeyval: typeof import("idb-keyval")
} = self as any

sw.addEventListener("fetch", (event: FetchEvent) => {
    const request = event.request

    // Intercept GET requests for image files
    if (
        (request.method === "GET" && request.url.endsWith(".jpg")) ||
        request.url.endsWith(".jpeg") ||
        request.url.endsWith(".png") ||
        request.url.endsWith(".gif")
    ) {
        const out = sw.idbKeyval.get("jwt_token").then((token) => {
            return getProtectedImage(request, token)
        })
        event.respondWith(out)
    }
})

sw.addEventListener("install", () => {
    sw.skipWaiting()
})

async function getProtectedImage(request: Request, token: string) {
    const headers = new Headers(request.headers)
    headers.set("Content-Type", "image/png")
    headers.set("Authorization", `Bearer ${token}`)
    const authorized_req = new Request(request.url, {
        headers: headers,
        method: request.method,
    })

    const res = await fetch(authorized_req, {
        mode: "cors",
        redirect: "follow",
    })

    // SECURITY ISSUE: JWT TOKEN IS FORWARDED TO THE REDIRECTED URL (S3)
    // Browser still follows the redirect, but we can ignore the output
    const empty_headers = new Headers()
    if (res.redirected) {
        // ignore the redirect output and run it again
        const new_redirect = new Request(res.url, {
            method: "GET",
            headers: empty_headers,
            mode: "cors",
            redirect: "follow",
        })
        return getImageOrPlaceholder(new_redirect)
    }
    return res
}

async function getImageOrPlaceholder(request: Request) {
    const res = await fetch(request)
    if (res.headers.get("Content-Length") !== "0") {
        return res
    } else {
        return fetch("https://fakeimg.pl/300x300?text=Cover&font=bebas")
    }
}
