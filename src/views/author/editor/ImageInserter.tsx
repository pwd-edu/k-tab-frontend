import { AiClient, RESOURCE_URL, S3Client } from "@fetch/index"
import { ImageDescription, ImageInserterProps, ImagePreviewProps } from "@fetch/types"
import { Button, Image, Stack, Text, Textarea } from "@mantine/core"
import { FileWithPath } from "@mantine/dropzone"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { shallow } from "zustand/shallow"

import { InsertImagePlaceHolder } from "./ImagePlaceHolder"
import { useEditorStore } from "./editor-store"

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

            const img_description = await ai_client.getImageDescription(image_url)
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
                <ImageDescriptionBody type={description.type} content={description.content} />
            )}
            {!inserted && <InsertImagePlaceHolder onUpload={handleImageInserted} />}
            {inserted && <Button onClick={handleAddImage}>Add</Button>}
        </Stack>
    )
}
