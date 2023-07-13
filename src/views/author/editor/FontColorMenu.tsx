import { Button, CheckIcon, ColorPicker, ColorSwatch, Group, Menu, Stack } from "@mantine/core"
import { IconChevronDown, IconCircle, IconColorSwatch } from "@tabler/icons"
import { IconCircleFilled } from "@tabler/icons-react"
import { Editor } from "@tiptap/core"
import { useState } from "react"
import { shallow } from "zustand/shallow"

import { useEditorStore } from "./editor-store"

export function FontColorMenu({ editor }: { editor: Editor }) {
    const [current_color] = useEditorStore((state) => [state.current_color], shallow)
    const handleColorPick = (color: string) => {
        editor.commands.setColor(color)
    }
    return (
        <Menu position="top-start" withinPortal>
            <Menu.Target>
                <Button
                    className="m-0 h-7 p-0"
                    color="gray"
                    variant="subtle"
                    rightIcon={
                        <IconChevronDown className="text-slate-800" size={18} stroke={1.5} />
                    }
                    pr={12}
                >
                    <IconColorSwatch className="text-slate-800" size="18" />
                    <IconCircleFilled size="18" style={{ color: current_color }} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown className="">
                <EditorColorPicker onChange={handleColorPick} />
            </Menu.Dropdown>
        </Menu>
    )
}

const swatches = [
    "#111827",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
]

export function EditorColorPicker({ onChange }: { onChange: (color: string) => void }) {
    const [current_color, setCurrentColor] = useEditorStore(
        (state) => [state.current_color, state.setCurrentColor],
        shallow
    )
    const idx = swatches.indexOf(current_color)
    const [checked, setChecked] = useState(idx === -1 ? 0 : idx)

    const handleColorUpdate = (color: string) => {
        setCurrentColor(color)
        const index = swatches.indexOf(color)
        setChecked(index)
        onChange(color)
    }

    return (
        <Stack>
            <ColorPicker
                classNames={{
                    wrapper: "w-full",
                }}
                format="rgba"
                value={current_color}
                onChange={handleColorUpdate}
            />
            <Group className="gap-2 ">
                {swatches.map((swatch, i) => {
                    return (
                        <ColorSwatch
                            radius="sm"
                            key={i}
                            color={swatch}
                            onClick={() => {
                                handleColorUpdate(swatch)
                            }}
                            sx={{ color: "#fff", cursor: "pointer" }}
                        >
                            {checked == i && <CheckIcon width={10} />}
                        </ColorSwatch>
                    )
                })}
            </Group>
        </Stack>
    )
}
