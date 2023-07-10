import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
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
