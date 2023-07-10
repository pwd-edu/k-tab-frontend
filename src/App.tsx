import { NotFound } from "@layout/Error404"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import PrivateRoute from "./auth/PrivateRoute"
import { BookEditor } from "./views/author/BookEditor"
import Dashboard from "./views/author/Dashboard"
import { Home } from "./views/author/Home"
import { BookStore } from "./views/student/StudentBookStore"
import Library from "./views/student/StudentLibrary"
import { LoginPage } from "./views/user/login"

const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<PrivateRoute allowedRoles={["STUDENT"]} />}>
                        <Route path="/bookstore" element={<BookStore />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/library" element={<Library />} />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/book/:book_id/:chapter_num" element={<BookEditor />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
