import { useEditor, EditorContent } from "@tiptap/react"
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

import { Stack } from "@mantine/core"
import { ModalContainer } from "./ModalContainer"
import { useEditorStore } from "./editor-store"

import { McqExtension } from "./McqExtenstion"
import { useEffect } from "react"

export const LessonEditor = () => {
    const [opened, setModalOpened] = useEditorStore((state) => [
        state.modal_opened,
        state.setModalOpened,
    ])
    const [modal_content] = useEditorStore((state) => [state.modal_content])

    const editor = useEditor({
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
        content: constants.EDITOR_PARSED_JSON,
        editorProps: {
            attributes: {
                class: "max-w-max prose prose-sm [&_p]:m-0 prose-headings:m-0 focus:outline-none",
            },
        },
    })

    useEffect(() => {
        editor?.on("transaction", () => {
            console.log(JSON.stringify(editor?.getJSON()))
        })
    }, [editor])

    if (!editor) {
        // to avoid error when editor is not ready, actually to shut up typescript
        return null
    }

    return (
        <Stack>
            <ModalContainer
                opened={opened}
                onClose={() => setModalOpened(false)}
                content={modal_content}
            />
            <EditorContainer>
                <EditorMenu editor={editor} />
                <EditorContent
                    className="flex-1 overflow-auto border-b border-x rounded-sm border-neutral-300"
                    editor={editor}
                />
            </EditorContainer>
        </Stack>
    )
}

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
    return <Stack className="gap-0 px-6 max-h-screen"> {children} </Stack>
}
