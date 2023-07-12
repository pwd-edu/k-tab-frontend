import { initJwtToken } from "@auth/helpers"
import { DEFAULT_THEME } from "@mantine/core"
import { MantineProvider, MantineTheme } from "@mantine/core"
import * as React from "react"
import * as ReactDOM from "react-dom/client"

import App from "./App"
import { MyGlobalStyles } from "./GlobalStyles"
import "./index.css"
import "./preflight.css"

// Specify weight and style

const APP_THEME: MantineTheme = {
    ...DEFAULT_THEME,
    fontFamily: "Roboto, Noto Sans JP, sans-serif, Helvetica, sans-serif",
    headings: {
        ...DEFAULT_THEME.headings,
        fontFamily: "Roboto, Noto Sans JP, sans-serif, Helvetica, sans-serif",
    },
    primaryColor: "indigo",
    spacing: {
        ...DEFAULT_THEME.spacing,
        xxs: "8px",
        xxxs: "6px",
    },
    primaryShade: 7,
}

const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register(
            import.meta.env.MODE === "production" ? "/service-worker.js" : "/dev-sw.js?dev-sw"
        )
    }
}

registerServiceWorker()

initJwtToken().then(() => {
    setTimeout(() => {
        ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
            <React.StrictMode>
                <MantineProvider theme={APP_THEME}>
                    <MyGlobalStyles />
                    <App />
                </MantineProvider>
            </React.StrictMode>
        )
    }, 1000)
})
