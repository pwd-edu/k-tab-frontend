import axios from "axios"
import { getAuthHeader } from "./auth"
import {
    AiClientType,
    Book,
    BookClientType,
    Chapter,
    ChapterClientType,
    CreateBookRequest,
    CreateChapterRequest,
    ImageDescription,
    ImageDescriptionSchema,
    ImagePresigned,
    ImagePresignedSchema,
    S3ClientType,
} from "./types"

const API_URL = "http://localhost:8080"

export const axios_instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,

    headers: {
        Authorization: getAuthHeader(),
    },
})

export const BookClient = (): BookClientType => ({
    post: async (book: CreateBookRequest): Promise<Book> => {
        const response = await axios_instance.post(`/book`, book)
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
    getImagePresignedUpload: async (chpater_id: string): Promise<ImagePresigned> => {
        const response = await axios_instance.get(`/s3/image/`, {
            params: { chapterId: chpater_id },
        })
        return ImagePresignedSchema.parse(response.data)
    },
    uploadChapterContent: async (presigned_url, chapter_content): Promise<void> => {
        const chapter_blob = new Blob([JSON.stringify(chapter_content)], { type: "text/json" })
        const form = new FormData()
        form.append("file_content", chapter_blob)
        await axios.put(presigned_url, form)
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
