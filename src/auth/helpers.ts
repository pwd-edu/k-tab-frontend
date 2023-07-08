import { JWT_TOKEN, AUTHOR_JWT, USE_STATIC_JWT, STUDENT_JWT } from "../constants"
import * as idbKeyval from "idb-keyval"

const PRODUCTION = import.meta.env.PROD

const initJwtToken = async () => {
    if (!PRODUCTION && USE_STATIC_JWT) {
        if (USE_STATIC_JWT === "STUDENT" && STUDENT_JWT) {
            await setJwtToken(STUDENT_JWT)
        }
        if (USE_STATIC_JWT === "AUTHOR" && AUTHOR_JWT) {
            return await setJwtToken(AUTHOR_JWT)
        }
    }
    return null
}

export const getJwtToken = async () => {
    const token = await idbKeyval.get(JWT_TOKEN)
    return token || (await initJwtToken())
}

export const setJwtToken = async (token: string) => {
    await idbKeyval.set(JWT_TOKEN, token)
    return token
}

export const removeJwtToken = async () => {
    await idbKeyval.del(JWT_TOKEN)
}

export const getAuthHeader = async () => {
    const token = await getJwtToken()
    return "Bearer " + token
}
