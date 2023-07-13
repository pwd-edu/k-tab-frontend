import { FontPicker } from "@components/FontPicker"
import { BASE_EDITOR_EXTENSIONS } from "@constants"
import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import {
    Box,
    Button,
    Container,
    Drawer,
    Group,
    Header,
    Input,
    Slider,
    Stack,
    Switch,
    Text,
    ThemeIcon,
    Title,
    UnstyledButton,
    clsx,
    createStyles,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconFocusCentered, IconSettings, IconSettings2, IconTypography } from "@tabler/icons"
import { IconFocusAuto } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { EditorContent, useEditor } from "@tiptap/react"
import { getChapterId } from "@utils/chapter-id-idx"
import { useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { BookEditorParams } from "../../types"
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
    const [enableLineFocus] = useReaderStore((state) => [state.enableLineFocus], shallow)
    const [setLineFocusHeight] = useReaderStore((state) => [state.setLineFocusHeight], shallow)
    const [setEnableLineFocus] = useReaderStore((state) => [state.setEnableLineFocus], shallow)
    const [line_focus_height] = useReaderStore((state) => [state.lineFocusHeight], shallow)
    const [font_family] = useReaderStore((state) => [state.fontFamlily], shallow)
    const [setFontFamily] = useReaderStore((state) => [state.setFontFamily], shallow)
    const { book_id, chapter_num } = useParams<BookEditorParams>()

    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)

    const { chapter_content } = useChapterQuery(book_id, chapter_id)

    const { theme, styles } = buildStyles({ enableLineFocus })
    const enable_line_focus = enableLineFocus || false
    const [opened, { open, close }] = useDisclosure(false)

    const editor = useEditor(
        {
            extensions: [...BASE_EDITOR_EXTENSIONS],
            content: chapter_content,
            editorProps: {
                attributes: {
                    class: clsx([enable_line_focus && "relative"]),
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
        <Container className={styles.reader_container} size="xl">
            <Drawer
                opened={opened}
                position="right"
                onClose={close}
                title={
                    <Group position="apart">
                        <ThemeIcon variant="light" size="l">
                            <IconSettings2 size={24} />
                        </ThemeIcon>
                        <Title order={3}>Settings</Title>
                    </Group>
                }
                withOverlay={false}
                withCloseButton
            >
                <Stack spacing="md">
                    <Box>
                        <Group position="apart">
                            <Title order={5} color="blue">
                                Line Focus
                            </Title>
                            <IconFocusAuto size={28} color={theme.colors.blue[6]} />
                        </Group>
                        <hr className="my-2 border-gray-200" />

                        <Group position="apart">
                            <Title order={5}>Enable Line Focus</Title>
                            <Switch
                                checked={enable_line_focus}
                                onChange={() => setEnableLineFocus(!enable_line_focus)}
                            />
                        </Group>

                        <Group position="apart">
                            <Title order={5}>Line Focus Height</Title>
                            <Slider
                                value={line_focus_height}
                                step={0.1}
                                min={0}
                                max={100}
                                label={(value) => Math.ceil(value)}
                                onChange={(value) => setLineFocusHeight(value)}
                                color="blue"
                                className="w-1/2"
                            />
                        </Group>
                    </Box>

                    <Box>
                        <Group position="apart">
                            <Title order={5} color="blue">
                                Font
                            </Title>
                            <IconTypography size={28} color={theme.colors.blue[6]} />
                        </Group>
                        <hr className="my-2 border-gray-200" />

                        <Group position="apart">
                            <Title order={5}>Font Family</Title>
                            <FontPicker
                                value={font_family}
                                onSelected={(font) => {
                                    editor?.chain().selectAll().setFontFamily(font).run()
                                    setFontFamily(font)
                                }}
                                btnClasNames={{
                                    root: "h-auto px-4 text-slate-800 bg-slate-100 hover:bg-slate-200",
                                    label: "gap-2 py-1",
                                }}
                            />
                        </Group>
                    </Box>
                </Stack>
            </Drawer>
            <UnstyledButton
                variant="filled"
                color="blue"
                className="absolute bottom-5 right-5 rounded-full bg-blue-600 p-1 text-white"
                onClick={open}
            >
                <IconSettings2 size={24} />
            </UnstyledButton>
            <EditorContent editor={editor} className={styles.editor_content} />
        </Container>
    )
}
