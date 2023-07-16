import { BASE_EDITOR_EXTENSIONS } from "@constants"
import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import {
    Affix,
    Box,
    Container,
    Drawer,
    Group,
    Stack,
    Tabs,
    ThemeIcon,
    Title,
    UnstyledButton,
    clsx,
    createStyles,
    rem,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconLayoutSidebarRightExpand, IconMessages, IconSettings2 } from "@tabler/icons"
import { useQuery } from "@tanstack/react-query"
import { EditorContent, useEditor } from "@tiptap/react"
import { getChapterId } from "@utils/chapter-id-idx"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { BookEditorParams } from "../../types"
import { ChapterComments } from "../user/ChapterComments"
import { ReaderSettings } from "./ReaderSettings"
import { useReaderStore } from "./reader-store"

const book_client = BookClient()

const useStyles = createStyles(() => ({}))
const buildStyles = (params?: any) => {
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        reader_container: cx(),
        editor_content: cx(["flex flex-1 flex-row"]),
    }
    return { styles, classes, cx, theme }
}

export const BookReader = () => {
    const { book_id, chapter_num } = useParams<BookEditorParams>()

    const [enable_line_focus] = useReaderStore((state) => [state.enableLineFocus], shallow)
    const [wide_view] = useReaderStore((state) => [state.wideView], shallow)

    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)

    const { chapter_content } = useChapterQuery(book_id, chapter_id)

    const { styles } = buildStyles({ enableLineFocus: enable_line_focus })
    const [opened, { open, close }] = useDisclosure(false)
    const [activeTab, setActiveTab] = useState<string | null>("settings")

    const editor = useEditor(
        {
            extensions: [...BASE_EDITOR_EXTENSIONS],
            content: chapter_content,
            editorProps: {
                attributes: {
                    class: clsx(
                        [enable_line_focus && "relative"],
                        [
                            "_editor-top_",
                            "prose prose-lg max-w-none flex-1 justify-center p-6",
                            "focus:outline-none prose-headings:m-0 [&_p]:m-0",
                        ]
                    ),
                },
            },
            onCreate: ({ editor }) => {
                editor.chain().setLineFocus({ id: "line-focus" }).run()
            },
            editable: false,
        },
        [chapter_content]
    )

    return (
        <Container className={styles.reader_container} size={wide_view ? "lg" : "md"}>
            <Drawer
                opened={opened}
                position="right"
                onClose={close}
                shadow="xl"
                title={
                    <Group position="apart">
                        <ThemeIcon variant="light" size="l">
                            {activeTab === "settings" ? (
                                <IconSettings2 size={24} />
                            ) : (
                                <IconMessages size={24} />
                            )}
                        </ThemeIcon>
                        {activeTab === "settings" ? (
                            <Title order={3}>Settings</Title>
                        ) : (
                            <Title order={3}>Community</Title>
                        )}
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
                <Tabs value={activeTab} onTabChange={setActiveTab} className="flex h-full flex-col">
                    <Box className="flex-1">
                        <Tabs.Panel value="settings" className="pt-0">
                            <Stack spacing="md">
                                <ReaderSettings editor={editor} />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="community" pt="xs">
                            <ChapterComments chapter_id={chapter_id || ""} />
                        </Tabs.Panel>
                    </Box>

                    <Tabs.List className="sticky bottom-0 bg-white">
                        <Tabs.Tab value="settings" icon={<IconSettings2 size={18} />}>
                            Settings
                        </Tabs.Tab>
                        <Tabs.Tab value="community" icon={<IconMessages size={18} />}>
                            Community
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
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
            <EditorContent editor={editor} className={styles.editor_content} />
        </Container>
    )
}
