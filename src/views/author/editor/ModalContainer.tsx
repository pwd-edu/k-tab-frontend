import { Modal } from "@mantine/core"

interface ModalContainerProps {
    content?: React.ReactNode
    opened: boolean
    onClose: () => void
}

export function ModalContainer({ content, opened, onClose }: ModalContainerProps) {
    return (
        <Modal centered opened={opened} onClose={onClose} size="xl">
            {content}
        </Modal>
    )
}
