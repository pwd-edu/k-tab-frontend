import { FileWithPath } from "@mantine/dropzone"
import { create } from "zustand"

type State = {
    modal_opened: boolean
    images: FileWithPath[]
}

type Action = {
    setModalOpened: (opened: State["modal_opened"]) => void
    setImages: (images: State["images"]) => void
}

export const useEditorStore = create<State & Action>((set) => ({
    modal_opened: false,
    images: [],
    setModalOpened: (opened) => set({ modal_opened: opened }),
    setImages: (images) => set({ images: images }),
}))
