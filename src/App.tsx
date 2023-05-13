import { Home } from "./Home"
import { LessonEditor } from "./Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateStudent from "./CreateStudent"
import CreateAuthor from "./CreateAuthor"
import Login from "./login"
import { Library } from "./StudentLibrary"
import LessonsNavDrawer from "./LessonsNavDrawer"
import { BookInfoForm } from "./BookInfo"
import StudentBookInfo from "./StudentBookInfo"
import UIsettings from "./UserUISettings"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<LessonEditor />} />
                <Route path="/student" element={<CreateStudent />} />
                <Route path="/author" element={<CreateAuthor />} />
                <Route path="/user" element={<Login />} />
                <Route path="/library" element={<Library />} />
                <Route path="/navdraw" element={<LessonsNavDrawer />} />
                <Route path="/bookinfo" element={<BookInfoForm />} />
                <Route path="/bookcard" element={<StudentBookInfo title={"Mariam Notes"} 
                cover_img={""} abstract={"this the best book you caan have"} 
                average_rating={10} price={500} edit_date={new Date()} 
                publish_date={new Date()} tags={["AI", "Python"]} />} />
                <Route path="/settings" element={<UIsettings title={ "Configure notifications"} 
                description={"Choose what notifications you want to receive"} 
                data={[{
                    "type": "integer",
                    "title": "Messages",
                    "description": "Direct messages you have received from other users"
                  },
                  {
                    "type": "boolean",
                    "title": "Review requests",
                    "description": "Code review requests from your team members"
                  },
                  {
                    "type": "string",
                    "title": "Comments",
                    "description": "Daily digest with comments on your posts"
                  },
                  {
                    "type": "boolean",
                    "title": "Recommendations",
                    "description": "Digest with best community posts from previous week"
                  }]}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
