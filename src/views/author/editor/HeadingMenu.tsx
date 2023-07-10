import { Button, Kbd, Menu } from "@mantine/core"
import { IconChevronDown, IconHeading } from "@tabler/icons"
import { Editor } from "@tiptap/core"
import { Level } from "@tiptap/extension-heading"

// prettier-ignore
const HEADINGS: React.ReactNode[] = [
    <h1 key="heading_1" className="m-0"> Heading 1 </h1>,
    <h2 key="heading_2" className="m-0"> Heading 2 </h2>,
    <h3 key="heading_3" className="m-0"> Heading 3 </h3>,
    <h4 key="heading_4" className="m-0"> Heading 4 </h4>,
    <h5 key="heading_5" className="m-0"> Heading 5 </h5>,
    <h6 key="heading_6" className="m-0"> Heading 6 </h6>,
]

export function HeadingMenu({ editor }: { editor: Editor }) {
    return (
        <Menu position="top-start" width={300} withinPortal>
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
                    <IconHeading className="text-slate-800" size="18" />
                </Button>
            </Menu.Target>
            <Menu.Dropdown className="prose prose-sm p-2 shadow-lg">
                {HEADINGS.map((heading, i) => {
                    const level = (i + 1) as Level
                    return (
                        <Menu.Item
                            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                            rightSection={<Kbd className="p-0.5">Ctrl+Alt+{i + 1}</Kbd>}
                            className="h-8"
                            key={i}
                        >
                            {heading}
                        </Menu.Item>
                    )
                })}
            </Menu.Dropdown>
        </Menu>
    )
}
