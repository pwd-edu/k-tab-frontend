import axios from "axios"

export const getPresignedUrl = async (file_name: string) => {
    const response = await axios.get(`http://localhost:3820/presigned?file_name=${file_name}`)
    return response.data
}

export const getAIDescription = async (image_url: string): Promise<AiDescription> => {
    const response = await axios.post(`http://localhost:3820/imagedesc`, { image_url })
    return response.data
}
