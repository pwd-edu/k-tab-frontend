import { FileWithPath } from "@mantine/dropzone"
import { JSONContent } from "@tiptap/core"
import { z } from "zod"

export interface ImagePreviewProps {
    image: FileWithPath
}

export interface ImageInserterProps {
    onImageInserted: (files: FileWithPath[], description: ImageDescription) => void
    onDescriptionChange?: (description: ImageDescription) => void
    onAddClick?: () => void
}

export const ImageDescriptionSchema = z.object({
    type: z.enum(["MATH", "SCENE", "CHART"]),
    content: z.string(),
})

export type ImageDescription = z.infer<typeof ImageDescriptionSchema>

const ChapterSchema = z.object({
    ownerId: z.string(),
    chapterId: z.string(),
    bookId: z.string(),
    title: z.string(),
    contentPath: z.string(),
    audioPath: z.string(),
    readingDuration: z.number(),
    chapterOrder: z.number(),
    creationDate: z.string(),
    lastModified: z.string(),
    tags: z.array(z.string()),
})

export type Chapter = z.infer<typeof ChapterSchema>

export type CreateChapterRequest = Omit<
    Chapter,
    "contentPath" | "audioPath" | "creationDate" | "lastModified"
>

export interface ChapterClientType {
    post: (chapter: CreateChapterRequest) => Promise<Chapter>
    get: (chapterId: string) => Promise<Chapter>
}

export const ImagePresignedSchema = z.object({
    imagePath: z.string(),
    imageUrl: z.string(),
})

export type ImagePresigned = z.infer<typeof ImagePresignedSchema>

export interface S3ClientType {
    getChapterPresignedUpload: (content_path: string) => Promise<string>
    getImagePresignedUpload: (chapter_id: string) => Promise<ImagePresigned>
    uploadChapterContent: (presigned_url: string, chapter_content: JSONContent) => Promise<void>
}

export interface AiClientType {
    getImageDescription: (image_path: string) => Promise<ImageDescription>
}

export const BookSchema = z.object({
    bookId: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    authorId: z.string(),
    bookCoverPath: z.string(),
    lastEditDate: z.string(),
    avgRate: z.number(),
    chaptersTitles: z.array(z.string()),
    contributors: z.array(z.string()),
})

export type Book = z.infer<typeof BookSchema>

export type CreateBookRequest = Omit<Book, "bookId" | "lastEditDate" | "avgRate" | "chaptersTitles">

export interface BookClientType {
    post: (book: CreateBookRequest) => Promise<Book>
}
