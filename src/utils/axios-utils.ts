import axios from "axios"
import { URL } from "../constants"

const client = axios.create({ baseURL: URL })

export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = localStorage.getItem("auth")
    const onSuccess = (response: any) => response
    const onError = (error: any) => {
        console.log(error)
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}
