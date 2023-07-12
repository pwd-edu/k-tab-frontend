import { Box, createStyles } from "@mantine/core"
import { NodeViewProps } from "@tiptap/core"
import { NodeViewWrapper } from "@tiptap/react"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"

import { useReaderStore } from "../../student/reader-store"

/*
    +(1)---------------------(8)+
    |///////////////////////////|
    |///////////////////////////|
    |///////////////////////////| <-- semi-transparent area
    |///////////////////////////|
    |///////////////////////////|
    +(2)---------------------(3)+
                                | <-- line focus
    +(5)---------------------(4)+
    |///////////////////////////|
    |///////////////////////////|
    |///////////////////////////| <-- semi-transparent area
    |///////////////////////////|
    |///////////////////////////|
    +(6)---------------------(7)+

 */

const useStyles = createStyles((theme, params: any) => {
    const line_postion = params.lineFocusPosition || 0
    const line_focus_height = params.lineFocusHeight || 0
    return {
        focus_layer: {
            paddingTop: theme.spacing.xl,
            clipPath: `
                polygon(
                     /*1*/ 0% 0%,
                     /*2*/ 0% ${line_postion}%,
                     /*3*/ 100% ${line_postion}%,
                     /*4*/ 100% calc(${line_postion}% + ${line_focus_height}%),
                     /*5*/ 0% calc(${line_postion}% + ${line_focus_height}%),
                     /*6*/ 0% 100%,
                     /*7*/ 100% 100%,
                     /*8*/ 100% 0%
                );
            `,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
        },
    }
})

const buildStyles = (params?: any) => {
    const { enableLineFocus } = params
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        focus_layer: cx([enableLineFocus && classes.focus_layer, "aria-hidden"]),
    }
    return { styles, classes, cx, theme }
}

export const LineFoucsLayer = (props: NodeViewProps) => {
    const [enableLineFocus] = useReaderStore((state) => [state.enableLineFocus], shallow)
    const [lineFocusHeight] = useReaderStore((state) => [state.lineFocusHeight], shallow)
    const [lineFocusPosition, setLineFocusPosition] = useState(0)
    const { styles } = buildStyles({ enableLineFocus, lineFocusHeight, lineFocusPosition })

    const content_element = props.editor?.options.element

    const updateLineFocus = (e: Event) => {
        const { top, height } = content_element.getBoundingClientRect()
        if (e instanceof MouseEvent) {
            const mouse_y = e.clientY - top
            let line_position = Math.min(
                100 - lineFocusHeight / 2,
                Math.max(0 + lineFocusHeight / 2, (mouse_y / height) * 100)
            )
            line_position -= lineFocusHeight / 2
            setLineFocusPosition(line_position)
        }
    }

    useEffect(() => {
        if (enableLineFocus) {
            content_element.addEventListener("mousemove", updateLineFocus)
        }
        return () => {
            content_element.removeEventListener("mousemove", updateLineFocus)
        }
    }, [enableLineFocus, lineFocusHeight])

    return (
        <NodeViewWrapper>
            <Box className={styles.focus_layer} />
        </NodeViewWrapper>
    )
}
