import { Center, ActionIcon, Card, createStyles, Group, Image, Stack, Text } from "@mantine/core"
import { IconClock, IconEdit, IconChartPie, IconPlus, IconEye } from "@tabler/icons"
import { Link, useNavigate } from "react-router-dom"
import { SAMPLE_BOOK_ID } from "./constants"
import { FlexSpace } from "./shared"

const useStyles = createStyles(() => ({
    article_card: {
        width: 240,
        height: 138,
    },
}))

type ArticleProps = {
    title: string
    thumbnail_img: string
    last_update: Date
}

export const Article = ({ title, thumbnail_img, last_update }: ArticleProps) => {
    const { classes } = useStyles()
    const navigate = useNavigate()

    const formatDateTime = (date_time: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
        const formated = date_time.toLocaleDateString("en-US", options)
        return formated
    }

    return (
        <Card className={classes.article_card} shadow="sm" p="sm" radius="sm" withBorder>
            <Text weight={700} size="xs">
                {title}
            </Text>
            <Stack spacing="xs">
                <Image height={70} radius="sm" src={thumbnail_img} />
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
                            to="/editor"
                            title="Edit"
                            size="xs"
                            variant="transparent"
                            onClick={() => navigate(`/book-editor/${SAMPLE_BOOK_ID}/1`)}
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

export const AddArticle = () => {
    const { classes, theme } = useStyles()
    console.log(theme)
    return (
        <Card className={classes.article_card} shadow="sm" p="md" radius="sm" withBorder>
            <Center style={{ width: "100%", height: "100%" }}>
                <ActionIcon size={58} variant="transparent">
                    <IconPlus
                        color={theme.colors.indigo[8]}
                        width={58}
                        height={58}
                        strokeLinecap="square"
                        strokeLinejoin="inherit"
                        viewBox="4 4 16 16"
                    />
                </ActionIcon>
            </Center>
        </Card>
    )
}
