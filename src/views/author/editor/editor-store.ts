import { DEFAULT_FONT } from "@constants"
import _ from "lodash"
import { create } from "zustand"

type State = {
    current_family: string
    current_color: string
    modal_opened: boolean
    checker_opened: boolean
    images: string[]
    modal_content: React.ReactNode | null
    chapter_id: string
}

type Action = {
    setModalOpened: (opened: State["modal_opened"]) => void
    setImages: (images: State["images"]) => void
    setModalContent: (content: State["modal_content"]) => void
    setChapterId: (chapter_id: State["chapter_id"]) => void
    setCurrentFamily: (family: State["current_family"]) => void
    setCurrentColor: (color: State["current_color"]) => void
    setCheckerOpened: (opened: State["checker_opened"]) => void
}

export const useEditorStore = create<State & Action>((set) => ({
    modal_opened: false,
    modal_content: null,
    images: [],
    chapter_id: "",
    current_family: DEFAULT_FONT,
    current_color: "#111827",
    checker_opened: false,
    setModalOpened: (opened) => set({ modal_opened: opened }),
    setModalContent: (content) => set({ modal_content: content }),
    setImages: (images) => set({ images: images }),
    setChapterId: (chapter_id) => set({ chapter_id: chapter_id }),
    setCurrentFamily: (family) =>
        set({ current_family: _.isEmpty(family) ? DEFAULT_FONT : family }),
    setCurrentColor: (color) => set({ current_color: color }),
    setCheckerOpened: (opened) => set({ checker_opened: opened }),
}))
