import { Button, Image, Stack, Text, Textarea } from "@mantine/core"
import { useState } from "react"
import { InsertImagePlaceHolder } from "./ImagePlaceHolder"
import { useEditorStore } from "./editor-store"

import { FileWithPath } from "@mantine/dropzone"

import axios from "axios"
import { AiClient, S3Client } from "../fetch"
import { ImageDescription, ImageInserterProps, ImagePreviewProps } from "./types"

const s3_client = S3Client()
const ai_client = AiClient()

function ImageDescriptionBody({ type, content }: ImageDescription) {
    return (
        <>
            {type !== "MATH" && <Textarea defaultValue={content}></Textarea>}
            {type === "MATH" && <Text>{content}</Text>}
        </>
    )
}

function ImagePreview({ image }: ImagePreviewProps) {
    const url = URL.createObjectURL(image)
    return <Image src={url} alt={image.name} />
}

export function ImageInserter({
    onImageInserted,
    onDescriptionChange,
    onAddClick,
}: ImageInserterProps) {
    const chapter_id = "118e86ed-47d9-45bc-aa50-91a02c6d9171" // TODO: get chapter id from props / state
    const [images, setImages] = useEditorStore((state) => [state.images, state.setImages])
    const [inserted, setInserted] = useState(false)
    const [description, setDescription] = useState<ImageDescription | null>(null)

    // TODO: use query mutations & cache
    const handleImageInserted = async (files: FileWithPath[]) => {
        setInserted(true)
        setImages(files)
        const image = files[0]

        try {
            const { imageUrl: image_url } = await s3_client.getImagePresignedUpload(chapter_id)
            await uploadS3(image, image_url)

            const img_description = await ai_client.getImageDescription(image_url)
            setDescription(img_description)
            if (onDescriptionChange) {
                onDescriptionChange(img_description)
            }
        } catch (e) {
            console.log(e)
        }

        // TODO: show loading indicator
    }

    const uploadS3 = async (file: FileWithPath, presigned_url: string) => {
        const form = new FormData()
        form.append("file", file)
        const upload_response = await axios.put(presigned_url, form)
    }

    const handleAddImage = () => {
        if (!description) return
        onImageInserted(images, description)
        onAddClick && onAddClick()
    }

    return (
        <Stack>
            {inserted && <ImagePreview image={images.at(-1) || new File([], "")} />}
            {description && (
                <ImageDescriptionBody type={description.type} content={description.content} />
            )}
            {!inserted && <InsertImagePlaceHolder onUpload={handleImageInserted} />}
            {inserted && <Button onClick={handleAddImage}>Add</Button>}
        </Stack>
    )
}
