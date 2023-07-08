import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { AuthorClient, axios_instance } from "../fetch"
import { JWT_TOKEN } from "../constants"
import { getJwtToken } from "./helpers"

const author_client = AuthorClient()

export function useAuth() {
    const {
        data: user,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["user"],
        queryFn: () => author_client.get(),
        retry: false,
        staleTime: 1000 * 5 * 60, // 5min
        enabled: !!getJwtToken(),
    })

    const login = useCallback(async (email: string, password: string) => {
        const res = await axios_instance.post(`/api/security/login/`, { email, password })
        localStorage.setItem(JWT_TOKEN, res.data.token)
        return res.data
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(JWT_TOKEN)
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
