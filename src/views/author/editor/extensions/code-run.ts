import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

import { CodeRun } from "../CodeRun"

export interface CodeRunOptions {
    initial_count: number
}

export interface NewCodeRunAttrs {
    id: string
    language: string
    code?: string
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        code_run: {
            /**
             * Add a new mcq interactive block
             */
            setCodeRun: (attributes: NewCodeRunAttrs) => ReturnType
        }
    }
}

export const CodeRunExtension = Node.create<CodeRunOptions>({
    name: "code-run",
    group: "block",
    content: "block*",
    draggable: true,
    allowGapCursor: true,
    isolating: true,
    atom: true,

    addCommands() {
        return {
            setCodeRun:
                (attributes) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: attributes,
                    })
                },
        }
    },

    addAttributes() {
        return {
            id: {
                default: "",
                rendered: false,
            },
            language: {
                default: "",
                rendered: false,
            },
            code: {
                default: "",
                rendered: false,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: "code-run",
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ["code-run", mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeRun)
    },
})
