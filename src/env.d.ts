/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_USE_STATIC_JWT: string
    readonly VITE_AUTHOR_JWT: string
    readonly VITE_STUDENT_JWT: string
    readonly VITE_SAMPLE_BOOK_ID: string
    readonly VITE_SAMPLE_CHAPTER_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
