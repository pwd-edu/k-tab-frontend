import { Editor } from "@tiptap/core"

import { ActionIcon, Button, Group, clsx } from "@mantine/core"
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
    IconBoxMultiple,
    IconDeviceFloppy,
} from "@tabler/icons"
import { useEditorStore } from "./editor-store"
import { ImageInserter } from "./ImageInserter"
import { FontColorMenu } from "./FontColorMenu"
import { HeadingMenu } from "./HeadingMenu"
import { nanoid } from "nanoid"
import { ImageDescription } from "./types"
import { shallow } from "zustand/shallow"
import { RESOURCE_URL } from "../fetch"

interface EditorMenuProps {
    editor: Editor
    onSaveClick: () => void
}

export const EditorMenu = ({ editor, onSaveClick }: EditorMenuProps) => {
    const [setModalOpened] = useEditorStore((state) => [state.setModalOpened], shallow)
    const [setModalContent] = useEditorStore((state) => [state.setModalContent], shallow)

    const addImage = () => {
        setModalContent(
            <ImageInserter
                onImageInserted={insertImgIntoEditor}
                onAddClick={() => setModalOpened(false)}
            />
        )
        setModalOpened(true)
    }

    const insertImgIntoEditor = (images: string[], description: ImageDescription) => {
        const url = images.at(-1)
        if (url) {
            editor
                .chain()
                .focus()
                .setImage({ src: RESOURCE_URL(url), alt: description.content })
                .run()
        }
    }

    const addMcq = () => {
        editor
            .chain()
            .focus()
            .setMcq({ id: nanoid(16) })
            .run()
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
        {
            action: () => addMcq(),
            EditorActionIcon: IconBoxMultiple,
        },
    ]

    return (
        <Group
            className={clsx([
                "px-6",
                "flex-[0_0_auto]",
                "justify-between",
                "border-t-2",
                "bg-gray-200",
                "border-neutral-300",
                "border-t-0",
            ])}
        >
            <Group className="gap-0">
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
            <Group className="p-0 py-1">
                <SaveButton onClick={() => onSaveClick()} />
            </Group>
        </Group>
    )
}

const SaveButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            classNames={{
                root: "h-auto ",
                label: "gap-2 py-1",
            }}
        >
            Save
            <IconDeviceFloppy className="" size="18" />
        </Button>
    )
}
