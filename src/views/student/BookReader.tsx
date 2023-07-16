import { FontPicker } from "@components/FontPicker"
import { BASE_EDITOR_EXTENSIONS } from "@constants"
import { BookClient } from "@fetch/index"
import { useChapterQuery } from "@fetch/useChapterQuery"
import {
    Affix,
    Box,
    Container,
    Drawer,
    Group,
    Slider,
    Stack,
    Switch,
    ThemeIcon,
    Title,
    UnstyledButton,
    clsx,
    createStyles,
    rem,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
    IconAdjustmentsHorizontal,
    IconArrowAutofitHeight,
    IconArrowAutofitWidth,
    IconCircleHalf2,
    IconColorFilter,
    IconContrast,
    IconLayoutGrid,
    IconLetterCase,
    IconSettings2,
    IconTypography,
} from "@tabler/icons"
import { IconFocusAuto, IconPhotoSensor } from "@tabler/icons-react"
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
    const { book_id, chapter_num } = useParams<BookEditorParams>()

    const [enable_line_focus] = useReaderStore((state) => [state.enableLineFocus], shallow)
    const [line_focus_height] = useReaderStore((state) => [state.lineFocusHeight], shallow)
    const [font_family] = useReaderStore((state) => [state.fontFamlily], shallow)
    const [enable_gray_scale] = useReaderStore((state) => [state.enableGrayScale], shallow)
    const [enable_invert_color] = useReaderStore((state) => [state.enableInvertColor], shallow)
    const [gray_scale_percent] = useReaderStore((state) => [state.grayScalePercent], shallow)
    const [enable_contrast] = useReaderStore((state) => [state.enableContrast], shallow)
    const [contrast_percent] = useReaderStore((state) => [state.contrastPercent], shallow)
    const [wide_view] = useReaderStore((state) => [state.wideView], shallow)

    const [setLineFocusHeight] = useReaderStore((state) => [state.setLineFocusHeight], shallow)
    const [setEnableLineFocus] = useReaderStore((state) => [state.setEnableLineFocus], shallow)
    const [setEnableContrast] = useReaderStore((state) => [state.setEnableContrast], shallow)
    const [setFontFamily] = useReaderStore((state) => [state.setFontFamily], shallow)
    const [setEnableGrayScale] = useReaderStore((state) => [state.setEnableGrayScale], shallow)
    const [setGrayScalePercent] = useReaderStore((state) => [state.setGrayScalePercent], shallow)
    const [setEnableInvertColor] = useReaderStore((state) => [state.setEnableInvertColor], shallow)
    const [setContrastPercent] = useReaderStore((state) => [state.setContrastPercent], shallow)
    const [setWideView] = useReaderStore((state) => [state.setWideView], shallow)

    const { data: book } = useQuery(["book", book_id], () => book_client.get(book_id || ""))
    const chapter_id = getChapterId(chapter_num, book)

    const { chapter_content } = useChapterQuery(book_id, chapter_id)

    const { theme, styles } = buildStyles({ enableLineFocus: enable_line_focus })
    const [opened, { open, close }] = useDisclosure(false)

    const editor = useEditor(
        {
            extensions: [...BASE_EDITOR_EXTENSIONS],
            content: chapter_content,
            editorProps: {
                attributes: {
                    class: clsx(
                        [enable_line_focus && "relative"],
                        [
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
                            <Box className="flex items-center gap-2">
                                <IconPhotoSensor size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Enable Line Focus</Title>
                            </Box>
                            <Switch
                                checked={enable_line_focus}
                                onChange={() => setEnableLineFocus(!enable_line_focus)}
                            />
                        </Group>

                        <Group position="apart">
                            <Box className="flex items-center gap-2">
                                <IconArrowAutofitHeight size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Line Focus Height</Title>
                            </Box>
                            <Slider
                                value={line_focus_height}
                                step={0.1}
                                min={0}
                                max={50}
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
                            <Box className="flex items-center gap-2">
                                <IconLetterCase size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Font Family</Title>
                            </Box>

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
                    <Box>
                        <Group position="apart">
                            <Title order={5} color="blue">
                                Color
                            </Title>
                            <IconContrast size={28} color={theme.colors.blue[6]} />
                        </Group>
                        <hr className="my-2 border-gray-200" />

                        <Group position="apart">
                            <Box className="flex items-center gap-2">
                                <IconColorFilter size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Enable Gray Scale</Title>
                            </Box>
                            <Switch
                                checked={enable_gray_scale}
                                onChange={() => {
                                    setEnableGrayScale(!enable_gray_scale)
                                    setEnableInvertColor(false)
                                }}
                            />
                        </Group>

                        <Group position="apart">
                            <Box className="flex items-center gap-2">
                                <IconAdjustmentsHorizontal size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Gray Scale Percent</Title>
                            </Box>
                            <Slider
                                value={gray_scale_percent}
                                step={0.1}
                                min={0}
                                max={100}
                                label={(value) => Math.ceil(value)}
                                onChange={(value) => setGrayScalePercent(value)}
                                color="blue"
                                className="w-1/2"
                            />
                        </Group>
                        <Group position="apart" className="mt-4">
                            <Box className="flex items-center gap-2">
                                <IconCircleHalf2 size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Invert Color</Title>
                            </Box>

                            <Switch
                                checked={enable_invert_color}
                                onChange={() => {
                                    setEnableInvertColor(!enable_invert_color)
                                    setEnableGrayScale(false)
                                }}
                            />
                        </Group>

                        <Group position="apart" className="mt-4">
                            <Box className="flex items-center gap-2">
                                <IconContrast size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Enable Contrast</Title>
                            </Box>
                            <Switch
                                checked={enable_contrast}
                                onChange={() => {
                                    setEnableContrast(!enable_contrast)
                                }}
                            />
                        </Group>
                        <Group position="apart">
                            <Box className="flex items-center gap-2">
                                <IconAdjustmentsHorizontal size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Contrast Percent</Title>
                            </Box>
                            <Slider
                                value={contrast_percent}
                                step={0.1}
                                min={5}
                                max={200}
                                label={(value) => Math.ceil(value)}
                                onChange={(value) => setContrastPercent(value)}
                                color="blue"
                                className="w-1/2"
                            />
                        </Group>
                    </Box>
                    <Box>
                        <Group position="apart">
                            <Title order={5} color="blue">
                                View Mode
                            </Title>
                            <IconLayoutGrid size={28} color={theme.colors.blue[6]} />
                        </Group>
                        <hr className="my-2 border-gray-200" />

                        <Group position="apart">
                            <Box className="flex items-center gap-2">
                                <IconArrowAutofitWidth size={18} color={theme.colors.gray[6]} />
                                <Title order={5}>Wide View</Title>
                            </Box>
                            <Switch
                                checked={wide_view}
                                onChange={() => {
                                    setWideView(!wide_view)
                                }}
                            />
                        </Group>
                    </Box>
                </Stack>
            </Drawer>
            <Affix position={{ bottom: rem(20), right: rem(20) }}>
                <UnstyledButton
                    variant="filled"
                    color="blue"
                    className="rounded-full bg-blue-600 p-1 text-white"
                    onClick={open}
                >
                    <IconSettings2 size={24} />
                </UnstyledButton>
            </Affix>
            <EditorContent editor={editor} className={styles.editor_content} />
        </Container>
    )
}
