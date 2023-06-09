import { Button, Image, Stack, Text, Textarea } from "@mantine/core"
import { useEffect, useState } from "react"
import { InsertImagePlaceHolder } from "./ImagePlaceHolder"
import { useEditorStore } from "./editor-store"

import { FileWithPath } from "@mantine/dropzone"

import axios from "axios"

interface ImageInserterProps {
    onImageInserted: (files: FileWithPath[]) => void
}

interface ImagePreviewProps {
    image: FileWithPath
}

interface ImageDescriptionProps {
    type: "math" | "scene" | "chart"
    content: string
}

type AiDescription = ImageDescriptionProps

function ImageDescription({ type, content }: ImageDescriptionProps) {
    return (
        <>
            {type === "scene" && <Textarea defaultValue={content}></Textarea>}
            {type === "math" && <Text>{content}</Text>}
        </>
    )
}

function ImagePreview({ image }: ImagePreviewProps) {
    const url = URL.createObjectURL(image)
    return <Image src={url} alt={image.name} />
}

export function ImageInserter({ onImageInserted }: ImageInserterProps) {
    const [images, setImages] = useEditorStore((state) => [state.images, state.setImages])
    const [inserted, setInserted] = useState(false)
    const [description, setDescription] = useState<AiDescription | null>(null)

    const handleImageInserted = async (files: FileWithPath[]) => {
        setInserted(true)
        setImages(files)
        const image = files[0]

        try {
            const presigned_url = await getPresignedUrl(image.name)
            await uploadS3(image, presigned_url)

            const image_url = `${presigned_url.url}${presigned_url.fields.key}`
            const img_description = await getAIDescription(image_url)
            setDescription(img_description)
        } catch (e) {
            console.log(e)
        }

        // show loading indicator
    }

    const getPresignedUrl = async (file_name: string) => {
        const response = await axios.get(`http://localhost:3820/presigned?file_name=${file_name}`)
        return response.data
    }

    const uploadS3 = async (file: FileWithPath, presigned_url: Record<string, any>) => {
        const form = new FormData()
        Object.keys(presigned_url.fields as []).forEach((key) =>
            form.append(key, presigned_url.fields[key])
        )
        form.append("file", file)
        const upload_response = await axios.post(presigned_url.url, form)
        console.log(upload_response)
    }

    const getAIDescription = async (image_url: string): Promise<AiDescription> => {
        const response = await axios.post(`http://localhost:3820/imagedesc`, { image_url })
        return response.data
    }

    useEffect(() => {
        console.log(description)
    }, [description])

    return (
        <Stack>
            {inserted && <ImagePreview image={images.at(-1) || new File([], "")} />}
            {description && (
                <ImageDescription type={description.type} content={description.content} />
            )}
            {!inserted && <InsertImagePlaceHolder onUpload={handleImageInserted} />}
            {inserted && <Button onClick={() => onImageInserted(images)}>Add</Button>}
        </Stack>
    )
}
