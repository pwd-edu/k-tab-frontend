import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import { useQuery } from "@tanstack/react-query"
import { getChapterId } from "@utils/chapter-id-idx"
import { useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { BookEditorParams } from "../../types"
import { ChapterEditor } from "./editor/Editor"
import { useEditorStore } from "./editor/editor-store"

const book_client = BookClient()

export function BookEditor() {
    const { book_id, chapter_num } = useParams<BookEditorParams>()
    const [setChapterId] = useEditorStore((state) => [state.setChapterId], shallow)
    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)
    const { chapter_content } = useChapterQuery(book_id, chapter_id)

    setChapterId(chapter_id || "")

    return <ChapterEditor content={chapter_content} chapterId={chapter_id} />
}
