import { Editor } from "@tiptap/core"
import { useEditor, EditorContent } from "@tiptap/react"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import History from "@tiptap/extension-history"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import Blockquote from "@tiptap/extension-blockquote"
import ListItem from "@tiptap/extension-list-item"
import { Heading, Level } from "@tiptap/extension-heading"
import TextExtension from "@tiptap/extension-text"
import * as constants from "./constants"

import { ActionIcon, Button, Group, Stack, Menu, Kbd } from "@mantine/core"
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBlockquote,
    IconBold,
    IconChevronDown,
    IconHeading,
    IconIndentDecrease,
    IconIndentIncrease,
    IconItalic,
    IconList,
    IconListNumbers,
    IconUnderline,
} from "@tabler/icons"

export const LessonEditor = () => {
    // When useEdior is null ?
    const editor = useEditor({
        // prettier-ignore
        extensions: [
            Document, Paragraph, TextExtension, Bold, Heading,Italic, Underline,
            History, BulletList, ListItem, OrderedList, Blockquote
        ],
        content: constants.EDITOR_SAMPLE,
        editorProps: {
            attributes: {
                class: "max-w-max prose prose-sm [&_*]:m-0 focus:outline-none",
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
    { action: editor.chain().focus().toggleBold().run, EditorActionIcon: IconBold },
    { action: editor.chain().focus().toggleItalic().run, EditorActionIcon: IconItalic },
    { action: editor.chain().focus().toggleUnderline().run, EditorActionIcon: IconUnderline },
    { action: editor.chain().focus().undo().run, EditorActionIcon: IconArrowBackUp },
    { action: editor.chain().focus().redo().run, EditorActionIcon: IconArrowForwardUp },
    { action: editor.chain().focus().toggleBulletList().run, EditorActionIcon: IconList },
    { action: editor.chain().focus().toggleOrderedList().run, EditorActionIcon: IconListNumbers },
    {
        action: editor.chain().focus().liftListItem("listItem").run,
        EditorActionIcon: IconIndentDecrease,
    },
    {
        action: editor.chain().focus().sinkListItem("listItem").run,
        EditorActionIcon: IconIndentIncrease,
    },
    { action: editor.chain().focus().toggleBlockquote().run, EditorActionIcon: IconBlockquote },
    { action: editor.chain().focus().toggleBlockquote().run, EditorActionIcon: IconBlockquote },
]

const EditorMenu = ({ editor }: { editor: Editor }) => {
    return (
        <Group className="gap-0 shadow-sm flex-[0_0_auto]">
            <HeadingMenu editor={editor} />
            {MENU_ACTIONS(editor).map(({ action, EditorActionIcon }, i) => {
                return (
                    <ActionIcon onClick={action} key={i}>
                        <EditorActionIcon size="18" />
                    </ActionIcon>
                )
            })}
        </Group>
    )
}

// prettier-ignore
const HEADINGS: React.ReactNode[] = [ 
    <h1 key="heading_1" className="m-0"> Heading 1 </h1>,
    <h2 key="heading_2" className="m-0"> Heading 2 </h2>,
    <h3 key="heading_3" className="m-0"> Heading 3 </h3>,
    <h4 key="heading_4" className="m-0"> Heading 4 </h4>,
    <h5 key="heading_5" className="m-0"> Heading 5 </h5>,
    <h6 key="heading_6" className="m-0"> Heading 6 </h6>,
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
