import { Navigate, Outlet } from "react-router-dom"

const RestrictedRoute = () => {
    const token = localStorage.getItem("auth")

    console.log("token", token)

    return <>{!token ? <Outlet /> : <Navigate to="/" />}</>
}

export default RestrictedRoute
