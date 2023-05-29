import { ActionIcon, Card, Group, Stack, TextInput } from "@mantine/core"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { IconCirclePlus, IconEdit, IconCircleCheck } from "@tabler/icons"
import { clsx } from "@mantine/core"

import { ChangeEvent, useState } from "react"
import { TextInputProps } from "@mantine/core"
import { Checkbox, CheckboxProps } from "@mantine/core"

export interface McqBuildProps extends NodeViewProps {
    question: string
    options: string[]
    answer: number
}

export const McqBuild = (props: McqBuildProps) => {
    const [question, setQuestion] = useState<string>(props.question)
    const [options, setOptions] = useState<string[]>(props.options || [])
    const [answer, setAnswer] = useState<number>(props.answer)
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

    return (
        <NodeViewWrapper>
            <Card className="p-2" withBorder={true}>
                <Group className="mb-2">
                    <McqText
                        className="grow font-semibold"
                        placeholder="Write your question"
                        rightSection={
                            <ActionIcon onClick={handleToggleEdit}>
                                <IconEdit size="1.125rem" />
                            </ActionIcon>
                        }
                        disabled={disabled}
                        value={question}
                        onChange={handleEdit}
                        onBlur={handleBlur}
                    />
                    <ActionIcon color="blue">
                        <IconCirclePlus size="2rem" />
                    </ActionIcon>
                </Group>
                <Stack className="gap-2">
                    {options.map((option, i) => (
                        <McqOption key={i} option={option} answer={i === answer} />
                    ))}
                    <McqOption option={"hello this is an option"} answer={true} />
                    <McqOption option={"hello this is an option"} answer={true} />
                    <McqOption option={"hello this is an option"} answer={true} />
                </Stack>
            </Card>
        </NodeViewWrapper>
    )
}

interface McqOptionProps {
    option: string
    answer: boolean
    onUpdated?: (option: string, answer: boolean) => void
}

export const McqOption = (props: McqOptionProps) => {
    const [option, setOption] = useState<string>(props.option)
    const [checked, setChecked] = useState<boolean>(props.answer)
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        props.onUpdated?.(option, e.target.checked)
    }

    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value)
        props.onUpdated?.(e.target.value, checked)
    }

    return (
        <Group>
            <McqText
                placeholder="Write your option"
                value={option}
                onChange={handleEdit}
                rightSection={
                    <Checkbox
                        classNames={{
                            input: "rounded-full",
                        }}
                        checked={checked}
                        onChange={handleCheck}
                    />
                }
            />

            <ActionIcon color="blue" className="invisible">
                <IconCirclePlus size="2rem" />
            </ActionIcon>
        </Group>
    )
}
const McqText = (props: TextInputProps) => {
    return (
        <TextInput
            className="grow"
            classNames={{
                input: clsx([
                    "disabled:cursor-default",
                    "disabled:text-black",
                    "disabled:opacity-100",
                ]),
            }}
            {...props}
        />
    )
}
