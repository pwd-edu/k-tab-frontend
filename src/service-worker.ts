const sw: ServiceWorkerGlobalScope = self as any

sw.addEventListener("fetch", async (event: FetchEvent) => {
    const request = event.request

    // Intercept GET requests for image files
    if (
        (request.method === "GET" && request.url.endsWith(".jpg")) ||
        request.url.endsWith(".jpeg") ||
        request.url.endsWith(".png") ||
        request.url.endsWith(".gif")
    ) {
        console.log("Intercepted image request: " + request.url)
        const headers = new Headers(request.headers)
        headers.set("Content-Type", "image/png")
        headers.set("Authorization", "Bearer <TOKEN>")
        const new_request = new Request(request.url, {
            headers: headers,
            method: request.method,
        })

        const res_placehodler = fetch(new_request, {
            mode: "cors",
            redirect: "follow",
        })

        const redirect_res = res_placehodler.then((res) => {
            const empty_headers = new Headers()
            if (res.redirected) {
                const new_redirect = new Request(res.url, {
                    method: "GET",
                    headers: empty_headers,
                    mode: "cors",
                    redirect: "follow",
                })
                return fetch(new_redirect)
            } else {
                return res
            }
        })

        event.waitUntil(redirect_res)
        event.respondWith(redirect_res)
    }
})
