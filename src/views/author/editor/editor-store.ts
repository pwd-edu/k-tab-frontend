import { create } from "zustand"

type State = {
    modal_opened: boolean
    images: string[]
    modal_content: React.ReactNode | null
    chapter_id: string
}

type Action = {
    setModalOpened: (opened: State["modal_opened"]) => void
    setImages: (images: State["images"]) => void
    setModalContent: (content: State["modal_content"]) => void
    setChapterId: (chapter_id: State["chapter_id"]) => void
}

export const useEditorStore = create<State & Action>((set) => ({
    modal_opened: false,
    modal_content: null,
    images: [],
    chapter_id: "",
    setModalOpened: (opened) => set({ modal_opened: opened }),
    setModalContent: (content) => set({ modal_content: content }),
    setImages: (images) => set({ images: images }),
    setChapterId: (chapter_id) => set({ chapter_id: chapter_id }),
}))
