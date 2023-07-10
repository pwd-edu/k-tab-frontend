import { CenteredLoading } from "@components/shared"
import { NotAuthorized } from "@layout/Forbidden403"
import { Navigate, Outlet } from "react-router-dom"

import { AuthStatus, useAuthSession } from "./useAuthSession"

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const { status, user } = useAuthSession()

    if (status === AuthStatus.LOADING) {
        return <CenteredLoading />
    }

    if (status === AuthStatus.UNAUTHENTICATED) {
        return <Navigate to="/login" />
    }

    if (allowedRoles.includes(user?.userType || "NOT_AUTHORIZED")) {
        return <Outlet />
    }
    return <NotAuthorized />
}

export default PrivateRoute
