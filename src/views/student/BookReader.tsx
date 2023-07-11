import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import { useQuery } from "@tanstack/react-query"
import { getChapterId } from "@utils/chapter-id-idx"
import { useParams } from "react-router-dom"

import { BookEditorParams } from "../../types"

const book_client = BookClient()

export const BookReader = () => {
    const { book_id, chapter_num } = useParams<BookEditorParams>()
    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)
    const { chapter, chapter_content } = useChapterQuery(book_id, chapter_id)
}
