import { FlexSpace } from "@components/shared"
import { ActionIcon, Card, Group, Image, Stack, Text, createStyles } from "@mantine/core"
import { IconChartPie, IconClock, IconEdit, IconEye, IconPlus } from "@tabler/icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const useStyles = createStyles(() => ({
    book_card: {
        width: 240,
        height: 170,
    },
}))

type BookCardProps = {
    id: string
    title: string
    thumbnail_img: string
    last_update: Date
}

export const AuthorBookCard = ({ title, thumbnail_img, last_update, id }: BookCardProps) => {
    const [image_src, setImageSrc] = useState(thumbnail_img)
    const { classes } = useStyles()

    const formatDateTime = (date_time: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
        const formated = date_time.toLocaleDateString("en-US", options)
        return formated
    }

    const handleImageError = (e: any) => {
        console.log(e)
        setImageSrc("https://placehold.co/512?text=Loading&font=roboto")
    }

    ;<Text weight={500} size="sm" className="line-clamp-2">
        {`${title}`}
    </Text>

    return (
        <Card className={classes.book_card} shadow="sm" p="sm" radius="sm" withBorder>
            <Text weight={500} size="sm" className="line-clamp-2">
                {`${title}`}
            </Text>
            <Stack spacing="xs">
                <Image
                    height={80}
                    radius="sm"
                    src={image_src}
                    onError={(e) => handleImageError(e)}
                />
                <Group className="gap-1">
                    <IconClock color={"#4F4F4F"} size={14} />
                    <Text style={{ fontSize: "10px" }} weight={700} color={"#4F4F4F"}>
                        {`Updated ${formatDateTime(last_update)}`}
                    </Text>
                    <FlexSpace />
                    <Group spacing={0}>
                        <ActionIcon size="xs" variant="transparent" title="Dashboard">
                            <IconChartPie color={"#4F4F4F"} size={14} />
                        </ActionIcon>
                        <ActionIcon
                            component={Link}
                            to={`/book/${id}/1`}
                            title="Edit"
                            size="xs"
                            variant="transparent"
                        >
                            <IconEdit color={"#4F4F4F"} size={14} />
                        </ActionIcon>
                        <ActionIcon
                            component={Link}
                            to=""
                            size="xs"
                            variant="transparent"
                            title="Preview"
                        >
                            <IconEye color={"#4F4F4F"} size={14} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Stack>
        </Card>
    )
}

export function AddBook() {
    const { classes, theme, cx } = useStyles()
    const navigatePath = useNavigate()

    const handleCreateBook = () => {
        navigatePath("/bookinfo")
    }
    return (
        <Card
            className={cx(classes.book_card, "flex flex-col items-center justify-center")}
            shadow="sm"
            p="md"
            radius="sm"
            withBorder
        >
            <Stack justify="center" align="center">
                <ActionIcon size={58} variant="transparent">
                    <IconPlus
                        color={theme.colors.indigo[8]}
                        width={58}
                        height={58}
                        strokeLinecap="square"
                        strokeLinejoin="inherit"
                        viewBox="4 4 16 16"
                        onClick={() => handleCreateBook()}
                    />
                </ActionIcon>
            </Stack>
        </Card>
    )
}
