import { Button, ButtonProps, Menu, createStyles, rem } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import { useState } from "react"
import { shallow } from "zustand/shallow"

import { useEditorStore } from "../views/author/editor/editor-store"

const FONTS = [
    "Roboto",
    "OpenDyslexic3",
    "Sans-serif",
    "Times New Roman",
    "Georgia",
    "Comic Sans",
    "Arial",
]

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
    control: {
        width: rem(200),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: theme.radius.md,
        border: `${rem(1)} solid`,
        transition: "background-color 150ms ease",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    label: {
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
    },

    icon: {
        transition: "transform 150ms ease",
        transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    },
}))

export interface FontPickerProps {
    value?: string
    onSelected: (value: string) => void
    btnClasNames?: ButtonProps["classNames"]
}

export function FontPicker({ value, btnClasNames, onSelected }: FontPickerProps) {
    const [opened, setOpened] = useState(false)
    const { classes, cx } = useStyles({ opened })

    const updateSelected = (value: string) => {
        if (onSelected) {
            onSelected(value)
        }
    }

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            position="bottom-start"
            withinPortal
        >
            <Menu.Target>
                <Button
                    variant="subtle"
                    color="gray"
                    classNames={
                        btnClasNames || {
                            root: cx("h-auto px-4 text-slate-800"),
                            label: "gap-2 py-1",
                        }
                    }
                >
                    {value}
                    <IconChevronDown className={cx("text-slate-800", classes.icon)} size="18" />
                </Button>
            </Menu.Target>
            <Menu.Dropdown className=" w-64">
                {FONTS.map((item) => (
                    <Menu.Item onClick={() => updateSelected(item)} key={item}>
                        {item}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    )
}
