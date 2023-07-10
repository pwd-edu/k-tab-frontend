import { Badge, Card, Center, Group, Image, Text, createStyles, rem } from "@mantine/core"
import { IconUser } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        width: 310,
        maxWidth: 340,
        height: 320,
        maxHeight: 355,
    },

    title: {
        display: "inline",
        width: 100,
        // marginBottom: rem(5),
    },

    action: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
        // width: 160
    },
    tags: {
        marginRight: theme.spacing.xs,
    },
    author: {
        color: theme.colors.dark[2],
    },
    icon: {
        marginRight: rem(5),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
    },
}))

interface StudentBookProps {
    image: string
    link: string
    title: string
    description: string
    price: number
    authorName: string
    tags: string[]
}

export function StudentBook({
    className,
    image,
    link,
    title,
    price,
    authorName,
    tags,
    description,
    ...others
}: StudentBookProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof StudentBookProps>) {
    const { classes, cx, theme } = useStyles()
    const linkProps = { href: link, target: "_blank", rel: "noopener noreferrer" }

    const bookTags = tags.map((tag) => (
        <Badge className={classes.tags} color="blue" variant="light" key={tag}>
            {tag}
        </Badge>
    ))

    return (
        <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
            <Card.Section>
                <a {...linkProps}>
                    <Image src={image} height={180} />
                </a>
            </Card.Section>

            {bookTags}

            <Group position="apart" className={classes.footer}>
                <Center>
                    <Text
                        truncate
                        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                        className={classes.title}
                        fw={500}
                        component="a"
                        {...linkProps}
                    >
                        {title}
                    </Text>
                </Center>

                <Center>
                    <IconUser size="1.05rem" className={classes.icon} stroke={1.5} />
                    <Text color={theme.colorScheme === "dark" ? "dark" : "gray"} size="xs">
                        {authorName}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <Badge color={theme.colorScheme === "dark" ? "dark" : "gray"}>{price}$</Badge>
                </Group>
            </Group>

            <Text fz="sm" color="dimmed" lineClamp={3}>
                {description}
            </Text>
        </Card>
    )
}