import { JWT_TOKEN } from "../constants"

export const getJwtToken = () => {
    return localStorage.getItem(JWT_TOKEN)
}

export const getAuthHeader = () => "Bearer " + getJwtToken()
