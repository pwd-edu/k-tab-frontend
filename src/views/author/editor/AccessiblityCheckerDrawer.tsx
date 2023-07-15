import {
    ActionIcon,
    Button,
    Drawer,
    DrawerProps,
    Group,
    Stack,
    Text,
    ThemeIcon,
    rem,
} from "@mantine/core"
import { Title } from "@mantine/core"
import { IconAccessible, IconChevronLeft, IconChevronRight, IconInfoCircle } from "@tabler/icons"
import { Editor } from "@tiptap/core"
import { useEffect } from "react"
import { shallow } from "zustand/shallow"

import { useCheckerStore } from "./checker-store"
import { CHECKER_RULES, Rule } from "./extensions/rules"

interface AccessiblityCheckerDrawerProps extends DrawerProps {
    editor: Editor
    clearOnClose?: boolean
}

const AccessiblityCheckerDrawer = ({
    editor,
    onClose,
    opened,
    clearOnClose = true,
}: AccessiblityCheckerDrawerProps) => {
    const [errors] = useCheckerStore((state) => [state.errors], shallow)
    const [setErrors] = useCheckerStore((state) => [state.setErrors], shallow)
    const [err_idx] = useCheckerStore((state) => [state.current_err_index], shallow)
    const [setCurrentErrIndex] = useCheckerStore((state) => [state.setCurrentErrIndex], shallow)

    const enable_next = err_idx < errors.length - 1
    const enable_prev = err_idx > 0

    const curr_err = errors[err_idx]
    curr_err?.node.setAttribute("__checker_error", "true")

    const check = () => {
        const root = editor.options.element

        const checkNode = (node: Element) => {
            if (node.hasAttribute("__ignore_checker")) return
            for (const rule of CHECKER_RULES) {
                if (!rule.check(node)) {
                    return rule
                }
            }
        }

        walk(root, checkNode, (data) => {
            const errors = data.filter((d) => d.result)
            setErrors(errors)
            errors[0].node.scrollIntoView({ behavior: "smooth", block: "center" })
        })
    }

    const prevError = () => {
        if (err_idx > 0) {
            changeError(err_idx - 1)
        }
    }

    const nextError = () => {
        if (err_idx < errors.length - 1) {
            changeError(err_idx + 1)
        }
    }

    const changeError = (idx: number) => {
        curr_err?.node.removeAttribute("__checker_error")
        setCurrentErrIndex(idx)

        const err = errors[idx]
        err.node.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    useEffect(() => {
        if (opened) {
            check()
        }
    }, [opened])

    return (
        <Drawer
            opened={opened}
            title={
                <Group position="apart">
                    <ThemeIcon variant="light" size="l">
                        <IconAccessible size={24} />
                    </ThemeIcon>
                    <Title order={3}>Accessibility Checker</Title>
                </Group>
            }
            position="right"
            size={rem(400)}
            withCloseButton
            onClose={() => {
                if (clearOnClose) {
                    errors.forEach((err) => {
                        err.node.removeAttribute("__checker_error")
                    })
                    setCurrentErrIndex(0)
                    setErrors([])
                }
                onClose()
            }}
            withOverlay={false}
            shadow="xl"
        >
            {errors[err_idx]?.result && (
                <Stack>
                    <Title order={4}>{errors[err_idx].result.name}</Title>
                    <Text c="red" fw={500}>
                        {errors[err_idx].result.message()}
                    </Text>

                    <Group>
                        <ThemeIcon variant="light" size="l" color="gray">
                            <IconInfoCircle size={18} color="gray" />
                        </ThemeIcon>
                        <Text c="dimmed" fw={500}>
                            Help
                        </Text>
                    </Group>
                    <Text c="dimmed">{errors[err_idx].result.why()}</Text>
                </Stack>
            )}

            <Group position="apart" className="mt-4">
                <Button onClick={check}>Check</Button>

                <Group position="center">
                    <ActionIcon
                        color="blue"
                        variant="filled"
                        onClick={prevError}
                        disabled={!enable_prev}
                    >
                        <IconChevronLeft size="1rem" />
                    </ActionIcon>

                    <Text c="dimmed">
                        {err_idx + 1} / {errors.length}{" "}
                    </Text>

                    <ActionIcon
                        color="blue"
                        variant="filled"
                        onClick={nextError}
                        disabled={!enable_next}
                    >
                        <IconChevronRight size="1rem" />
                    </ActionIcon>
                </Group>
            </Group>
        </Drawer>
    )
}

const ELEMENT_NODE = 1

export interface TraverseResult<T = any> {
    node: Element
    result: T
}

const walk = (
    node: Node,
    fn: (node: Element) => any,
    done?: (data: TraverseResult<Rule>[]) => void
) => {
    const batchSize = 10
    const stack: Array<Node> = [node]
    const data = new Array<TraverseResult>()

    function processBatch(): void {
        for (let i = 0; i < batchSize && stack.length > 0; i++) {
            const node = stack.shift() as Element
            if (node?.nodeType === ELEMENT_NODE) {
                const result = fn(node)
                data.push({ node, result })
            }
            let child = node?.firstElementChild
            while (child) {
                stack.unshift(child)
                child = child.nextElementSibling
            }
        }
        if (stack.length > 0) {
            requestAnimationFrame(processBatch)
        } else if (done) {
            done(data.reverse())
        }
    }

    processBatch()
}

export default AccessiblityCheckerDrawer
