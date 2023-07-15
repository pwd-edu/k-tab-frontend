import { CommonRouteMapper } from "@components/CommonRouteMapper"
import { NotFound } from "@layout/Error404"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { MathJaxContext } from "better-react-mathjax"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import PrivateRoute from "./auth/PrivateRoute"
import { MJAX_CONFIG } from "./constants"
import { BookEditor } from "./views/author/BookEditor"
import Dashboard from "./views/author/Dashboard"
import { AuthorHome } from "./views/author/Home"
import { BookInfo } from "./views/student/BookInfo"
import { BookReader } from "./views/student/BookReader"
import { BookStore } from "./views/student/BookStore"
import Library from "./views/student/StudentLibrary"
import { ChapterComments } from "./views/user/ChapterComments"
import { UserProfile } from "./views/user/UserProfile"
import { LoginPage } from "./views/user/login"

const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MathJaxContext version={3} config={MJAX_CONFIG}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            element={<PrivateRoute allowedRoles={["ADMIN", "AUTHOR", "STUDENT"]} />}
                        >
                            <Route path="/" element={SharedHome} />
                            <Route path="/book/:book_id/:chapter_num" element={SharedBookView} />
                        </Route>
                        <Route element={<PrivateRoute allowedRoles={["STUDENT"]} />}>
                            <Route path="/library" element={<Library />} />
                            <Route path="/bookstore" element={<BookStore />} />
                        </Route>
                        <Route element={<PrivateRoute allowedRoles={["ADMIN", "AUTHOR"]} />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                        {/* for test  this will in be the reader */}
                        <Route
                            path="/comments"
                            element={
                                <ChapterComments
                                    chapter_id={"434e6d59-cf47-47ef-827f-826563baa061"}
                                />
                            }
                        />
                        <Route path="/user/:userId" element={<UserProfile />} />
                        <Route path="/bookinfo/:bookId" element={<BookInfo />} />
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </MathJaxContext>
        </QueryClientProvider>
    )
}

const SharedHome = (
    <CommonRouteMapper
        map={[
            { roles: ["AUTHOR", "ADMIN"], element: <AuthorHome /> },
            { roles: ["STUDENT"], element: <BookStore /> },
        ]}
    />
)

const SharedBookView = (
    <CommonRouteMapper
        map={[
            { roles: ["AUTHOR", "ADMIN"], element: <BookEditor /> },
            { roles: ["STUDENT"], element: <BookReader /> },
        ]}
    />
)

export default App
