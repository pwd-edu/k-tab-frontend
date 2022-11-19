import { Home } from "./Home"
import { Navbar } from "./Navbar"
import { Editor, Editor2 } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<Editor2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
