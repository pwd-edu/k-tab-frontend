import { useEditor, EditorContent, JSONContent } from "@tiptap/react"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import History from "@tiptap/extension-history"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import BulletList from "@tiptap/extension-bullet-list"
import Image from "@tiptap/extension-image"
import OrderedList from "@tiptap/extension-ordered-list"
import Blockquote from "@tiptap/extension-blockquote"
import ListItem from "@tiptap/extension-list-item"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import { Heading } from "@tiptap/extension-heading"
import TextExtension from "@tiptap/extension-text"
import Gapcursor from "@tiptap/extension-gapcursor"
import * as constants from "../constants"
import { EditorMenu } from "./EditorMenu"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Stack } from "@mantine/core"
import { ModalContainer } from "./ModalContainer"
import { useEditorStore } from "./editor-store"

import { McqExtension } from "./McqExtenstion"
import { ChapterClient, S3Client } from "../fetch"
import { Chapter } from "./types"

type LessonEditorProps = {
    content?: JSONContent
}

export const LessonEditor = ({ content }: LessonEditorProps) => {
    const [opened, setModalOpened] = useEditorStore((state) => [
        state.modal_opened,
        state.setModalOpened,
    ])
    const [modal_content] = useEditorStore((state) => [state.modal_content])

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
