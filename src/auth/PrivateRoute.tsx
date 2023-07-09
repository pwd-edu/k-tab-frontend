import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./useAuth"

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth(true)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
