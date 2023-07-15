import * as idbKeyval from "idb-keyval"

import { AUTHOR_JWT, JWT_TOKEN, STUDENT_JWT, TYPE, USE_STATIC_JWT } from "../constants"

const PRODUCTION = import.meta.env.PROD

export const initJwtToken = async () => {
    if (PRODUCTION && USE_STATIC_JWT) {
        if (USE_STATIC_JWT === "STUDENT" && STUDENT_JWT) {
            setUserType("STUDENT")
            return await setJwtToken(STUDENT_JWT)
        }
        if (USE_STATIC_JWT === "AUTHOR" && AUTHOR_JWT) {
            setUserType("AUTHOR")
            return await setJwtToken(AUTHOR_JWT)
        }
    }
    return null
}

export const getJwtToken = async () => {
    return await idbKeyval.get(JWT_TOKEN)
}

export const setUserType = (userType: string) => {
    localStorage.setItem(TYPE, userType)
}

export const getUserType = () => {
    return localStorage.getItem(TYPE)
}

export const removeUserType = () => {
    localStorage.removeItem(TYPE)
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
