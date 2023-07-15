import { Global } from "@mantine/core"
import { shallow } from "zustand/shallow"

import { useEditorStore } from "./views/author/editor/editor-store"
import { useReaderStore } from "./views/student/reader-store"

export function MyGlobalStyles() {
    const [enable_gray_scale] = useReaderStore((state) => [state.enableGrayScale], shallow)
    const [enable_invert_color] = useReaderStore((state) => [state.enableInvertColor], shallow)
    const [gray_scale_percent] = useReaderStore((state) => [state.grayScalePercent], shallow)

    const [enable_contrast] = useReaderStore((state) => [state.enableContrast], shallow)
    const [contrast_percent] = useReaderStore((state) => [state.contrastPercent], shallow)

    const [checker_opened] = useEditorStore((state) => [state.checker_opened], shallow)

    const to_apply_filter = enable_gray_scale
        ? `grayscale(${gray_scale_percent}%)`
        : enable_invert_color
        ? "invert(100%)"
        : ""

    const contrast_filter = enable_contrast ? `contrast(${contrast_percent}%)` : ""

    return (
        <Global
            styles={{
                html: {
                    filter: to_apply_filter + " " + contrast_filter,
                },
                "[__checker_error]": {
                    border: "1px solid red",
                    backgroundColor: "red",
                    boxShadow: "0 0 0 3px rgba(229, 62, 62, 0.5)",
                    filter: "brightness(0.9)",
                },
            }}
        />
    )
}
