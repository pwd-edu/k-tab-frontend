importScripts("https://cdnjs.cloudflare.com/ajax/libs/idb-keyval/6.2.1/umd.js")
const sw: ServiceWorkerGlobalScope & {
    idbKeyval: typeof import("idb-keyval")
} = self as any

sw.addEventListener("install", () => sw.skipWaiting())
sw.addEventListener("activate", () => sw.clients.claim())

sw.addEventListener("fetch", (event: FetchEvent) => {
    const request = event.request

    // Intercept GET requests for image files
    if (
        !request.url.includes("assets") &&
        request.method === "GET" &&
        (request.url.endsWith(".jpg") ||
            request.url.endsWith(".jpeg") ||
            request.url.endsWith(".png") ||
            request.url.endsWith(".gif"))
    ) {
        const out = sw.idbKeyval.get("jwt_token").then((token) => {
            return getProtectedImage(request, token)
        })
        event.respondWith(out)
    }
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

    const res_json = await res.json()
    const presigned_url = res_json["resourceUrl"]

    const new_redirect = new Request(presigned_url, {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
    })
    return getImageOrPlaceholder(new_redirect)
}

async function getImageOrPlaceholder(request: Request) {
    const res = await fetch(request)
    if (res.headers.get("Content-Length") !== "0") {
        return res
    } else {
        return fetch("https://placehold.co/512?text=Cover&font=roboto")
    }
}
