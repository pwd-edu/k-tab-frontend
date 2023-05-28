import { FileWithPath } from "@mantine/dropzone"
import { create } from "zustand"

type State = {
    modal_opened: boolean
    images: FileWithPath[]
    modal_content: React.ReactNode | null
}

type Action = {
    setModalOpened: (opened: State["modal_opened"]) => void
    setImages: (images: State["images"]) => void
    setModalContent: (content: State["modal_content"]) => void
}

export const useEditorStore = create<State & Action>((set) => ({
    modal_opened: false,
    modal_content: null,
    images: [],
    setModalOpened: (opened) => set({ modal_opened: opened }),
    setModalContent: (content) => set({ modal_content: content }),
    setImages: (images) => set({ images: images }),
}))
