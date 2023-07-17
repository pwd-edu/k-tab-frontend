import { CenteredLoading } from "@components/shared"
import * as constants from "@constants"
import { ChapterClient, S3Client } from "@fetch/index"
import { Chapter } from "@fetch/types"
import {
    Affix,
    Drawer,
    Group,
    Stack,
    ThemeIcon,
    Title,
    UnstyledButton,
    clsx,
    createStyles,
    rem,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconLayoutSidebarRightExpand, IconSettings2 } from "@tabler/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { EditorContent, JSONContent, useEditor } from "@tiptap/react"
import { toast } from "react-toastify"
import { shallow } from "zustand/shallow"

import { ChapterComments } from "../../user/ChapterComments"
import { EditorMenu } from "./EditorMenu"
import { ModalContainer } from "./ModalContainer"
import { useEditorStore } from "./editor-store"

type ChapterEditorProp = {
    content?: JSONContent
    chapterId?: string
}

const useStyles = createStyles(() => ({}))
const buildStyles = (params?: any) => {
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        editor_content: cx([
            "flex flex-1 flex-row",
            !params?.readOnly && "rounded-sm border-x border-b border-neutral-300",
        ]),
    }
    return { styles, classes, cx, theme }
}

export const ChapterEditor = ({ content, chapterId }: ChapterEditorProp) => {
    const { styles } = buildStyles()
    const [opened, setModalOpened] = useEditorStore(
        (state) => [state.modal_opened, state.setModalOpened],
        shallow
    )
    const [setCurrentFamily] = useEditorStore((state) => [state.setCurrentFamily], shallow)
    const [setCurrentColor] = useEditorStore((state) => [state.setCurrentColor], shallow)
    const [modal_content] = useEditorStore((state) => [state.modal_content], shallow)

    const editor = useEditor(
        {
            extensions: [...constants.BASE_EDITOR_EXTENSIONS],
            content: content,
            editorProps: {
                attributes: {
                    class: clsx([
                        "prose prose-lg max-w-none flex-1 justify-center p-6",
                        "focus:outline-none prose-headings:m-0 [&_p]:m-0",
                    ]),
                },
            },
            onSelectionUpdate: ({ editor }) => {
                const font_family = editor?.getAttributes("textStyle").fontFamily ?? ""
                const color = editor?.getAttributes("textStyle").color ?? ""
                setCurrentFamily(font_family)
                setCurrentColor(color)
            },
        },
        [content]
    )

    const [side_opened, { open, close }] = useDisclosure(false)

    const chapter_client = ChapterClient()
    const s3_client = S3Client()
    const chapter_id = chapterId || ""

    const { refetch: fetchChapterInfo } = useQuery({
        queryKey: ["chapter", chapter_id],
        queryFn: () => chapter_client.get(chapter_id),
        enabled: false,
    })

    const { mutate: saveChapterContent } = useMutation(async (chapter_info: Chapter) => {
        const presigned_upload = await s3_client.getChapterPresignedUpload(chapter_info.contentPath)
        const chapter_content = editor?.getJSON() || {}
        await s3_client.uploadChapterContent(presigned_upload, chapter_content)
        toast.success("Chapter saved!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }, {})

    const handleSaveChapter = async () => {
        const { data: chapter_info } = await fetchChapterInfo()
        if (chapter_info) {
            saveChapterContent(chapter_info)
        }
    }

    if (!editor) {
        return <CenteredLoading />
    }

    return (
        <Stack className="mx-auto w-3/4">
            <ModalContainer
                opened={opened}
                onClose={() => setModalOpened(false)}
                content={modal_content}
            />

            <Drawer
                opened={side_opened}
                position="right"
                onClose={close}
                shadow="xl"
                title={
                    <Group position="apart">
                        <ThemeIcon variant="light" size="l">
                            <IconSettings2 size={24} />
                        </ThemeIcon>
                        <Title order={3}>Settings</Title>
                    </Group>
                }
                classNames={{
                    header: "pb-0",
                    content: "flex flex-col",
                    body: "flex-1",
                }}
                withOverlay={false}
                withCloseButton
            >
                <ChapterComments chapter_id={chapter_id || ""} />
            </Drawer>
            <Affix position={{ bottom: rem(20), right: rem(20) }}>
                <UnstyledButton
                    variant="filled"
                    color="blue"
                    className="rounded-full bg-blue-600 p-1 text-white"
                    onClick={open}
                >
                    <IconLayoutSidebarRightExpand size={24} />
                </UnstyledButton>
            </Affix>
            <Stack className="min-h-[95vh] gap-0 px-6">
                <EditorMenu editor={editor} onSaveClick={handleSaveChapter} />
                <EditorContent editor={editor} className={styles.editor_content} />
            </Stack>
        </Stack>
    )
}
