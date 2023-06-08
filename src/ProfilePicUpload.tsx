import { useState, useRef } from "react"
import { FileButton, Button, Group, Text, ActionIcon } from "@mantine/core"

function UploadPictureButtons() {
    const [file, setFile] = useState<File | null>(null)
    const [fileBase64, setFileBase64] = useState("")
    const resetRef = useRef<() => void>(null)

    const clearFile = () => {
        setFile(null)
        resetRef.current?.()
    }

    const photo = {
        pictureFile: file,
        pictureBase64: fileBase64,
    }

    const handleUploadPicture = (e: { preventDefault: () => void }) => {
        let document = ""
        const reader = new FileReader()
        const blobFile = file as Blob
        reader.readAsDataURL(blobFile)
        reader.onload = function () {
            document = reader.result as string
            const base64String = document.replace("data:", "").replace(/^.+,/, "") as string
            console.log("onload " + base64String)
            setFileBase64(base64String)
            console.log("onload base64State " + fileBase64)
        }
        reader.onerror = function (error) {
            console.log("Error: ", error)
            return "error"
        }
        console.log("doc outside onload" + document)
        console.log("base64 in fn upload" + fileBase64)
        console.log(photo)
    }

    return (
        <>
            <Group position="center">
                <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                    {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                <Button disabled={!file} color="red" onClick={clearFile} size="xs">
                    Reset
                </Button>
                <Button disabled={!file} color="green" onClick={handleUploadPicture} size="xs">
                    Verify
                </Button>
            </Group>

            {file && (
                <Text size="sm" align="center" mt="sm">
                    Picked file: {file.name}
                </Text>
            )}
        </>
    )
}
export default UploadPictureButtons
