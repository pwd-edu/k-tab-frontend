import { ActionIcon, Card, createStyles, Group, Image, Stack, Text } from "@mantine/core"
import { IconClock, IconEdit, IconChartPie } from "@tabler/icons"

const useStyles = createStyles((theme, _params, getRef) => ({
    article: {
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
        <Card className={classes.article} shadow="sm" p="md" radius="sm" withBorder>
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
