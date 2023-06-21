import { Home } from "./Home"
import { LessonEditor } from "./editor/Editor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateStudent from "./CreateStudent"
import CreateAuthor from "./CreateAuthor"
import Login from "./login"
import { Library } from "./StudentLibrary"
import { BookInfoForm } from "./BookInfo"
import StudentBookInfo from "./StudentBookInfo"
import UserInfoAction from "./UserProfile"
import ProfileSettings from "./UserProfileSettings"
import DarkMode from "./ChangeStyle"
import UserSettingsData from "./UserUISettingsData"

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
                <Route path="/bookinfo" element={<BookInfoForm />} />
                <Route
                    path="/bookcard"
                    element={
                        <StudentBookInfo
                            title={"Mariam Notes"}
                            cover_img={""}
                            abstract={"this the best book you caan have"}
                            average_rating={10}
                            price={500}
                            edit_date={new Date()}
                            publish_date={new Date()}
                            tags={["AI", "Python"]}
                        />
                    }
                />
                {/* <Route path="/settings" element={<UIsettings
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
          }]} />} /> */}

                {/* <Route path="/settings" element={<UIsettings
          data={[
            {
              "name": 'authorSettingsId',
              "type": 'UUID',
              "value": '9c882b90-e546-4e87-9634-f7e444f58ffd'
            },
            { "name": 'brightnessLevel', "type": "Integer", "value": "10" },
            { "name": 'contrastLevel', "type": 'Integer', "value": " 10" }
          ]}
        />} /> */}

                <Route
                    path="/profile"
                    element={
                        <UserInfoAction
                            profilephoto_url={
                                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                            }
                            name={"Jane Fingerlicker"}
                            email={"jfingerlicker@me.io"}
                            bio={"blablabla blablabla "}
                        />
                    }
                />
                <Route path="/settingsdata" element={<UserSettingsData />} />
                <Route path="/profilesettings" element={<ProfileSettings />} />
                <Route path="/darkmode" element={<DarkMode component={<LessonEditor />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
