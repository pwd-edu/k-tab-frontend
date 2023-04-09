import { Home } from "./Home"
import { Navbar } from "./Navbar"
import { LessonEditor } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateStudent from "./CreateStudent"
import CreateAuthor from "./CreateAuthor"
import Create from "./Creat"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<LessonEditor />} />
                <Route path="/student" element={<CreateStudent />} />
                <Route path="/author" element={<CreateAuthor/>} />
                <Route path="/user" element={<Create />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
