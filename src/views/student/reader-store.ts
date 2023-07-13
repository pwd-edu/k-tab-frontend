import { DEFAULT_FONT } from "@constants"
import { create } from "zustand"

type ReaderState = {
    enableLineFocus: boolean
    lineFocusHeight: number
    fontFamlily: string
}

type ReaderAction = {
    setEnableLineFocus: (enable: ReaderState["enableLineFocus"]) => void
    setLineFocusHeight: (height: ReaderState["lineFocusHeight"]) => void
    setFontFamily: (font: ReaderState["fontFamlily"]) => void
}

export const useReaderStore = create<ReaderState & ReaderAction>((set) => ({
    enableLineFocus: true,
    lineFocusHeight: 10,
    fontFamlily: DEFAULT_FONT,
    setEnableLineFocus: (enable) => set({ enableLineFocus: enable }),
    setLineFocusHeight: (height) => set({ lineFocusHeight: height }),
    setFontFamily: (font) => set({ fontFamlily: font }),
}))
