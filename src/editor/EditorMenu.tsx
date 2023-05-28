import { Editor } from "@tiptap/core"

import { ActionIcon, Group } from "@mantine/core"
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBlockquote,
    IconBold,
    IconIndentDecrease,
    IconIndentIncrease,
    IconItalic,
    IconList,
    IconListNumbers,
    IconPhoto,
    IconUnderline,
} from "@tabler/icons"
import { useEditorStore } from "./editor-store"
import { ImageInserter } from "./ImageInserter"
import { FileWithPath } from "@mantine/dropzone"
import { FontColorMenu } from "./FontColorMenu"
import { HeadingMenu } from "./HeadingMenu"

export const EditorMenu = ({ editor }: { editor: Editor }) => {
    const [setModalOpened] = useEditorStore((state) => [state.setModalOpened])
    const [setModalContent] = useEditorStore((state) => [state.setModalContent])
    const addImage = () => {
        setModalContent(<ImageInserter onImageInserted={insertToEditor} />)
        setModalOpened(true)
    }

    const insertToEditor = (images: FileWithPath[]) => {
        const image = images.at(-1)
        if (image) {
            const url = URL.createObjectURL(image)
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const MENU_ACTIONS = (editor: Editor) => [
        { action: () => editor.chain().focus().toggleBold().run(), EditorActionIcon: IconBold },
        { action: () => editor.chain().focus().toggleItalic().run(), EditorActionIcon: IconItalic },
        {
            action: () => editor.chain().focus().toggleUnderline().run(),
            EditorActionIcon: IconUnderline,
        },
        { action: () => editor.chain().focus().undo().run(), EditorActionIcon: IconArrowBackUp },
        { action: () => editor.chain().focus().redo().run(), EditorActionIcon: IconArrowForwardUp },
        {
            action: () => editor.chain().focus().toggleBulletList().run(),
            EditorActionIcon: IconList,
        },
        {
            action: () => editor.chain().focus().toggleOrderedList().run(),
            EditorActionIcon: IconListNumbers,
        },
        {
            action: () => editor.chain().focus().liftListItem("listItem").run(),
            EditorActionIcon: IconIndentDecrease,
        },
        {
            action: () => editor.chain().focus().sinkListItem("listItem").run(),
            EditorActionIcon: IconIndentIncrease,
        },
        {
            action: () => editor.chain().focus().toggleBlockquote().run(),
            EditorActionIcon: IconBlockquote,
        },
        { action: () => addImage(), EditorActionIcon: IconPhoto },
    ]

    return (
        <Group className="gap-0 border border-b-2 border-neutral-300 flex-[0_0_auto]">
            <HeadingMenu editor={editor} />
            {MENU_ACTIONS(editor).map(({ action, EditorActionIcon }, i) => {
                return (
                    <ActionIcon onClick={action} key={i}>
                        <EditorActionIcon className="text-slate-800" size="18" />
                    </ActionIcon>
                )
            })}
            <FontColorMenu editor={editor} />
        </Group>
    )
}
