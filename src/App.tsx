import { Home } from "./Home"
import { Navbar } from "./Navbar"
import { LessonEditor } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<LessonEditor />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
