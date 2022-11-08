import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { MyGlobalStyles } from "./GlobalStyles"
import { MantineProvider } from "@mantine/core"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={{ fontFamily: "nunito" }}>
            <MyGlobalStyles />
            <App />
        </MantineProvider>
    </React.StrictMode>
)
