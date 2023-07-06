import { useQuery } from "@tanstack/react-query"
import { JSONContent } from "@tiptap/core"
import axios from "axios"
import { useParams } from "react-router-dom"
import { LessonEditor } from "./editor/Editor"
import { BookClient, ChapterClient, S3Client } from "./fetch"

const book_client = BookClient()
const chapter_client = ChapterClient()
const s3_client = S3Client()

type BookEditorParams = {
    book_id: string
    chapter_num: string
}

export function BookEditor() {
    const { book_id, chapter_num } = useParams<BookEditorParams>()
    const chapter_idx = chapter_num ? Number(chapter_num) - 1 : 0

    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))

    const chapters_headers = book?.chapterHeaders.sort((a, b) => a.chapterOrder - b.chapterOrder)
    const curr_chapter = chapters_headers?.[chapter_idx]
    const chapter_id = curr_chapter?.chapterId

    const { data: chapter } = useQuery(
        ["chapter", book_id, chapter_id],
        () => chapter_client.get(chapter_id || ""),
        {
            enabled: !!chapter_id,
            refetchOnWindowFocus: false,
        }
    )
    const { data: chapter_presigned } = useQuery(
        ["chapter_content", book_id, chapter_id],
        () => s3_client.getChapterPresignedDownload(chapter_id || ""),
        {
            enabled: !!chapter?.contentPath,
            refetchOnWindowFocus: false,
        }
    )
    const { data: chapter_content } = useQuery(
        ["chapter_content", book_id, chapter_id],
        () => axios.get(chapter_presigned?.contentUrl || ""),
        {
            enabled: !!chapter_presigned?.contentUrl,
            refetchOnWindowFocus: false,
            select: (data) => {
                // TODO: inject images urls at iamges sources
                console.log("data", data.data)
                return data.data as JSONContent
            },
        }
    )

    console.log("chapter_content", chapter_content)

    return <LessonEditor content={chapter_content} />
}