import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./author-app/Home"
import { LessonEditor } from "./editor/Editor"
import CreateStudent from "./student-app/CreateStudent"
import CreateAuthor from "./author-app/CreateAuthor"
import Login from "./user-app/login"
import { Library } from "./student-app/StudentLibrary"
import { BookInfoForm } from "./author-app/BookInfo"
import StudentBookInfo from "./student-app/StudentBookInfo"
import UIsettings from "./user-app/UserUISettings"
import UserInfoAction from "./user-app/UserProfile"
import ProfileSettings from "./user-app/UserProfileSettings"
import DarkMode from "./ChangeStyle"
import UserSettingsData from "./user-app/UserUISettingsData"
import { PasswordInput } from "@mantine/core"
import AuthenticationForm from "./user-app/new_login"



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<LessonEditor />} />
        <Route path="/student" element={<CreateStudent />} />
        <Route path="/author" element={<CreateAuthor />} />
        <Route path="/user" element={<Login />} />
        {/* <Route path="/login" element={<AuthenticationForm/>}/> */}
        <Route path="/library" element={<Library />} />
        {/* <Route path="/navdraw" element={<LessonsNavDrawer />} /> */}
        <Route path="/bookinfo" element={<BookInfoForm />} />
        <Route path="/bookcard" element={<StudentBookInfo title={"Mariam Notes"}
          cover_img={""} abstract={"this the best book you caan have"}
          average_rating={10} price={500} edit_date={new Date()}
          publish_date={new Date()} tags={["AI", "Python"]} />} />


        <Route path="/profile" element={<UserInfoAction profilephoto_url={"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"}
          name={"Jane Fingerlicker"} email={"jfingerlicker@me.io"} bio={"blablabla blablabla "} />
        }
        />
        <Route path="/settingsdata" element={<UserSettingsData />} />
        <Route path="/profilesettings" element={<ProfileSettings />} />
        <Route path="/darkmode" element={<DarkMode component={<PasswordInput/>} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
