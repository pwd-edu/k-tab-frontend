import { Home } from "./Home"
import { Navbar } from "./Navbar"
import { LessonEditor } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateStudent from "./CreateStudent"
import CreateAuthor from "./CreateAuthor"
import Login from "./login"
import { Library } from "./StudentLibrary"
import LessonsNavDrawer from "./LessonsNavDrawer"
import BookInfo from "./BookInfo"
import ControlledRadioButtonsGroup from "./radiobtn"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<LessonEditor />} />
                <Route path="/student" element={<CreateStudent />} />
                <Route path="/author" element={<CreateAuthor/>} />
                <Route path="/user" element={<Login />} />
                <Route path="/library" element={<Library />} />
                <Route path="/navdraw" element={<LessonsNavDrawer/>} />
                <Route path="/bookinfo" element={<BookInfo/>} />
                <Route path="/radio" element={<ControlledRadioButtonsGroup/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
