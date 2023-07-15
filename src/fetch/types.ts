import { JSONContent } from "@tiptap/core"
import { z } from "zod"

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

export const ChapterPresignedSchema = z.object({
    contentUrl: z.string(),
    imagesUrls: z.array(z.string()),
})

export const ImagePresignedSchema = z.object({
    imagePath: z.string(),
    imageUrl: z.string(),
})

export interface S3ClientType {
    getChapterPresignedUpload: (content_path: string) => Promise<string>
    getChapterPresignedDownload: (chapter_id: string) => Promise<ChapterPresigned>
    getImagePresignedUpload: (chapter_id: string) => Promise<ImagePresigned>
    uploadChapterContent: (presigned_url: string, chapter_content: JSONContent) => Promise<void>
    getImgResourceRedirect: (resource_path: string) => Promise<string>
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
    bookAbstract: z.string(),
    tags: z.array(z.string()),
    price: z.number(),
    authorId: z.string(),
    bookCoverPath: z.string(),
    lastEditDate: z.string(),
    avgRate: z.number(),
    contributions: z.array(
        z.object({
            chapterIds: z.string(),
            contributorId: z.string(),
        })
    ),
    chapterHeaders: chaptersHeadersSchema,
})

export const StudentBookSchema = BookSchema.extend({
    fav: z.boolean(),
    bookAbstract: z.string(),
    tags: z.array(z.string()),
    price: z.number(),
    authorId: z.string(),
    bookCoverPath: z.string(),
    lastEditDate: z.string(),
    avgRate: z.number(),
    contributions: z.array(
        z.object({
            chapterIds: z.string(),
            contributorId: z.string(),
        })
    ),
    chapterHeaders: chaptersHeadersSchema,
    authorName: z.string(),
})

export const BookPaymentSchema = z.object({
    paymentId: z.string(),
    bookTitle: z.string(),
    bookId: z.string(),
    studentEmail: z.string(),
    studentId: z.string(),
    paymentInfo: z.string(),
    recentOpenedDate: z.date(),
    ratingValue: z.number(),
})

export const StorePageSchema = z.object({
    next: z.string(),
    prev: z.string(),
    numOfPages: z.number(),
})

export const BookPurchasesSchema = z.object({
    bookId: z.string(),
    numberOfStudents: z.number(),
})

export const BookDisabilitiesDistributionSchema = z.object({
    disabilityName: z.string(),
    studentsCount: z.number(),
    studentsPercentage: z.number(),
})

export type StudentBookHeader = z.infer<typeof StudentBookHeaderSchema>
export type CreateBookRequest = Omit<Book, "bookId" | "lastEditDate" | "avgRate" | "chaptersTitles">
export type BookPurchases = z.infer<typeof BookPurchasesSchema>
export type BookDisabilitiesDistribution = z.infer<typeof BookDisabilitiesDistributionSchema>

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

export const StudentProfileSchema = StudentSchema.pick({
    studentId: true,
    studentName: true,
    studentEmail: true,
    profilePhotoPath: true,
    educationLevel: true,
})

export const AuthorSignUpSchema = AuthorSchema.extend({
    token: z.string(),
})

export const BookHeaderSchema = BookSchema.pick({
    bookId: true,
    title: true,
    bookCoverPath: true,
    AuthorName: true,
    tags: true,
    bookAbstract: true,
    authorId: true,
})

export const StudentBookHeaderSchema = StudentBookSchema.pick({
    bookId: true,
    title: true,
    fav: true,
    bookCoverPath: true,
    authorName: true,
    tags: true,
    bookAbstract: true,
    authorId: true,
    price: true,
})

const AuthorProfileSchema = AuthorSchema.extend({
    bookHeaders: z.array(StudentBookHeaderSchema),
})

const UserSchema = z.object({
    userId: z.string(),
    userName: z.string(),
    userEmail: z.string().email(),
    contact: z.string(),
    profilePhotoPath: z.string(),
    userType: z.enum(["ADMIN", "AUTHOR", "STUDENT"]),
})

const LoginResponseSchema = z.object({
    token: z.string(),
    userType: z.enum(["ADMIN", "AUTHOR", "STUDENT"]),
})

const CommentSchema = z.object({
    commentId: z.string(),
    commenterId: z.string(),
    content: z.string(),
    hasMentions: z.boolean(),
    mentionedUsers: z.string().array(),
    date: z.string().datetime(), //z.date() => new Date()
    commenterType: z.string(),
})

export const PageSchema = z.object({
    next: z.string(),
    prev: z.string(),
    noOfPages: z.string(),
    bookHeaders: StudentBookHeaderSchema.array(),
})

export const TagsSchema = z.array(z.string())

export type User = z.infer<typeof UserSchema>
export type Author = z.infer<typeof AuthorSchema>
export type Student = z.infer<typeof StudentSchema>
export type Chapter = z.infer<typeof ChapterSchema>
export type Comment = z.infer<typeof CommentSchema>
export type AuthorProfile = z.infer<typeof AuthorProfileSchema>
export type StudentProfile = z.infer<typeof StudentProfileSchema>
export type Page = z.infer<typeof PageSchema>
export type Tags = z.infer<typeof TagsSchema>

export type AuthorSignUp = z.infer<typeof AuthorSignUpSchema>
export type CreateChapterRequest = Omit<
    Chapter,
    "contentPath" | "audioPath" | "creationDate" | "lastModified"
>

export type Book = z.infer<typeof BookSchema>
export type BookHeader = z.infer<typeof BookHeaderSchema>
export type BookPayment = z.infer<typeof BookPaymentSchema>

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export interface UserClientType {
    get: (userId?: string) => Promise<User>
    login: (email: string, password: string) => Promise<LoginResponse>
}

export interface AuthorCLientType {
    get: (authorId?: string) => Promise<Author>
    getBooks: () => Promise<BookHeader[]>
    getProfile: (authorId: string) => Promise<AuthorProfile>
    getTopThreeBookViews: () => Promise<BookPurchases[]>
    getStudentsDisabilitesDistribution: () => Promise<BookDisabilitiesDistribution[]>
}

export interface StudentCLientType {
    get: (studentId?: string) => Promise<Student>
    getProfile: (studentId: string) => Promise<StudentProfile>
    getLibrary: () => Promise<StudentBookHeader[]>
    getFavourites: () => Promise<StudentBookHeader[]>
    removeFavourite: (book_id: string) => Promise<void>
    addFavourite: (book_id: string) => Promise<StudentBookHeader>
    getBookstore: (
        op: string,
        next?: string,
        pre?: string,
        ti?: string,
        tgs?: string,
        filtr?: string
    ) => Promise<Page>
    postBookPayment: (book_id: string) => Promise<BookPayment>
}

export interface BookClientType {
    post: (book: CreateBookRequest) => Promise<Book>
    get: (book_id: string) => Promise<Book>
    getAllBooksTags: () => Promise<Tags>
}

export interface ChapterClientType {
    post: (chapter: CreateChapterRequest) => Promise<Chapter>
    get: (chapterId: string) => Promise<Chapter>
    getChapterComments: (chapterId: string) => Promise<Comment[]>
}

export interface AiClientType {
    getImageDescription: (image_path: string) => Promise<ImageDescription>
}

export type ChapterPresigned = z.infer<typeof ChapterPresignedSchema>
export type ImagePresigned = z.infer<typeof ImagePresignedSchema>

export interface ImagePreviewProps {
    image: string
}

export interface ImageInserterProps {
    onImageInserted: (images: string[], description: ImageDescription) => void
    onDescriptionChange?: (description: ImageDescription) => void
    onAddClick?: () => void
}
