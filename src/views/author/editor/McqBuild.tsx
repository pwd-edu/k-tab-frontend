import {
    ActionIcon,
    Box,
    Card,
    Group,
    Input,
    Stack,
    Tabs,
    Textarea,
    TextareaProps,
} from "@mantine/core"
import { clsx } from "@mantine/core"
import { Checkbox } from "@mantine/core"
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons"
import { IconHelpHexagon, IconInfoOctagon } from "@tabler/icons-react"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { debounce } from "lodash"
import { nanoid } from "nanoid"
import { ChangeEvent, useState } from "react"
import { toast } from "react-toastify"

interface McqOptionProps {
    text: string
    answer: boolean
    enableEdit: boolean
    onTextUpdated?: (text: string) => void
    onAnswerUpdated?: (answer: boolean) => void
    onDeleted?: () => void
}

type _OptionsAttrs = Omit<McqOptionProps, "onUpdated" | "answer" | "enableEdit">
interface OptionsAttrs extends _OptionsAttrs {
    id: string
    order: number
}

export const McqBuild = (props: NodeViewProps) => {
    const edit_mode = props.editor.isEditable
    const [question, setQuestion] = useState<string>(props.node.attrs.question || "")
    const [options, setOptions] = useState<OptionsAttrs[]>(props.node.attrs.options || [])
    const [answer, setAnswer] = useState<string>(edit_mode ? props.node.attrs.answer || "" : "")

    const [disabled, setDisabled] = useState<boolean>(true)

    const handleEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
            if (props.editor.isEditable) {
                props.updateAttributes({ answer: id })
            } else {
                const correct_answer = props.node.attrs.answer
                if (correct_answer !== id) {
                    toast.error("Wrong answer", {
                        autoClose: 1000,
                    })
                } else {
                    toast.success("Correct answer", {
                        autoClose: 1000,
                    })
                }
            }
        }
    }, 0)

    const handleOptionDelete = (id: string) => {
        const new_options = options.filter((option) => option.id !== id)
        setOptions(new_options)
        props.updateAttributes({ options: new_options })
    }

    const handleExplainationEdit = debounce((explaination: string) => {
        if (explaination) {
            console.log("debounce")
            props.updateAttributes({ explaination: explaination })
        }
    }, 500)

    return (
        <NodeViewWrapper className="flex justify-center" contentEditable={false}>
            <Card className={clsx("my-2", "w-3/4", "p-2")} withBorder data-drag-handle>
                <Tabs defaultValue="question">
                    <Tabs.List>
                        <Tabs.Tab value="question" icon={<IconHelpHexagon size={18} />}>
                            Question
                        </Tabs.Tab>
                        <Tabs.Tab value="explain" icon={<IconInfoOctagon size={18} />}>
                            Explaination
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="question" pt="xs">
                        <Group className="mb-2">
                            <McqText
                                className="grow font-semibold"
                                classNames={{
                                    input: clsx(
                                        "text-lg font-semibold",
                                        disabled && [
                                            "cursor-default",
                                            "text-black",
                                            "opacity-100",
                                            "pointer-events-none",
                                            "bg-gray-50",
                                        ]
                                    ),
                                }}
                                placeholder="Write your question"
                                rightSection={
                                    props.editor.isEditable && (
                                        <ActionIcon onClick={handleToggleEdit}>
                                            <IconEdit size="1rem" />
                                        </ActionIcon>
                                    )
                                }
                                disabled={disabled}
                                value={question}
                                onChange={handleEdit}
                                onBlur={handleBlur}
                                enableEdit={props.editor.isEditable}
                            />
                            {props.editor.isEditable && (
                                <ActionIcon color="blue" onClick={handleAddOption}>
                                    <IconCirclePlus size="2rem" />
                                </ActionIcon>
                            )}
                        </Group>
                        <Stack className="gap-2">
                            {options
                                .sort((a, b) => a.order - b.order)
                                .map((option, i) => (
                                    <McqOption
                                        key={i}
                                        text={option.text}
                                        answer={option.id === answer}
                                        onTextUpdated={(text) =>
                                            handleOptionTextUpdate(option.id, text)
                                        }
                                        onAnswerUpdated={(answer) =>
                                            handleOptionAnswerUpdate(option.id, answer)
                                        }
                                        onDeleted={() => handleOptionDelete(option.id)}
                                        enableEdit={props.editor?.isEditable}
                                    />
                                ))}
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="explain" pt="xs">
                        <ExplainationEditor
                            onTextUpdated={handleExplainationEdit}
                            explaination={props.node.attrs.explaination}
                            enableEdit={props.editor.isEditable}
                        />
                    </Tabs.Panel>
                </Tabs>
            </Card>
        </NodeViewWrapper>
    )
}

const ExplainationEditor = (props: {
    explaination: string
    onTextUpdated: (text: string) => void
    enableEdit: boolean
}) => {
    const [text, setText] = useState<string>(props.explaination)

    return (
        <Textarea
            placeholder="Write your explaination"
            minRows={5}
            value={text}
            className={clsx(
                "w-full",
                !props.enableEdit && [
                    "cursor-default",
                    "text-black",
                    "opacity-100",
                    "pointer-events-none",
                    "bg-gray-50",
                ]
            )}
            onChange={(e) => {
                setText(e.target.value)
                props.onTextUpdated(e.target.value)
            }}
        />
    )
}

export const McqOption = (props: McqOptionProps) => {
    const [text, setText] = useState<string>(props.text)

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        props.onAnswerUpdated?.(e.target.checked)
    }

    const handleEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
                enableEdit={props.enableEdit}
            />
            {props.enableEdit && (
                <Box className="mx-1 box-border flex h-9 w-5 items-center justify-center">
                    <ActionIcon color="red">
                        <IconTrash size={18} color="red" onClick={props.onDeleted} />
                    </ActionIcon>
                </Box>
            )}
        </Group>
    )
}

interface McqTextProps extends TextareaProps {
    enableEdit?: boolean
}

const McqText = (props: McqTextProps) => {
    const { disabled, value, onChange, rightSection, classNames, enableEdit, onBlur } = props
    return (
        <Input
            component="textarea"
            multiline
            className="grow"
            classNames={
                classNames ||
                (enableEdit
                    ? {
                          input: clsx(
                              disabled && [
                                  "cursor-default",
                                  "text-black",
                                  "opacity-100",
                                  "pointer-events-none",
                                  "bg-gray-50",
                              ]
                          ),
                      }
                    : {
                          input: clsx(
                              "cursor-default",
                              "text-black",
                              "opacity-100",
                              "pointer-events-none"
                          ),
                      })
            }
            disabled={false}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rightSection={rightSection}
        />
    )
}
