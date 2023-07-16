import { Global, MantineSize } from "@mantine/core"
import { shallow } from "zustand/shallow"

import { useEditorStore } from "./views/author/editor/editor-store"
import { useReaderStore } from "./views/student/reader-store"

export function MyGlobalStyles() {
    const [enable_gray_scale] = useReaderStore((state) => [state.enableGrayScale], shallow)
    const [enable_invert_color] = useReaderStore((state) => [state.enableInvertColor], shallow)
    const [gray_scale_percent] = useReaderStore((state) => [state.grayScalePercent], shallow)
    const [text_size] = useReaderStore((state) => [state.textSize], shallow)
    const [text_spacing] = useReaderStore((state) => [state.textSpacing], shallow)

    const [enable_contrast] = useReaderStore((state) => [state.enableContrast], shallow)
    const [contrast_percent] = useReaderStore((state) => [state.contrastPercent], shallow)

    const to_apply_filter = enable_gray_scale
        ? `grayscale(${gray_scale_percent}%)`
        : enable_invert_color
        ? "invert(100%)"
        : ""

    const contrast_filter = enable_contrast ? `contrast(${contrast_percent}%)` : ""

    const MARKS: { value: number; label: MantineSize; size: string; spacing: string }[] = [
        { value: 0, label: "xs", size: "0.875rem", spacing: "-0.05em" },
        { value: 25, label: "sm", size: "1rem", spacing: "-0.025em" },
        { value: 50, label: "md", size: "1.125rem", spacing: "0em" },
        { value: 75, label: "lg", size: "1.25rem", spacing: "0.025em" },
        { value: 100, label: "xl", size: "1.5rem", spacing: "0.1em" },
    ]

    const size = MARKS.find((mark) => mark.label === text_size)?.size || "1.5rem"
    const spacing = MARKS.find((mark) => mark.label === text_spacing)?.spacing || "0.4rem"

    return (
        <Global
            styles={{
                html: {
                    filter: to_apply_filter + " " + contrast_filter,
                },
                ".__checker_error": {
                    color: "red",
                    border: "1px solid red",
                    backgroundColor: "red",
                    boxShadow: "0 0 0 3px rgba(229, 62, 62, 0.5)",
                    filter: "brightness(0.9)",
                },
                "._editor-top_": {
                    fontSize: size,
                    letterSpacing: spacing,
                },
            }}
        />
    )
}
