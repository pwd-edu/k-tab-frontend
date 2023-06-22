import { VALID_TOKEN } from "../constants"

export const getJwtToken = () => {
    return VALID_TOKEN
}

export const getAuthHeader = () => "Bearer " + getJwtToken()
