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

export const ChapterPresignedSchema = z.object({
    contentUrl: z.string(),
    imagesUrls: z.array(z.string()),
})

export type ChapterPresigned = z.infer<typeof ChapterPresignedSchema>

export const ImagePresignedSchema = z.object({
    imagePath: z.string(),
    imageUrl: z.string(),
})

export type ImagePresigned = z.infer<typeof ImagePresignedSchema>

export interface S3ClientType {
    getChapterPresignedUpload: (content_path: string) => Promise<string>
    getChapterPresignedDownload: (chapter_id: string) => Promise<ChapterPresigned>
    getImagePresignedUpload: (chapter_id: string) => Promise<ImagePresigned>
    uploadChapterContent: (presigned_url: string, chapter_content: JSONContent) => Promise<void>
}

export interface AiClientType {
    getImageDescription: (image_path: string) => Promise<ImageDescription>
}

export const chaptersHeadersSchema = z.array(
    z.object({
        chapterId: z.string(),
        chapterTitle: z.string(),
        chapterOrder: z.number(),
    })
)

export const BookSchema = z.object({
    bookId: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    authorId: z.string(),
    bookCoverPath: z.string(),
    lastEditDate: z.string(),
    avgRate: z.number(),
    contributors: z.array(z.string()),
    chapterHeaders: chaptersHeadersSchema,
})

export type Book = z.infer<typeof BookSchema>

export type CreateBookRequest = Omit<Book, "bookId" | "lastEditDate" | "avgRate" | "chaptersTitles">

export interface BookClientType {
    post: (book: CreateBookRequest) => Promise<Book>
    get: (book_id: string) => Promise<Book>
}

export const AuthorSchema = z.object({
    authorId: z.string(),
    authorName: z.string(),
    authorEmail: z.string().email(),
    contact: z.string(),
    profilePhotoPath: z.string(),
    authorSettingsId: z.string(),
})

export const StudentSchema = z.object({
    studentId: z.string(),
    studentName: z.string(),
    studentEmail: z.string().email(),
    contact: z.string(),
    profilePhotoPath: z.string(),
    studentSettingsId: z.string(),
    educationLevel: z.string(),
    disabilities: z.array(
        z.object({
            name: z.string(),
            details: z.string(),
        })
    ),
})

export const AuthorSignUpSchema = AuthorSchema.extend({
    token: z.string(),
})

export type Author = z.infer<typeof AuthorSchema>
export type AuthorSignUp = z.infer<typeof AuthorSignUpSchema>

export type Student = z.infer<typeof StudentSchema>

export interface AuthorCLientType {
    get: (authorId?: string) => Promise<Author>
}

export interface StudentCLientType {
    get: (studentId?: string) => Promise<Student>
}
