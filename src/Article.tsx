import { ActionIcon, Card, createStyles, Group, Image, Stack, Text } from "@mantine/core"
import { IconClock, IconEdit, IconChartPie, IconPlus } from "@tabler/icons"

const useStyles = createStyles((theme, _params, getRef) => ({
    article_card: {
        width: 286,
        height: 179,
    },
}))

type ArticleProps = {
    title: string
    thumbnail_img: string
    last_update: Date
}

export const Article = ({ title, thumbnail_img, last_update }: ArticleProps) => {
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
    return (
        <Card className={classes.article_card} shadow="sm" p="md" radius="sm" withBorder>
            <Text weight={700} size="md">
                {title}
            </Text>
            <Stack spacing="xs">
                <Image height={98} radius="sm" src={thumbnail_img} />
                <Group spacing="xs">
                    <IconClock color={"#4F4F4F"} size={18} />
                    <Text size="xs" weight={700} color={"#4F4F4F"}>
                        {`Updated ${formatDateTime(last_update)}`}
                    </Text>
                    <Group spacing={0}>
                        <ActionIcon variant="transparent">
                            <IconChartPie color={"#4F4F4F"} size={18} />
                        </ActionIcon>
                        <ActionIcon variant="transparent">
                            <IconEdit color={"#4F4F4F"} size={18} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Stack>
        </Card>
    )
}

export const AddArticle = () => {
    const { classes } = useStyles()
    return (
        <Card className={classes.article_card} shadow="sm" p="md" radius="sm" withBorder>
            <Stack justify="center" style={{ height: "100%" }}>
                <Group position="center">
                    <ActionIcon size={58} variant="transparent">
                        <IconPlus
                            color={"#155EEF"}
                            width={58}
                            height={58}
                            strokeLinecap="square"
                            strokeLinejoin="inherit"
                            viewBox="4 4 16 16"
                        />
                    </ActionIcon>
                </Group>
            </Stack>
        </Card>
    )
}
