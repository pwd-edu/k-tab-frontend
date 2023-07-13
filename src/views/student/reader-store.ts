import { create } from "zustand"

type ReaderState = {
    enableLineFocus: boolean
    lineFocusHeight: number
    fontFamlily: string
    enableGrayScale: boolean
    enableInvertColor: boolean
    grayScalePercent: number
    enableContrast: boolean
    contrastPercent: number
    wideView: boolean
}

type ReaderAction = {
    setEnableLineFocus: (enable: ReaderState["enableLineFocus"]) => void
    setLineFocusHeight: (height: ReaderState["lineFocusHeight"]) => void
    setFontFamily: (font: ReaderState["fontFamlily"]) => void
    setEnableGrayScale: (enable: ReaderState["enableGrayScale"]) => void
    setGrayScalePercent: (grayScale: ReaderState["grayScalePercent"]) => void
    setEnableInvertColor: (enable: ReaderState["enableInvertColor"]) => void
    setEnableContrast: (enable: ReaderState["enableContrast"]) => void
    setContrastPercent: (contrast: ReaderState["contrastPercent"]) => void
    setWideView: (wideView: ReaderState["wideView"]) => void
}

export const useReaderStore = create<ReaderState & ReaderAction>((set) => ({
    grayScalePercent: 0,
    enableContrast: false,
    contrastPercent: 0,
    enableGrayScale: false,
    enableLineFocus: false,
    lineFocusHeight: 5,
    enableInvertColor: false,
    fontFamlily: "Roboto",
    wideView: false,
    setEnableLineFocus: (enable) => set({ enableLineFocus: enable }),
    setLineFocusHeight: (height) => set({ lineFocusHeight: height }),
    setFontFamily: (font) => set({ fontFamlily: font }),
    setEnableGrayScale: (enable) => set({ enableGrayScale: enable }),
    setGrayScalePercent: (grayScale) => set({ grayScalePercent: grayScale }),
    setEnableInvertColor: (enable) => set({ enableInvertColor: enable }),
    setEnableContrast: (enable) => set({ enableContrast: enable }),
    setContrastPercent: (contrast) => set({ contrastPercent: contrast }),
    setWideView: (wideView) => set({ wideView: wideView }),
}))
