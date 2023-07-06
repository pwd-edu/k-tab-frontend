import { Card, Image, Text, Badge, Group, Center, createStyles, rem } from "@mantine/core"

import { IconUsers, IconUser, IconWriting } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    rating: {
        position: "absolute",
        top: theme.spacing.xs,
        right: rem(12),
        pointerEvents: "none",
    },

    title: {
        display: "block",
        marginBottom: rem(5),
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
    rating: string
    price: number
    authorName: string
}

export function StudentBook({
    className,
    image,
    link,
    title,
    price,
    authorName,
    description,
    ...others
}: StudentBookProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof StudentBookProps>) {
    const { classes, cx, theme } = useStyles()
    const linkProps = { href: link, target: "_blank", rel: "noopener noreferrer" }

    const bookTags = ["AI", "Stats"]
    const tags = bookTags.map((tag) => (
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

            {tags}

            <Group position="apart" className={classes.footer}>
                <Center>
                    <Text className={classes.title} fw={500} component="a" {...linkProps}>
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

            <Text fz="sm" color="dimmed" lineClamp={4}>
                {description}
            </Text>
        </Card>
    )
}
