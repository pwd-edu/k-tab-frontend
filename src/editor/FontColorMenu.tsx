import { Editor } from "@tiptap/core"

import { Button, Group, Stack, Menu, ColorSwatch, CheckIcon } from "@mantine/core"
import { IconColorSwatch, IconChevronDown } from "@tabler/icons"
import { useState } from "react"

export function FontColorMenu({ editor }: { editor: Editor }) {
    const handleColorPick = (color: string) => {
        editor.commands.setColor(color)
    }
    return (
        <Menu position="top-start" withinPortal>
            <Menu.Target>
                <Button
                    className="p-0 m-0 h-7"
                    color="gray"
                    variant="subtle"
                    rightIcon={
                        <IconChevronDown className="text-slate-800" size={18} stroke={1.5} />
                    }
                    pr={12}
                >
                    <IconColorSwatch className="text-slate-800" size="18" />
                </Button>
            </Menu.Target>
            <Menu.Dropdown className="">
                <ColorPicker onChange={handleColorPick} />
            </Menu.Dropdown>
        </Menu>
    )
}

export function ColorPicker({ onChange }: { onChange: (color: string) => void }) {
    const [checked, setChecked] = useState(0)
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
    const handleColorUpdate = (color: string) => {
        const index = swatches.indexOf(color)
        setChecked(index)
        onChange(color)
    }

    return (
        <Stack>
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
