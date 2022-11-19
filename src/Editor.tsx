import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Bold from "@tiptap/extension-bold"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { Button } from "@mantine/core"

export const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World!</p>",
    })

    return <EditorContent editor={editor} />
}

export const Editor2 = () => {
    // When useEdior is null ?
    const editor = useEditor({
        extensions: [Document, Paragraph, Text, Bold],
        content: `
        <p>This isn’t bold.</p>
        <p><strong>This is bold.</strong></p>
        <p><b>And this.</b></p>
        <p style="font-weight: bold">This as well.</p>
        <p style="font-weight: bolder">Oh, and this!</p>
        <p style="font-weight: 500">Cool, isn’t it!?</p>
        <p style="font-weight: 999">Up to font weight 999!!!</p>
      `,
    })

    if (!editor) {
        return null
    }

    return (
        <>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
            >
                toggleBold
            </Button>
            <button
                onClick={() => editor.chain().focus().setBold().run()}
                disabled={editor.isActive("bold")}
            >
                setBold
            </button>
            <button
                onClick={() => editor.chain().focus().unsetBold().run()}
                disabled={!editor.isActive("bold")}
            >
                unsetBold
            </button>

            <EditorContent editor={editor} />
        </>
    )
}
