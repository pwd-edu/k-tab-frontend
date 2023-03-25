import { Home } from "./Home"
import { Navbar } from "./Navbar"
import { LessonEditor } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateStudent from "./CreateStudent"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<LessonEditor />} />
                <Route path="/student" element={<CreateStudent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
