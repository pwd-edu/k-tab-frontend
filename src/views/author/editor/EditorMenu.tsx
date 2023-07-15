import { FontPicker } from "@components/FontPicker"
import { RESOURCE_URL } from "@fetch/index"
import { ImageDescription } from "@fetch/types"
import { ActionIcon, Button, Group, clsx } from "@mantine/core"
import {
    IconAccessible,
    IconAlignCenter,
    IconAlignJustified,
    IconAlignLeft,
    IconAlignRight,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconBlockquote,
    IconBold,
    IconBoxMultiple,
    IconDeviceFloppy,
    IconIndentDecrease,
    IconIndentIncrease,
    IconItalic,
    IconList,
    IconListNumbers,
    IconMath,
    IconPhoto,
    IconUnderline,
} from "@tabler/icons"
import { Editor } from "@tiptap/core"
import { nanoid } from "nanoid"
import { shallow } from "zustand/shallow"

import AccessiblityCheckerDrawer from "./AccessiblityCheckerDrawer"
import { FontColorMenu } from "./FontColorMenu"
import { HeadingMenu } from "./HeadingMenu"
import { ImageInserter } from "./ImageInserter"
import { useEditorStore } from "./editor-store"

interface EditorMenuProps {
    editor: Editor
    onSaveClick: () => void
}

export const EditorMenu = ({ editor, onSaveClick }: EditorMenuProps) => {
    const [setModalOpened] = useEditorStore((state) => [state.setModalOpened], shallow)
    const [setModalContent] = useEditorStore((state) => [state.setModalContent], shallow)
    const [setCheckerOpened] = useEditorStore((state) => [state.setCheckerOpened], shallow)
    const [opened] = useEditorStore((state) => [state.checker_opened], shallow)

    const [current_family, setCurrentFamily] = useEditorStore(
        (state) => [state.current_family, state.setCurrentFamily],
        shallow
    )

    const addImage = () => {
        setModalContent(
            <ImageInserter
                onImageInserted={insertImgIntoEditor}
                onAddClick={() => setModalOpened(false)}
            />
        )
        setModalOpened(true)
    }

    const openAccessibilityChecker = () => {
        setCheckerOpened(true)
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

    const addMathEdit = () => {
        editor
            .chain()
            .focus()
            .setMathEdit({ id: nanoid(16), latex: "" })
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
        {
            action: () => editor.chain().focus().setTextAlign("left").run(),
            EditorActionIcon: IconAlignLeft,
        },
        {
            action: () => editor.chain().focus().setTextAlign("center").run(),
            EditorActionIcon: IconAlignCenter,
        },
        {
            action: () => editor.chain().focus().setTextAlign("right").run(),
            EditorActionIcon: IconAlignRight,
        },
        {
            action: () => editor.chain().focus().setTextAlign("justify").run(),
            EditorActionIcon: IconAlignJustified,
        },
        {
            action: () => addMathEdit(),
            EditorActionIcon: IconMath,
        },
        {
            action: () => openAccessibilityChecker(),
            EditorActionIcon: IconAccessible,
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
            <AccessiblityCheckerDrawer
                editor={editor}
                opened={opened}
                clearOnClose={true}
                onClose={() => setCheckerOpened(false)}
            />
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
                <FontPicker
                    value={current_family}
                    onSelected={(font) => {
                        setCurrentFamily(font)
                        editor.chain().focus().setFontFamily(font).run()
                    }}
                />
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
                root: "h-auto border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white",
                label: "gap-2 py-1",
            }}
        >
            Save
            <IconDeviceFloppy className="" size="18" />
        </Button>
    )
}
