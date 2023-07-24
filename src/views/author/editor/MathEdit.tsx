import { StreamLanguage } from "@codemirror/language"
import { stex } from "@codemirror/legacy-modes/mode/stex"
import { Box, clsx } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import CodeMirror from "@uiw/react-codemirror"
import { MathJax } from "better-react-mathjax"
import { useMemo, useState } from "react"
import { memo } from "react"

import { LATEX_SAMPLES } from "./math-test"

export const MathEdit = (props: NodeViewProps) => {
    const editable = props.editor.isEditable
    const [latex, setLatex] = useState(props.node.attrs.latex)
    const [debounced_latex] = useDebouncedValue(latex, 300)
    return (
        <NodeViewWrapper contentEditable={false} className="flex justify-center">
            <Box
                className={clsx(
                    editable && "w-3/4 max-w-full rounded-md border-2 border-gray-200 p-2"
                )}
            >
                {editable && (
                    <CodeMirror
                        value={latex}
                        minHeight={"100px"}
                        maxHeight={"500px"}
                        extensions={[StreamLanguage.define(stex)]}
                        className={clsx("border border-gray-200")}
                        basicSetup={{
                            lineNumbers: false,
                            foldGutter: false,
                        }}
                        onChange={(value) => {
                            setLatex(value)
                        }}
                        onBlur={() => {
                            props.updateAttributes({
                                latex: latex,
                            })
                        }}
                    />
                )}
                <MathRender latex={debounced_latex} />
            </Box>
        </NodeViewWrapper>
    )
}

const MathRender = memo(function MathRender({ latex }: { latex: any }) {
    return <MathJax hideUntilTypeset={"first"}>{latex}</MathJax>
})
