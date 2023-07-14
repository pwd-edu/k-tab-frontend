import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

import { MathEdit } from "./MathEdit"

export interface MathEditOptions {
    initial_count: number
}

export interface NewMathEditAttrs {
    id: string
    latex: string
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        math_edit: {
            /**
             * Add a new math edit node
             */
            setMathEdit: (attributes: NewMathEditAttrs) => ReturnType
        }
    }
}

export const MathExtension = Node.create<MathEditOptions>({
    name: "math-edit",
    group: "block",
    draggable: false,
    content: "inline*",

    addCommands() {
        return {
            setMathEdit:
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
            },
            latex: {
                default: "",
            },
        }
    },
    parseHTML() {
        return [
            {
                tag: "math-edit",
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ["math-edit", mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(MathEdit)
    },
})
