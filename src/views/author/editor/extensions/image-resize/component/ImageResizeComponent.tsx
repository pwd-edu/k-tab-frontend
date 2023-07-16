/* eslint-disable jsx-a11y/alt-text */
import { Input, Stack, Text, Textarea } from "@mantine/core"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { Enable, Resizable } from "re-resizable"
import { ChangeEvent } from "react"

function ImageResizer(props: NodeViewProps) {
    const align = props.node.attrs.align || "justify-center"

    const enable: Enable | undefined = props.editor.isEditable
        ? undefined
        : {
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
          }

    const updateImgAttrs = (e: MouseEvent | TouchEvent) => {
        const image = e.target as HTMLElement
        if (image.parentElement === null) return
        props.updateAttributes({
            width: image.parentElement.clientWidth,
            height: image.parentElement.clientHeight,
        })
    }

    return (
        <NodeViewWrapper className={`flex ${align}`}>
            <Stack className="mb-1 gap-0">
                <Resizable
                    lockAspectRatio
                    className=""
                    onResizeStop={updateImgAttrs}
                    defaultSize={{ width: props.node.attrs.width, height: props.node.attrs.height }}
                    enable={enable}
                >
                    <img {...props.node.attrs} className="m-0 w-full" />
                </Resizable>
                {props.editor.isEditable && (
                    <>
                        <Text c="dimmed" size="sm" className="m-0 p-0">
                            Alternative Text
                        </Text>
                        <Textarea
                            rows={5}
                            value={props.node.attrs.alt}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                props.updateAttributes({ alt: e.target.value })
                            }}
                        />
                    </>
                )}
            </Stack>
        </NodeViewWrapper>
    )
}

export default ImageResizer
