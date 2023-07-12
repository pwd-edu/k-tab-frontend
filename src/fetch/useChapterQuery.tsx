import { ChapterClient, S3Client } from "@fetch/index"
import { useQuery } from "@tanstack/react-query"
import { JSONContent } from "@tiptap/core"
import axios from "axios"

const chapter_client = ChapterClient()
const s3_client = S3Client()

export const useChapterQuery = (book_id: string | undefined, chapter_id: string | undefined) => {
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
                return data.data as JSONContent
            },
        }
    )
    return { chapter, chapter_content }
}
