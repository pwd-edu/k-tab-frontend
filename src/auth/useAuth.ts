import { useCallback } from "react"
import { JWT_TOKEN, TYPE } from "../constants"
import { getJwtToken } from "./helpers"
import { getClient } from "./getClient"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { axios_instance } from "../fetch"
import { removeJwtToken, setJwtToken } from "./helpers"

const user_client = getClient()

export function useAuth(withUser = false) {
    const queryClient = useQueryClient()
    const {
        data: user,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: [`user`],
        queryFn: () => user_client.get(),
        retry: false,
        staleTime: 1000 * 5 * 60, // 5min
        enabled: withUser,
    })

    const login = useCallback(async (email: string, password: string) => {
        const res = await axios_instance.post(`/api/security/login/`, { email, password })
        await setJwtToken(res.data.token)
        await refetch()
        return res.data
    }, [])

    const logout = useCallback(async () => {
        await removeJwtToken()
        await queryClient.resetQueries({ queryKey: ["user"], exact: true })
    }, [])

    return {
        user,
        error,
        isLoading: isFetching,
        isAuthenticated: !!user,
        login,
        logout,
    }
}
