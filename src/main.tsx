import React from "react"
import ReactDOM from "react-dom/client"

import { DEFAULT_THEME } from "@mantine/core"
import { MantineProvider, MantineTheme } from "@mantine/core"
import { MyGlobalStyles } from "./GlobalStyles"

import App from "./App"
import "./index.css"
import "./preflight.css"

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={APP_THEME}>
            <MyGlobalStyles />
            <App />
        </MantineProvider>
    </React.StrictMode>
)

registerServiceWorker()
