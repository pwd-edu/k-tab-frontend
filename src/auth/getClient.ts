import { TYPE } from "../constants"
import { AuthorClient, StudentClient } from "../fetch"

export const type = localStorage.getItem(TYPE)

export const getClient = () => {
    if (type === "STUDENT") {
        return StudentClient() as any
    } else {
        return AuthorClient() as any
    }
}
