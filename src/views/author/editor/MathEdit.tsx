import { StreamLanguage } from "@codemirror/language"
import { stex } from "@codemirror/legacy-modes/mode/stex"
import { Box, clsx } from "@mantine/core"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import CodeMirror from "@uiw/react-codemirror"
import { MathJax } from "better-react-mathjax"
import { useState } from "react"

import { LATEX_SAMPLES } from "./math-test"

export const MathEdit = (props: NodeViewProps) => {
    const [latex, setLatex] = useState(props.node.attrs.latex || LATEX_SAMPLES[0])
    return (
        <NodeViewWrapper contentEditable={false}>
            <Box className="rounded-md border-2 border-gray-200 p-2">
                <CodeMirror
                    value={latex}
                    height="100px"
                    extensions={[StreamLanguage.define(stex)]}
                    className={clsx("border border-gray-200")}
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                    }}
                    onChange={(value) => {
                        setLatex(value)
                        props.updateAttributes({
                            latex: value,
                        })
                    }}
                />
                <MathJax hideUntilTypeset={"first"}>{latex}</MathJax>
            </Box>
        </NodeViewWrapper>
    )
}
