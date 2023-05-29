import { mergeAttributes, Node } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { McqBuild } from "./McqBuild"

export interface McqOptions {
    initial_count: number
}

export const McqExtension = Node.create<McqOptions>({
    name: "mcq-interactive",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            question: {
                default: "",
                rendered: true,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: "node-view",
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ["node-view", mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(McqBuild)
    },
})
