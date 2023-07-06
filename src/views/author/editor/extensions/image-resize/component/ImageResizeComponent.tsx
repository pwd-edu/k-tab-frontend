/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import * as React from "react"

function ImageResizer(props: NodeViewProps) {
    const handler = (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
        const parent = (mouseDownEvent.target as HTMLElement).closest(".image-resizer")
        const image = parent?.querySelector("img.postimage") ?? null
        if (image === null) return

        const start_size = { x: image.clientWidth, y: image.clientHeight }
        const start_position = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY }

        function onMouseMove(mouseMoveEvent: MouseEvent) {
            props.updateAttributes({
                width: start_size.x - start_position.x + mouseMoveEvent.pageX,
                height: start_size.y - start_position.y + mouseMoveEvent.pageY,
            })
        }

        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove)
        }

        document.body.addEventListener("mousemove", onMouseMove)
        document.body.addEventListener("mouseup", onMouseUp, { once: true })
    }

    return (
        <NodeViewWrapper className="image-resizer">
            {props.extension.options.useFigure ? (
                <figure>
                    <img {...props.node.attrs} className="postimage" />
                </figure>
            ) : (
                <img {...props.node.attrs} className="postimage" />
            )}
            <div className="resize-trigger" onMouseDown={handler}>
                {props.extension.options.resizeIcon}
            </div>
        </NodeViewWrapper>
    )
}

export default ImageResizer
