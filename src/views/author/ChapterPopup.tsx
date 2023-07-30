import { Button, Dialog, Group, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export function addNewChapter() {
    const [opened, { toggle, close }] = useDisclosure(false)

    return (
        <>
            <Group position="center">
                <Button onClick={toggle}>Toggle dialog</Button>
            </Group>

            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <Text size="sm" mb="xs" weight={500}>
                    Add Chapter Name
                </Text>

                <Group align="flex-end">
                    <TextInput placeholder="Chapter 1" sx={{ flex: 1 }} />
                    {/* add contribution text box and input */}
                    <Button onClick={close}>Add</Button>
                </Group>
            </Dialog>
        </>
    )
}
