/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VALID_TOKEN: string
    readonly VITE_SAMPLE_BOOK_ID: string
    readonly VITE_SAMPLE_CHAPTER_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
