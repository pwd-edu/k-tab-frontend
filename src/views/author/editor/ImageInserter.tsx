import { StreamLanguage } from "@codemirror/language"
import { stex } from "@codemirror/legacy-modes/mode/stex"
import { AiClient, RESOURCE_URL, S3Client } from "@fetch/index"
import { ImageDescription, ImageInserterProps, ImagePreviewProps } from "@fetch/types"
import { Button, Image, Stack, Text, Textarea } from "@mantine/core"
import { Box, clsx } from "@mantine/core"
import { FileWithPath } from "@mantine/dropzone"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import CodeMirror from "@uiw/react-codemirror"
import axios from "axios"
import { MathJax } from "better-react-mathjax"
import { useState } from "react"
import { toast } from "react-toastify"
import { shallow } from "zustand/shallow"

import { InsertImagePlaceHolder } from "./ImagePlaceHolder"
import { useEditorStore } from "./editor-store"
import { LATEX_SAMPLES } from "./math-test"

interface MathInsertProps {
    defaultValue: string
    onMathChange: (latex: string) => void
}

const MathInsert = ({ defaultValue, onMathChange }: MathInsertProps) => {
    const [latex, setLatex] = useState(defaultValue)
    return (
        <Box className={clsx("rounded-md border-2 border-gray-200 p-2")}>
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
                    onMathChange(value)
                }}
            />
            <MathJax hideUntilTypeset={"first"}>{latex}</MathJax>
        </Box>
    )
}

const s3_client = S3Client()
const ai_client = AiClient()

interface ImageDescriptionBodyProps extends ImageDescription {
    onDescriptionChange: (description: ImageDescription) => void
}

function ImageDescriptionBody({ type, content, onDescriptionChange }: ImageDescriptionBodyProps) {
    return (
        <>
            {type === "MATH" && (
                <MathInsert
                    defaultValue={content}
                    onMathChange={(latex) => {
                        onDescriptionChange({ type, content: latex })
                    }}
                />
            )}
            {type !== "MATH" && (
                <Textarea
                    defaultValue={content}
                    onChange={(e) => {
                        onDescriptionChange({ type, content: e.currentTarget.value })
                    }}
                ></Textarea>
            )}
        </>
    )
}

function ImagePreview({ image: url }: ImagePreviewProps) {
    return <Image src={RESOURCE_URL(url)} alt={"an uploaded image"} />
}

export function ImageInserter({
    onImageInserted,
    onDescriptionChange,
    onAddClick,
}: ImageInserterProps) {
    const [chapter_id] = useEditorStore((state) => [state.chapter_id], shallow)
    const [images, setImages] = useEditorStore((state) => [state.images, state.setImages], shallow)
    const [inserted, setInserted] = useState(false)
    const [description, setDescription] = useState<ImageDescription | null>(null)

    // TODO: use query mutations & cache
    const handleImageInserted = async (files: FileWithPath[]) => {
        try {
            const { imageUrl: image_url, imagePath } = await s3_client.getImagePresignedUpload(
                chapter_id
            )
            const image = files[0]
            await uploadS3(image, image_url)

            const img_description = await ai_client.getImageDescription(imagePath)
            setDescription(img_description)
            if (onDescriptionChange) {
                onDescriptionChange(img_description)
            }

            setInserted(true)
            setImages([imagePath])
        } catch (e) {
            console.log(e)
        }

        // TODO: show loading indicator
    }

    const uploadS3 = async (file: FileWithPath, presigned_url: string) => {
        const upload_response = await axios.put(presigned_url, file)
        if (upload_response.status !== 200) {
            toast.error("Failed to save image", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        toast.success("Image saved", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    const handleAddImage = () => {
        if (!description) return
        onImageInserted(images, description)
        onAddClick && onAddClick()
    }

    return (
        <Stack>
            {inserted && <ImagePreview image={images.at(-1) || ""} />}
            {description && (
                <ImageDescriptionBody
                    type={description.type}
                    content={description.content}
                    onDescriptionChange={setDescription}
                />
            )}
            {!inserted && <InsertImagePlaceHolder onUpload={handleImageInserted} />}
            {inserted && <Button onClick={handleAddImage}>Add</Button>}
        </Stack>
    )
}
