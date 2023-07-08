import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            srcDir: "src",
            filename: "service-worker.ts",
            strategies: "injectManifest",
            manifest: false,
            injectManifest: {
                injectionPoint: null,
                rollupFormat: "iife",
            },
            devOptions: {
                enabled: true,
                type: "classic",
            },
        }),
    ],
})
