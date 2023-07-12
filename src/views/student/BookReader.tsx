import { BASE_EDITOR_EXTENSIONS } from "@constants"
import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import { Container, clsx, createStyles } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { EditorContent, useEditor } from "@tiptap/react"
import { getChapterId } from "@utils/chapter-id-idx"
import { useParams } from "react-router-dom"

import { BookEditorParams } from "../../types"
import { useReaderStore } from "./reader-store"

const book_client = BookClient()

const useStyles = createStyles(() => ({}))
const buildStyles = (params?: any) => {
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        reader_container: cx(),
        editor_content: cx(["flex flex-1 flex-row"]),
    }
    return { styles, classes, cx, theme }
}

export const BookReader = () => {
    const [enableLineFocus] = useReaderStore((state) => [state.enableLineFocus])
    const { book_id, chapter_num } = useParams<BookEditorParams>()

    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)

    const { chapter_content } = useChapterQuery(book_id, chapter_id)

    const { styles } = buildStyles({ enableLineFocus })
    const enable_line_focus = enableLineFocus || false

    const editor = useEditor(
        {
            extensions: [...BASE_EDITOR_EXTENSIONS],
            content: chapter_content,
            editorProps: {
                attributes: {
                    class: clsx([enable_line_focus && "relative"]),
                },
            },
            onCreate: ({ editor }) => {
                if (enable_line_focus) {
                    editor.chain().setLineFocus({ id: "line-focus" }).run()
                }
            },
            editable: false,
        },
        [chapter_content]
    )

    return (
        <Container className={styles.reader_container} size="xl">
            <EditorContent editor={editor} className={styles.editor_content} />
        </Container>
    )
}
