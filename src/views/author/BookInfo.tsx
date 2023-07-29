import { ErrorPage } from "@components/shared"
import { BookClient } from "@fetch/index"
import { CreateBookRequest } from "@fetch/types"
import {
    ActionIcon,
    Anchor,
    Button,
    Dialog,
    FileInput,
    Group,
    Menu,
    MultiSelect,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    createStyles,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useToggle } from "@mantine/hooks"
import { IconBookmark } from "@tabler/icons"
import { IconChevronDown, IconFilePencil, IconTrash } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { addNewChapter } from "./ChapterPopup"

const useStyles = createStyles((theme) => ({
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `${1} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
    },
}))

export function BookInfoForm() {
    const { classes, theme } = useStyles()
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6]

    const [type, toggleView] = useToggle(["edit", "view"])
    const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>()
    const resetRef = useRef<() => void>(null)
    const navigatePath = useNavigate()

    const form = useForm({
        initialValues: {
            title: "",
            price: 0,
            bookAbstract: "",
            bookCoverPhotoAsBinaryString: "",
            tags: [""],
        },

        validate: {
            // price: (val) => (val <= 500 ? null : "Invalid price"),
            bookAbstract: (val: string) =>
                val.length >= 100 ? "Abstract should be at least 100 characters" : null,
        },
    })

    const book_client = BookClient()

    const tagsQuery = useQuery({
        queryKey: ["tags"],
        queryFn: () => book_client.getAllBooksTags(),
    })

    if (tagsQuery.isError) return <ErrorPage />

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
        console.log("submit")
        console.log(form.values as CreateBookRequest)
        const handle_request = await book_client.post(form.values as CreateBookRequest)
        if (handle_request) {
            navigatePath(`/book/${handle_request.bookId}/:1`)
        }
    }

    return (
        <Paper radius="l" p="xl" withBorder>
            <div style={{ margin: "auto" }}>
                <Text size="lg" weight={500}>
                    Welcome to Your Library, {type} your {form.values.title} book
                </Text>

                {type == "edit" && (
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <br></br>
                            <FileInput
                                // resetRef={resetRef}
                                onChange={setCoverPhotoFile}
                                accept="image/png,image/jpeg"
                                placeholder="Upload an image"
                                label="Book Cover Photo"
                                required
                            />
                            <Group position="center" aria-required>
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
                                label="Book Abstract"
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
                            <MultiSelect
                                data={tagsQuery.data ? tagsQuery.data : [""]}
                                label="Book Tags"
                                placeholder="Add tags for your book"
                                {...form.getInputProps("tags")}
                            />
                        </Stack>
                    </form>
                )}

                {/* {type == "view" && (
            //    student book info
            {navigatePath(`/bookinfo/${book.bookId}`)}

            )} */}

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggleView()}
                        size="xs"
                    >
                        {type === "edit" ? "view the book info" : "edit the book info"}
                    </Anchor>
                    {type === "edit" && (
                        // <Button type="submit" radius="xl" onClick={() => handleSubmit()}>
                        //     Submit
                        // </Button>
                        <Group noWrap spacing={0}>
                            <Button className={classes.button} onClick={() => handleSubmit()}>
                                Submit
                            </Button>
                            <Menu
                                transitionProps={{ transition: "pop" }}
                                position="bottom-end"
                                withinPortal
                            >
                                <Menu.Target>
                                    <ActionIcon
                                        variant="filled"
                                        color={theme.primaryColor}
                                        size={36}
                                        className={classes.menuControl}
                                    >
                                        <IconChevronDown size="1rem" stroke={1.5} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={
                                            <IconFilePencil
                                                size="1rem"
                                                stroke={1.5}
                                                color={menuIconColor}
                                            />
                                        }
                                        onClick={() => addNewChapter()}
                                    >
                                        Add chapter
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={
                                            <IconBookmark
                                                size="1rem"
                                                stroke={1.5}
                                                color={menuIconColor}
                                            />
                                        }
                                    >
                                        Save draft
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={
                                            <IconTrash
                                                size="1rem"
                                                stroke={1.5}
                                                color={menuIconColor}
                                            />
                                        }
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    )}
                </Group>
            </div>
        </Paper>
    )
}
