import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { UserClient } from "../fetch"
import { removeJwtToken, removeUserType, setJwtToken, setUserType } from "./helpers"

export function useAuth() {
    const user_client = UserClient()
    const queryClient = useQueryClient()

    const login = useCallback(async (email: string, password: string) => {
        const { token, userType } = await user_client.login(email, password)
        await setJwtToken(token)
        await setUserType(userType)
        queryClient.refetchQueries({ queryKey: ["user"], exact: true })
    }, [])

    const logout = useCallback(async () => {
        await removeJwtToken()
        await removeUserType()
        await queryClient.resetQueries({ queryKey: ["user"], exact: true })
    }, [])

    return { login, logout }
}
