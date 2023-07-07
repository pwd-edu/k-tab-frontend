import { IconBookmark, IconHeart } from "@tabler/icons-react"
import {
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    createStyles,
    rem,
} from "@mantine/core"

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
    tags: {
        marginRight: theme.spacing.xs,
    },

    footer: {
        marginTop: theme.spacing.md,
    },
}))

interface StudentBookProps {
    image: string
    link: string
    title: string
    description: string
    tags: string[]
}

export function StudentOwnedBook({
    className,
    image,
    link,
    title,
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
                    <Text className={classes.title} fw={500} component="a" {...linkProps}>
                        {title}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <ActionIcon className={classes.action}>
                        <IconHeart size="1rem" color={theme.colors.red[6]} />
                    </ActionIcon>
                </Group>
            </Group>

            <Text fz="sm" color="dimmed" lineClamp={4}>
                {description}
            </Text>
        </Card>
    )
}
