import axios from "axios";
import { URL } from "../constants"
import { Author, Student } from "../user-types/types"

export const registerAuthor = ({ authorName,
    authorEmail,
    password,
    contact,
    profilePhotoAsBinaryString }: Author) => {
    return axios.post(URL + "author/signup", {
        authorName,
        authorEmail,
        password,
        contact,
        profilePhotoAsBinaryString
    });
};


export const registerStudent = ({ studentName,
    studentEmail,
    password,
    contact,
    educationLevel,
    profilePhotoAsBinaryString,
    disabilities }: Student) => {
    return axios.post(URL + "student/signup", {
        studentName,
        studentEmail,
        password,
        contact,
        educationLevel,
        profilePhotoAsBinaryString,
        disabilities
    });
};

export const login = (email: string, password: string) => {
    return axios.post(URL + 'api/security/login/', {
        email,
        password,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data
    })
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        return JSON.parse(userStr)
    }
    else {
        return null
    }
};
