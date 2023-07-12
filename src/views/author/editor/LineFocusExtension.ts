import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

import { LineFoucsLayer } from "./LineFoucsLayer"

export interface LineFocusOptions {
    HTMLAttributes: Record<string, any>
}

export interface LineFocusAttrs {
    id: string
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        line_focus: {
            /**
             * Add line focus layer
             */
            setLineFocus: (attributes: LineFocusAttrs) => ReturnType
        }
    }
}

export const LineFocusExtension = Node.create<LineFocusOptions>({
    name: "line-focus",
    group: "block",
    draggable: false,
    atom: true,

    addCommands() {
        return {
            setLineFocus:
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
        }
    },

    parseHTML() {
        return []
    },

    renderHTML({ HTMLAttributes }) {
        return ["line-focus", mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(LineFoucsLayer)
    },
})
