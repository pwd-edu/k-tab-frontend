import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

import { McqBuild } from "./McqBuild"

export interface McqOptions {
    initial_count: number
}

export interface NewMcqAttrs {
    id: string
    question?: string
    options?: string[]
    answer?: string
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mcq: {
            /**
             * Add a new mcq interactive block
             */
            setMcq: (attributes: NewMcqAttrs) => ReturnType
        }
    }
}

export const McqExtension = Node.create<McqOptions>({
    name: "mcq-interactive",
    group: "block",
    draggable: true,
    atom: true,

    addCommands() {
        return {
            setMcq:
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
            question: {
                default: "",
                rendered: false,
            },
            options: {
                default: [],
                rendered: false,
            },
            answer: {
                default: "",
                rendered: false,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: "mcq-intreactive",
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ["mcq-intreactive", mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(McqBuild)
    },
})
