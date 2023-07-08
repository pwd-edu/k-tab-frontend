import { JWT_TOKEN, AUTHOR_JWT, USE_STATIC_JWT, STUDENT_JWT } from "../constants"

const PRODUCTION = import.meta.env.PROD

export const getJwtToken = () => {
    if (!PRODUCTION && USE_STATIC_JWT) {
        if (USE_STATIC_JWT === "STUDENT" && STUDENT_JWT) {
            return STUDENT_JWT
        }
        if (USE_STATIC_JWT === "AUTHOR" && AUTHOR_JWT) {
            return AUTHOR_JWT
        }
    }
    return localStorage.getItem(JWT_TOKEN)
}

export const getAuthHeader = () => "Bearer " + getJwtToken()
