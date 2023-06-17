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
