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
} from "./editor/types"

const API_URL = "http://localhost:8080"

export const axios_instance = axios.create({
    baseURL: API_URL,
})

axios_instance.interceptors.request.use((config) => {
    const auth_header = getAuthHeader()
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
        console.log(chapter_blob)
        await axios.put(presigned_url, chapter_blob)
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

export const AuthorClient = (): AuthorCLientType => ({
    get: async (authorId?: string) => {
        const response = await axios_instance.get(`/author/`, { params: { authorId } })
        return response.data
    },
})
