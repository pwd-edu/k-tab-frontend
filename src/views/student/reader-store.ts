import { create } from "zustand"

type ReaderState = {
    enableLineFocus: boolean
    lineFocusHeight: number
}

type ReaderAction = {
    setEnableLineFocus: (enable: ReaderState["enableLineFocus"]) => void
    setLineFocusHeight: (height: ReaderState["lineFocusHeight"]) => void
}

export const useReaderStore = create<ReaderState & ReaderAction>((set) => ({
    enableLineFocus: true,
    lineFocusHeight: 10,
    setEnableLineFocus: (enable) => set({ enableLineFocus: enable }),
    setLineFocusHeight: (height) => set({ lineFocusHeight: height }),
}))
