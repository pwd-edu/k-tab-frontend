import { ActionIcon, Box, Card, Group, Stack, TextInput } from "@mantine/core"
import { clsx } from "@mantine/core"
import { TextInputProps } from "@mantine/core"
import { Checkbox } from "@mantine/core"
import { IconCirclePlus, IconEdit, IconGripVertical } from "@tabler/icons"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { debounce } from "lodash"
import { nanoid } from "nanoid"
import { ChangeEvent, useState } from "react"

interface McqOptionProps {
    text: string
    answer: boolean
    onTextUpdated?: (text: string) => void
    onAnswerUpdated?: (answer: boolean) => void
}

type _OptionsAttrs = Omit<McqOptionProps, "onUpdated" | "answer">
interface OptionsAttrs extends _OptionsAttrs {
    id: string
    order: number
}

export const McqBuild = (props: NodeViewProps) => {
    const [question, setQuestion] = useState<string>(props.node.attrs.question || "")
    const [options, setOptions] = useState<OptionsAttrs[]>(props.node.attrs.options || [])
    const [answer, setAnswer] = useState<string>(props.node.attrs.answer || "")

    const [disabled, setDisabled] = useState<boolean>(true)

    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }

    const handleBlur = () => {
        setDisabled(true)
        props.updateAttributes({ question })
    }

    const handleToggleEdit = () => {
        setDisabled(!disabled)
    }

    const handleAddOption = () => {
        const new_option: OptionsAttrs = {
            id: nanoid(16),
            text: "",
            order: options[options.length - 1]?.order + 1 || 0,
        }
        const updated_options = [...options, new_option]
        setOptions(updated_options)
        props.updateAttributes({ options: updated_options })
    }

    const handleOptionTextUpdate = debounce((id: string, text: string) => {
        const new_options = options.map((option) => {
            if (option.id === id) {
                return { ...option, text }
            }
            return option
        })
        setOptions(new_options)
        props.updateAttributes({ options: new_options })
    }, 500)

    const handleOptionAnswerUpdate = debounce((id: string, answer: boolean) => {
        if (answer === true) {
            setAnswer(id)
            props.updateAttributes({ answer: id })
        }
    }, 0)

    return (
        <NodeViewWrapper className="flex justify-center">
            <Card
                className={clsx("my-2", props.editor.isEditable ? "w-1/2" : "w-3/4", "p-2")}
                withBorder
                data-drag-handle
            >
                <Group className="mb-2">
                    <McqText
                        className="grow font-semibold"
                        placeholder="Write your question"
                        rightSection={
                            <ActionIcon onClick={handleToggleEdit}>
                                <IconEdit size="1rem" />
                            </ActionIcon>
                        }
                        disabled={disabled}
                        value={question}
                        onChange={handleEdit}
                        onBlur={handleBlur}
                    />
                    <ActionIcon color="blue" onClick={handleAddOption}>
                        <IconCirclePlus size="2rem" />
                    </ActionIcon>
                </Group>
                <Stack className="gap-2">
                    {options
                        .sort((a, b) => a.order - b.order)
                        .map((option, i) => (
                            <McqOption
                                key={i}
                                text={option.text}
                                answer={option.id === answer}
                                onTextUpdated={(text) => handleOptionTextUpdate(option.id, text)}
                                onAnswerUpdated={(answer) =>
                                    handleOptionAnswerUpdate(option.id, answer)
                                }
                            />
                        ))}
                </Stack>
            </Card>
        </NodeViewWrapper>
    )
}

export const McqOption = (props: McqOptionProps) => {
    const [text, setText] = useState<string>(props.text)

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        props.onAnswerUpdated?.(e.target.checked)
    }

    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        props.onTextUpdated?.(e.target.value)
    }

    return (
        <Group>
            <McqText
                placeholder="Write your option"
                value={text}
                onChange={handleEdit}
                rightSection={
                    <Checkbox
                        classNames={{
                            input: "rounded-full",
                        }}
                        checked={props.answer}
                        onChange={handleCheck}
                    />
                }
            />
            <Box className="mx-1 box-border flex h-9 w-5 items-center justify-center">
                <IconGripVertical size="1.5rem" />
            </Box>
        </Group>
    )
}
const McqText = (props: TextInputProps) => {
    const { disabled, ...rest } = props
    return (
        <TextInput
            className="grow"
            classNames={{
                input: clsx(
                    disabled && [
                        "cursor-default",
                        "text-black",
                        "opacity-100",
                        "pointer-events-none",
                        "bg-gray-50",
                    ]
                ),
            }}
            disabled={false}
            {...rest}
        />
    )
}
