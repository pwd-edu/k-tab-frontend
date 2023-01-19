import { Editor } from "@tiptap/core"
import { useEditor, EditorContent } from "@tiptap/react"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import History from "@tiptap/extension-history"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import { Heading, Level } from "@tiptap/extension-heading"
import TextExtension from "@tiptap/extension-text"

import { ActionIcon, Button, Group, Stack, Menu, Kbd } from "@mantine/core"
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBold,
    IconChevronDown,
    IconHeading,
    IconItalic,
    IconUnderline,
} from "@tabler/icons"

export const LessonEditor = () => {
    // When useEdior is null ?
    const editor = useEditor({
        extensions: [Document, Paragraph, TextExtension, Bold, Heading, Italic, Underline, History],
        content: `
            <h1>Typography should be easy</h1>
            <p></p>
            <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
            <p></p>

            <p><strong>Something a wise person once told me about typography is:</strong></p>
            <p></p>

            Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

            It's probably important that images look okay here by default as well:
      `,
        editorProps: {
            attributes: {
                class: "max-w-max prose prose-sm [&>*]:m-0 focus:outline-none",
            },
        },
    })

    if (!editor) {
        return null
    }

    return (
        <EditorContainer>
            <EditorMenu editor={editor} />
            <EditorContent
                className="border-y border-slate-200 rounded-sm flex-1 overflow-auto"
                editor={editor}
            />
        </EditorContainer>
    )
}

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
    return <Stack className="gap-0 px-6 max-h-screen"> {children} </Stack>
}

const MENU_ACTIONS = (editor: Editor) => [
    { action: editor.chain().focus().toggleBold().run, EditorIcon: IconBold },
    { action: editor.chain().focus().toggleItalic().run, EditorIcon: IconItalic },
    { action: editor.chain().focus().toggleUnderline().run, EditorIcon: IconUnderline },
    { action: editor.chain().focus().undo().run, EditorIcon: IconArrowBackUp },
    { action: editor.chain().focus().redo().run, EditorIcon: IconArrowForwardUp },
]

const EditorMenu = ({ editor }: { editor: Editor }) => {
    return (
        <Group className="gap-0 shadow-sm flex-[0_0_auto]">
            <HeadingMenu editor={editor} />
            {MENU_ACTIONS(editor).map(({ action, EditorIcon }, i) => {
                return (
                    <ActionIcon onClick={action} key={i}>
                        <EditorIcon size="18" />
                    </ActionIcon>
                )
            })}
        </Group>
    )
}

const HEADINGS: React.ReactNode[] = [
    <h1 key="heading_1" className="m-0">
        Heading 1
    </h1>,
    <h2 key="heading_2" className="m-0">
        Heading 2
    </h2>,
    <h3 key="heading_3" className="m-0">
        Heading 3
    </h3>,
    <h4 key="heading_4" className="m-0">
        Heading 4
    </h4>,
    <h5 key="heading_5" className="m-0">
        Heading 5
    </h5>,
    <h6 key="heading_6" className="m-0">
        Heading 6
    </h6>,
]

export function HeadingMenu({ editor }: { editor: Editor }) {
    return (
        <Menu transition="pop-top-right" position="top-start" width={300} withinPortal>
            <Menu.Target>
                <Button
                    className="p-0 m-0 h-7"
                    color="gray"
                    variant="subtle"
                    rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                    pr={12}
                >
                    <IconHeading size="18" />
                </Button>
            </Menu.Target>
            <Menu.Dropdown className="prose prose-sm p-2 shadow-lg">
                {HEADINGS.map((heading, i) => {
                    const level = (i + 1) as Level
                    return (
                        <Menu.Item
                            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                            rightSection={<Kbd className="p-0.5">Ctrl+Alt+{i + 1}</Kbd>}
                            className="h-8"
                            key={i}
                        >
                            {heading}
                        </Menu.Item>
                    )
                })}
            </Menu.Dropdown>
        </Menu>
    )
}
