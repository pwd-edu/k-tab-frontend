import {
    Badge,
    Card,
    Center,
    Group,
    Image,
    Rating,
    Stack,
    Text,
    createStyles,
    rem,
} from "@mantine/core"
import { IconUser } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        width: rem(320),
        maxWidth: 340,
        height: rem(350),
        maxHeight: 355,
    },

    title: {
        display: "inline",
        maxWidth: 175,
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
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    author: {
        color: theme.colors.dark[2],
    },
    icon: {
        marginRight: rem(5),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
    },
    rating: {
        position: "absolute",
        right: rem(35),
        pointerEvents: "none",
    },
    price: {
        position: "absolute",
        top: theme.spacing.xs,
        right: rem(12),
        pointerEvents: "none",
    },
}))

interface StudentBookProps {
    image: string
    title: string
    description: string
    price?: number
    authorName?: string
    tags: string[]
    rating: number
}

export function StudentBook({
    className,
    image,
    title,
    price,
    authorName,
    tags,
    rating,
    description,
    ...others
}: StudentBookProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof StudentBookProps>) {
    const { classes, cx, theme } = useStyles()

    const bookTags = tags.map((tag) => (
        <Badge className={classes.tags} color="blue" variant="light" key={tag}>
            {tag}
        </Badge>
    ))

    return (
        <Card
            withBorder
            shadow="md"
            radius="md"
            className={cx(classes.card, className)}
            {...others}
        >
            <Card.Section>
                <Image src={image} height={180} alt="book cover" />
            </Card.Section>
            <Group>
                {bookTags}
                <Text fz="lg" fw={700} sx={{ lineHeight: 1 }} mr="-md" className={classes.rating}>
                    ${price}
                </Text>
            </Group>

            <Stack ml="xs" spacing="md">
                <Group spacing="xs" mb="-md" position="apart">
                    <Text
                        truncate
                        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                        className={classes.title}
                        fw={500}
                    >
                        {title}
                    </Text>
                    <Rating
                        className={classes.rating}
                        defaultValue={rating}
                        fractions={2}
                        readOnly
                        mr="-xl"
                    />
                </Group>
                <Group position="apart">
                    {authorName && (
                        <Center>
                            <IconUser size="1.05rem" className={classes.icon} stroke={1.5} />
                            <Text color={theme.colorScheme === "dark" ? "dark" : "gray"} size="xs">
                                {authorName}
                            </Text>
                        </Center>
                    )}{" "}
                    {price && (
                        <Group>
                            {/* <Badge className={classes.price} color={theme.colorScheme === "dark" ? "dark" : "gray"} variant="filled">
                                {price}$
                            </Badge> */}
                        </Group>
                    )}
                </Group>
            </Stack>

            <Center mt="xs" ml="sm">
                <Text fz="sm" color="dimmed" lineClamp={2}>
                    {description}
                </Text>
            </Center>
        </Card>
    )
}
