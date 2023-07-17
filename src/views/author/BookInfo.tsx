import { getAuthHeader } from "@auth/helpers"
import { BookClient, axios_instance } from "@fetch/index"
import { Book } from "@fetch/types"
import {
    Anchor,
    Button,
    Divider,
    FileButton,
    Group,
    Paper,
    PaperProps,
    Stack,
    Text,
    TextInput,
    Textarea,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { upperFirst, useToggle } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { formToJSON } from "axios"
import { useRef, useState } from "react"
import { number } from "zod"

import { PORT } from "../../constants"

export function BookInfoForm() {
    const [type, toggle] = useToggle(["edit", "view"])
    const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>()
    const resetRef = useRef<() => void>(null)

    const baseURL = `http://localhost:${PORT}/book`

    const form = useForm({
        initialValues: {
            title: "",
            price: 0,
            bookAbstract: "",
            // bookCoverPhotoAsBinaryString:"",
        },

        validate: {
            // price: (val) => (val <= 500 ? null : "Invalid price"),
            bookAbstract: (val) =>
                val.length >= 100 ? "Abstract should be at least 100 characters" : null,
        },
    })

    const handleUploadImage = async () => {
        let document = ""
        const reader = new FileReader()
        const blobFile = coverPhotoFile as Blob
        reader.readAsDataURL(blobFile)
        reader.onload = function () {
            document = reader.result as string
            const base64String = document.replace("data:", "").replace(/^.+,/, "") as string
            form.setFieldValue("bookCoverPhotoAsBinaryString", base64String)
            console.log("onload base64String " + base64String)
        }
        reader.onerror = function (error) {
            console.log("Error: ", error)
            return "error"
        }
    }

    const clearFile = () => {
        setCoverPhotoFile(null)
        resetRef.current?.()
    }

    const handleSubmit = async () => {
        const auth_header = await getAuthHeader()

        // fetch(baseURL, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: auth_header,
        //         "Access-Control-Allow-Credentials": "true",
        //         "Access-Control-Allow-Origin": "http://localhost:8080",
        //     },

        //     body: JSON.stringify(form.values),
        // }).then(() => {
        //     console.log(JSON.stringify(form.values))
        //     console.log("added new book")
        // })

        const config = {
            headers: {
                Authorization: auth_header,
            },
        }

        const resp = await axios.post(baseURL, JSON.stringify(form.values), config)
    }

    return (
        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" weight={500}>
                Welcome to Your Library, {type} your {form.values.title} book
            </Text>

            {type == "edit" && (
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <br></br>
                        <div style={{ margin: "auto" }}>
                            <Group position="center">
                                <FileButton
                                    resetRef={resetRef}
                                    onChange={setCoverPhotoFile}
                                    accept="image/png,image/jpeg"
                                >
                                    {(props) => <Button {...props}>Upload image</Button>}
                                </FileButton>
                                <Button
                                    disabled={!coverPhotoFile}
                                    color="red"
                                    onClick={clearFile}
                                    size="xs"
                                >
                                    Reset
                                </Button>
                                <Button
                                    disabled={!coverPhotoFile}
                                    color="green"
                                    onClick={handleUploadImage}
                                    size="xs"
                                >
                                    Verify
                                </Button>
                            </Group>
                        </div>

                        <Divider my="lg" />

                        <TextInput
                            required
                            label="Book Title"
                            placeholder="Title"
                            value={form.values.title}
                            onChange={(event) =>
                                form.setFieldValue("title", event.currentTarget.value)
                            }
                            radius="md"
                        />

                        <Textarea
                            required
                            label="bookAbstract"
                            placeholder="Write your book abstract here.."
                            value={form.values.bookAbstract}
                            onChange={(event) =>
                                form.setFieldValue("bookAbstract", event.currentTarget.value)
                            }
                            error={
                                form.errors.bookAbstract &&
                                "Abstract should be at least 100 characters"
                            }
                            radius="md"
                            minRows={6}
                        />

                        <TextInput
                            required
                            label="Price"
                            placeholder="Price in $"
                            // value={form.values.price}
                            onChange={(event) =>
                                form.setFieldValue("price", parseInt(event.currentTarget.value))
                            }
                            error={form.errors.price && "Invalid price"}
                            radius="md"
                        />
                    </Stack>
                </form>
            )}

            {/* {type == "view" && (
            //    student book info
            )} */}

            <Group position="apart" mt="xl">
                <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                >
                    {type === "edit" ? "view the book info" : "edit the book info"}
                </Anchor>
                {type === "edit" && (
                    <Button type="submit" radius="xl" onClick={() => handleSubmit()}>
                        {upperFirst(type)}
                    </Button>
                )}
            </Group>
        </Paper>
    )
}
