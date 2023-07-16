import { FontPicker } from "@components/FontPicker"
import { Box, Group, MantineSize, Slider, Switch, Title, useMantineTheme } from "@mantine/core"
import {
    IconAdjustmentsHorizontal,
    IconArrowAutofitWidth,
    IconCircleHalf2,
    IconColorFilter,
    IconContrast,
    IconLayoutGrid,
    IconLetterCase,
    TablerIcon,
} from "@tabler/icons"
import { IconFocusAuto, IconPhotoSensor } from "@tabler/icons-react"
import { Editor } from "@tiptap/core"
import { shallow } from "zustand/shallow"

import { useReaderStore } from "./reader-store"

interface SettingItemProps {
    title: string
    ControlIcon: TablerIcon
    control: React.ReactNode
}

interface SettingGroup {
    title: string
    GroupIcon: TablerIcon
    SettingItems: SettingItemProps[]
}

interface SettingGroupProps {
    title: string
    GroupIcon: TablerIcon
    children: React.ReactNode
}

export const ReaderSettings = ({ editor }: { editor: Editor | null }) => {
    const SETTINGS: SettingGroup[] = [
        {
            title: "Line Focus",
            GroupIcon: IconFocusAuto,
            SettingItems: [
                {
                    title: "Enable Line Focus",
                    ControlIcon: IconPhotoSensor,
                    control: <EnableLineFocus />,
                },
                {
                    title: "Line Focus Height",
                    ControlIcon: IconAdjustmentsHorizontal,
                    control: <LineFocusHeight />,
                },
            ],
        },
        {
            title: "Font",
            GroupIcon: IconLetterCase,
            SettingItems: [
                {
                    title: "Font Family",
                    ControlIcon: IconLetterCase,
                    control: <FontFamily editor={editor} />,
                },
                {
                    title: "Font Size",
                    ControlIcon: IconAdjustmentsHorizontal,
                    control: <FontSize editor={editor} />,
                },
                {
                    title: "Font Spacing",
                    ControlIcon: IconAdjustmentsHorizontal,
                    control: <FontSpacing />,
                },
            ],
        },
        {
            title: "Color",
            GroupIcon: IconContrast,
            SettingItems: [
                {
                    title: "Enable Gray Scale",
                    ControlIcon: IconColorFilter,
                    control: <EnableGrayScale />,
                },
                {
                    title: "Gray Scale Percent",
                    ControlIcon: IconAdjustmentsHorizontal,
                    control: <GrayScalePercent />,
                },
                {
                    title: "Invert Color",
                    ControlIcon: IconCircleHalf2,
                    control: <EnableInvertColor />,
                },
                {
                    title: "Enable Contrast",
                    ControlIcon: IconContrast,
                    control: <EnableContrast />,
                },
                {
                    title: "Contrast Percent",
                    ControlIcon: IconAdjustmentsHorizontal,
                    control: <ContrastPercent />,
                },
            ],
        },
        {
            title: "View Mode",
            GroupIcon: IconLayoutGrid,
            SettingItems: [
                {
                    title: "Wide View",
                    ControlIcon: IconArrowAutofitWidth,
                    control: <WideView />,
                },
            ],
        },
    ]
    return (
        <Box className="">
            {SETTINGS.map((setting) => (
                <SettingGroup
                    key={setting.title}
                    title={setting.title}
                    GroupIcon={setting.GroupIcon}
                >
                    {setting.SettingItems.map((settingItem) => (
                        <SettingItem
                            key={settingItem.title}
                            title={settingItem.title}
                            ControlIcon={settingItem.ControlIcon}
                            control={settingItem.control}
                        />
                    ))}
                </SettingGroup>
            ))}
        </Box>
    )
}

const SettingGroup = ({ title, GroupIcon, children }: SettingGroupProps) => {
    const theme = useMantineTheme()
    return (
        <Box className="mt-4">
            <Group position="apart">
                <Title order={5} color="blue">
                    {title}
                </Title>
                <GroupIcon size={28} color={theme.colors.blue[6]} />
            </Group>
            <hr className="my-2 border-gray-200" />
            {children}
        </Box>
    )
}

const SettingItem = ({ title, ControlIcon, control }: SettingItemProps) => {
    const theme = useMantineTheme()
    return (
        <Group position="apart">
            <Box className="flex items-center gap-2">
                <ControlIcon size={18} color={theme.colors.gray[6]} />
                <Title order={5}>{title}</Title>
            </Box>
            {control}
        </Group>
    )
}

const EnableLineFocus = () => {
    const [enable_line_focus] = useReaderStore((state) => [state.enableLineFocus], shallow)
    const [setEnableLineFocus] = useReaderStore((state) => [state.setEnableLineFocus], shallow)
    return (
        <Switch
            checked={enable_line_focus}
            onChange={() => setEnableLineFocus(!enable_line_focus)}
        />
    )
}

const LineFocusHeight = () => {
    const [line_focus_height] = useReaderStore((state) => [state.lineFocusHeight], shallow)
    const [setLineFocusHeight] = useReaderStore((state) => [state.setLineFocusHeight], shallow)
    return (
        <Slider
            value={line_focus_height}
            step={0.1}
            min={0}
            max={20}
            label={(value) => Math.ceil(value) + "%"}
            onChange={(value) => setLineFocusHeight(value)}
            color="blue"
            className="w-1/2"
        />
    )
}

const FontFamily = ({ editor }: { editor: Editor | null }) => {
    const [font_family] = useReaderStore((state) => [state.fontFamlily], shallow)
    const [setFontFamily] = useReaderStore((state) => [state.setFontFamily], shallow)
    return (
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
    )
}

const EnableGrayScale = () => {
    const [enable_gray_scale] = useReaderStore((state) => [state.enableGrayScale], shallow)
    const [setEnableGrayScale] = useReaderStore((state) => [state.setEnableGrayScale], shallow)
    const [setEnableInvertColor] = useReaderStore((state) => [state.setEnableInvertColor], shallow)
    return (
        <Switch
            checked={enable_gray_scale}
            onChange={() => {
                setEnableGrayScale(!enable_gray_scale)
                setEnableInvertColor(false)
            }}
        />
    )
}

const EnableInvertColor = () => {
    const [enable_invert_color] = useReaderStore((state) => [state.enableInvertColor], shallow)
    const [setEnableInvertColor] = useReaderStore((state) => [state.setEnableInvertColor], shallow)
    const [setEnableGrayScale] = useReaderStore((state) => [state.setEnableGrayScale], shallow)
    return (
        <Switch
            checked={enable_invert_color}
            onChange={() => {
                setEnableInvertColor(!enable_invert_color)
                setEnableGrayScale(false)
            }}
        />
    )
}

const GrayScalePercent = () => {
    const [gray_scale_percent] = useReaderStore((state) => [state.grayScalePercent], shallow)
    const [setGrayScalePercent] = useReaderStore((state) => [state.setGrayScalePercent], shallow)
    return (
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
    )
}

const EnableContrast = () => {
    const [enable_contrast] = useReaderStore((state) => [state.enableContrast], shallow)
    const [setEnableContrast] = useReaderStore((state) => [state.setEnableContrast], shallow)
    return (
        <Switch
            checked={enable_contrast}
            onChange={() => {
                setEnableContrast(!enable_contrast)
            }}
        />
    )
}

const ContrastPercent = () => {
    const [contrast_percent] = useReaderStore((state) => [state.contrastPercent], shallow)
    const [setContrastPercent] = useReaderStore((state) => [state.setContrastPercent], shallow)
    return (
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
    )
}

const WideView = () => {
    const [wide_view] = useReaderStore((state) => [state.wideView], shallow)
    const [setWideView] = useReaderStore((state) => [state.setWideView], shallow)
    return (
        <Switch
            checked={wide_view}
            onChange={() => {
                setWideView(!wide_view)
            }}
        />
    )
}

const MARKS: { value: number; label: MantineSize; size: string }[] = [
    { value: 0, label: "xs", size: "0.875rem" },
    { value: 25, label: "sm", size: "1rem" },
    { value: 50, label: "md", size: "1.125rem" },
    { value: 75, label: "lg", size: "1.25rem" },
    { value: 100, label: "xl", size: "1.5rem" },
]

const FontSize = (props: { editor: Editor | null }) => {
    const [text_size] = useReaderStore((state) => [state.textSize], shallow)
    const [setTextSize] = useReaderStore((state) => [state.setTextSize], shallow)
    const value = MARKS.find((mark) => mark.label === text_size)?.value
    return (
        <Slider
            value={value}
            label={(val) => MARKS.find((mark) => mark.value === val)?.label}
            defaultValue={50}
            className="w-1/2"
            min={0}
            max={100}
            step={25}
            marks={MARKS}
            styles={{ markLabel: { display: "none" } }}
            onChange={(value) => {
                const new_size = MARKS.find((mark) => mark.value === value)?.label || "md"
                setTextSize(new_size)
            }}
        />
    )
}

const FontSpacing = () => {
    const [text_spacing] = useReaderStore((state) => [state.textSpacing], shallow)
    const [setTextSpacing] = useReaderStore((state) => [state.setTextSpacing], shallow)
    const value = MARKS.find((mark) => mark.label === text_spacing)?.value
    return (
        <Slider
            value={value}
            label={(val) => MARKS.find((mark) => mark.value === val)?.label}
            defaultValue={50}
            className="w-1/2"
            min={0}
            max={100}
            step={25}
            marks={MARKS}
            onChange={(value) => {
                const new_spacing = MARKS.find((mark) => mark.value === value)?.label || "md"
                setTextSpacing(new_spacing)
            }}
            color="blue"
        />
    )
}
