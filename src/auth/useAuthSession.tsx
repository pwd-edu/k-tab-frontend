import { User } from "@fetch/types"
import { useQuery } from "@tanstack/react-query"

import { UserClient } from "../fetch"

const user_client = UserClient()

export function useAuthSession() {
    const {
        data: user,
        error,
        isFetching,
    } = useQuery({
        queryKey: [`user`],
        queryFn: () => user_client.get(),
        retry: false,
        staleTime: 1000 * 5 * 60, // 5min
    })

    return {
        user,
        error,
        status: getAuthStatus(user, error, isFetching),
    }
}

export enum AuthStatus {
    LOADING,
    AUTHENTICATED,
    UNAUTHENTICATED,
}

const getAuthStatus = (user: User | undefined, error: unknown, isFetching: boolean): AuthStatus => {
    if (isFetching) {
        return AuthStatus.LOADING
    }
    if (error) {
        return AuthStatus.UNAUTHENTICATED
    }
    if (user) {
        return AuthStatus.AUTHENTICATED
    }
    return AuthStatus.LOADING
}
