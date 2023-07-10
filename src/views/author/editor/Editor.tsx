import * as constants from "@constants"
import { ChapterClient, S3Client } from "@fetch/index"
import { Chapter } from "@fetch/types"
import { Stack } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import Blockquote from "@tiptap/extension-blockquote"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import { Color } from "@tiptap/extension-color"
import Document from "@tiptap/extension-document"
import Gapcursor from "@tiptap/extension-gapcursor"
import { Heading } from "@tiptap/extension-heading"
import History from "@tiptap/extension-history"
import Image from "@tiptap/extension-image"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import TextExtension from "@tiptap/extension-text"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { EditorContent, JSONContent, useEditor } from "@tiptap/react"
import { ToastContainer } from "react-toastify"
import { shallow } from "zustand/shallow"

import { EditorMenu } from "./EditorMenu"
import { McqExtension } from "./McqExtenstion"
import { ModalContainer } from "./ModalContainer"
import { useEditorStore } from "./editor-store"

type ChapterEditorProp = {
    content?: JSONContent
}

export const ChapterEditor = ({ content }: ChapterEditorProp) => {
    const [opened, setModalOpened] = useEditorStore(
        (state) => [state.modal_opened, state.setModalOpened],
        shallow
    )
    const [modal_content] = useEditorStore((state) => [state.modal_content], shallow)

    const editor = useEditor(
        {
            extensions: [
                Document,
                Paragraph,
                TextExtension,
                Bold,
                Heading,
                Italic,
                Underline,
                History,
                BulletList,
                ListItem,
                OrderedList,
                Blockquote,
                Gapcursor,
                Color,
                TextStyle,
                Image,
                McqExtension,
            ],
            content: content,
            editorProps: {
                attributes: {
                    class: "flex-1 max-w-none justify-center py-6 px-6 prose prose-sm [&_p]:m-0 prose-headings:m-0 focus:outline-none",
                },
            },
        },
        [content]
    )

    const chapter_client = ChapterClient()
    const s3_client = S3Client()
    const chapter_id = constants.SAMPLE_CHAPTER_ID

    const { refetch: fetchChapterInfo } = useQuery({
        queryKey: ["chapter", chapter_id],
        queryFn: () => chapter_client.get(chapter_id),
        enabled: false,
    })

    const { mutate: saveChapterContent } = useMutation(async (chapter_info: Chapter) => {
        const presigned_upload = await s3_client.getChapterPresignedUpload(chapter_info.contentPath)
        const chapter_content = editor?.getJSON() || {}
        await s3_client.uploadChapterContent(presigned_upload, chapter_content)
    }, {})

    const handleSaveChapter = async () => {
        const { data: chapter_info } = await fetchChapterInfo()
        if (chapter_info) {
            saveChapterContent(chapter_info)
        }
    }

    if (!editor) {
        // to avoid error when editor is not ready, actually to shut up typescript
        return null
    }

    // TODO: separate editor menu from chapter control (Editor menu shouldn't have save button directly)
    return (
        <Stack>
            <ModalContainer
                opened={opened}
                onClose={() => setModalOpened(false)}
                content={modal_content}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <EditorContainer>
                <EditorMenu editor={editor} onSaveClick={handleSaveChapter} />
                <EditorContent
                    className="flex flex-1 flex-row overflow-auto rounded-sm border-x border-b border-neutral-300"
                    editor={editor}
                />
            </EditorContainer>
        </Stack>
    )
}

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
    return <Stack className="max-h-screen gap-0 px-6"> {children} </Stack>
}