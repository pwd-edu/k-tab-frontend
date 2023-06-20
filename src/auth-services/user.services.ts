import axios from "axios";
import authHeader from "./auth-header";
import { URL } from "../constants"

//endpoint to get all users (not yet)
export const getPublicContent = () => {
    return axios.get(`${URL}/all`)
}

export const getAuthors = () => {
    return axios.get(`${URL}/author`, { headers: authHeader() });
};

export const getStudents = () => {
    return axios.get(`${URL}/student`, { headers: authHeader() });
};