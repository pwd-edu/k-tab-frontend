import { Group, Text, useMantineTheme } from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons"
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import axios from "axios"
import { useEditorStore } from "./stores"

export function InsertImagePlaceHolder(props: Partial<DropzoneProps>) {
    const [images, setImages] = useEditorStore((state) => [state.images, state.setImages])
    const theme = useMantineTheme()

    const handleUpload = (files: FileWithPath[]) => {
        //const formData = new FormData()
        //files.forEach((file) => formData.append("file", file))
        //axios.post("http://localhost:8000/upload/s3", formData)
        setImages([...images, files[0]])
    }

    const handleUploadS3 = async (files: FileWithPath[]) => {
        const file_name = files[0].name
        const response = await axios.get(`http://localhost:8000/presigned?file_name=${file_name}`)
        const presigned_url = response.data

        console.log("presigned_url", presigned_url)

        const form = new FormData()
        Object.keys(presigned_url.fields).forEach((key) =>
            form.append(key, presigned_url.fields[key])
        )
        form.append("file", files[0])

        const upload_response = await axios.post(presigned_url.url, form)
        console.log(upload_response)
    }

    return (
        <Dropzone
            onDrop={handleUpload}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
        >
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
                <Dropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={
                            theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
                        }
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" className="text-gray-500" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    )
}
