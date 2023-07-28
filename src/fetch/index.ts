import axios from "axios"

import { getAuthHeader } from "../auth/helpers"
import {
    AiClientType,
    AuthorCLientType,
    Book,
    BookClientType,
    Chapter,
    ChapterClientType,
    ChapterPresigned,
    CreateBookRequest,
    CreateChapterRequest,
    ImageDescription,
    ImageDescriptionSchema,
    ImagePresigned,
    ImagePresignedSchema,
    S3ClientType,
    StudentCLientType,
    Tags,
    UserClientType,
} from "./types"

const API_URL = import.meta.env.VITE_API_URL

export const axios_instance = axios.create({
    baseURL: API_URL,
    maxRedirects: 0,
})

axios_instance.interceptors.request.use(async (config) => {
    const auth_header = await getAuthHeader()
    if (auth_header) {
        config.headers["Authorization"] = auth_header
    }
    return config
})

export const BookClient = (): BookClientType => ({
    post: async (book: CreateBookRequest): Promise<Book> => {
        const response = await axios_instance.post(`/book`, book)
        return response.data
    },
    get: async (book_id: string): Promise<Book> => {
        const response = await axios_instance.get(`/book/`, { params: { bookId: book_id } })
        return response.data
    },
    getAllBooksTags: async (): Promise<Tags> => {
        const response = await axios_instance.get("/book/tags/")
        return response.data
    },
})

export const ChapterClient = (): ChapterClientType => ({
    post: async (chapter: CreateChapterRequest): Promise<Chapter> => {
        const response = await axios_instance.post(`/chapter`, chapter)
        return response.data
    },
    get: async (chapterId: string): Promise<Chapter> => {
        const response = await axios_instance.get(`/chapter/`, { params: { chapterId } })
        return response.data
    },
    getChapterComments: async (chapterId: string) => {
        const response = await axios_instance.get(`/chapter/all-comments/`, {
            params: { chapterId },
        })
        return response.data
    },
    postChapterComment: async (chapterId: string, comment: string) => {
        const response = await axios_instance.post(`/chapter/comment/`, {
            chapterId,
            content: comment,
            hasMentions: false,
        })
        return response.data
    },
})

export const S3Client = (): S3ClientType => ({
    getChapterPresignedUpload: async (content_path: string): Promise<string> => {
        const response = await axios_instance.get(`/s3/save-content/?contentPath=${content_path}`)
        return response.data
    },
    getChapterPresignedDownload: async (chapter_id: string): Promise<ChapterPresigned> => {
        const response = await axios_instance.get(`/s3/read/?chapterId=${chapter_id}`)
        return response.data
    },
    getImagePresignedUpload: async (chpater_id: string): Promise<ImagePresigned> => {
        const response = await axios_instance.get(`/s3/image/`, {
            params: { chapterId: chpater_id },
        })
        return ImagePresignedSchema.parse(response.data)
    },
    uploadChapterContent: async (presigned_url, chapter_content): Promise<void> => {
        const chapter_blob = new Blob([JSON.stringify(chapter_content)], { type: "text/json" })
        await axios.put(presigned_url, chapter_blob)
    },
    getImgResourceRedirect: async (resource_path: string): Promise<string> => {
        try {
            const response = await axios_instance.get(`/s3/resources/`, {
                params: { resourcePath: resource_path },
            })
            const imageUrl = URL.createObjectURL(
                new Blob([response.data.Body], { type: response.data.ContentType })
            )
            return imageUrl
        } catch (error) {
            console.log(error)
        }
        return ""
    },
})

export const AiClient = (): AiClientType => ({
    getImageDescription: async (image_path: string): Promise<ImageDescription> => {
        const response = await axios_instance.get(`/s3/description/`, {
            params: { imagePath: image_path },
        })

        return ImageDescriptionSchema.parse(response.data)
    },
})

export const UserClient = (): UserClientType => ({
    get: async (user_id?: string) => {
        const response = await axios_instance.get(`/user/`, {
            params: { ...(user_id && { userId: user_id }) },
        })
        return response.data
    },
    login: async (email: string, password: string) => {
        const res = await axios_instance.post(`/api/security/login/`, { email, password })
        return res.data
    },
})

export const AuthorClient = (): AuthorCLientType => ({
    get: async (authorId?: string) => {
        const response = await axios_instance.get(`/author/`, { params: { authorId } })
        return response.data
    },
    getBooks: async () => {
        const response = await axios_instance.get(`/author/home/`)
        return response.data
    },
    getBookInfo: async (bookId: string) => {
        const response = await axios_instance.get("/book/", { params: { bookId } })
        return response.data
    },
    getProfile: async (authorId: string) => {
        const response = await axios_instance.get("/author/profile/", { params: { authorId } })
        return response.data
    },
    getTopThreeBookViews: async () => {
        const response = await axios_instance.get("/Author-Dashboard/top3-books/")
        return response.data
    },
    getStudentsDisabilitesDistribution: async () => {
        const response = await axios_instance.get("/Author-Dashboard/disabilities-count/")
        return response.data
    },
})

export const StudentClient = (): StudentCLientType => ({
    get: async (studentId?: string) => {
        const response = await axios_instance.get(`/student/`, { params: { studentId } })
        return response.data
    },
    getLibrary: async () => {
        const response = await axios_instance.get(`/payment/library/`)
        return response.data
    },
    getFavourites: async () => {
        const response = await axios_instance.get(`/payment/fav/`)
        return response.data
    },
    removeFavourite: async (book_id: string) => {
        const response = await axios_instance.delete("/payment/remove-from-fav/", {
            params: { bookId: book_id },
        })
        return response.data
    },
    addFavourite: async (book_id: string) => {
        const response = await axios_instance.post(`/payment/add-to-fav/?bookId=${book_id}`)
        return response.data
    },
    getProfile: async (studentId: string) => {
        const response = await axios_instance.get("/student/profile/", { params: { studentId } })
        return response.data
    },
    getBookstore: async (
        op: string,
        nxt?: string,
        pre?: string,
        ti?: string,
        tgs?: string,
        filtr?: string
    ) => {
        const response = await axios_instance.get(`/student/home/`, {
            params: {
                operation: op, //operation: this.operation
                ...(nxt ? { next: nxt } : {}),
                ...(pre && { prev: pre }),
                ...(ti && { title: ti }),
                ...(tgs && { tag: tgs }),
                ...(filtr && { filter: filtr }),
            },
        })
        return response.data
    },
    postBookPayment: async (book_id: string) => {
        const response = await axios_instance.post(`/payment/buy/?bookId=${book_id}`)
        return response.data
    },
})

export const RESOURCE_URL = (resource_path: string) =>
    `${API_URL}/s3/resources/?resourcePath=${resource_path}`
