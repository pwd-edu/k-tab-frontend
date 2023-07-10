import { StudentClient } from "@fetch/index"
import {
    ActionIcon,
    Badge,
    Card,
    Center,
    Group,
    Image,
    Text,
    createStyles,
    rem,
} from "@mantine/core"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const useStylesCard = createStyles((theme) => ({
    card: {
        position: "relative",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        width: 280,
        maxWidth: 320,
        height: 302,
        maxHeight: 355,
    },

    title: {
        display: "inline",
        width: 200,
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
    book_id: string
    image?: string
    link?: string
    title: string
    description: string
    tags: string[]
    fav: boolean
}

export function StudentOwnedBook({
    className,
    book_id,
    image,
    fav,
    link,
    title,
    tags,
    description,
    ...others
}: StudentBookProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof StudentBookProps>) {
    const { classes, cx, theme } = useStylesCard()
    const linkProps = { href: link, target: "_blank", rel: "noopener noreferrer" }

    const bookTags = tags.map((tag) => (
        <Badge className={classes.tags} color="blue" variant="light" key={tag}>
            {tag}
        </Badge>
    ))
    const student_client = StudentClient()

    const [favourite, setFavourite] = useState<boolean>(fav)

    const removeFromFavourites = useMutation(() => student_client.removeFavourite(book_id))
    const addtoFavourites = useMutation(() => student_client.addFavourite(book_id))

    const toggleFavourites = () => {
        favourite ? removeFromFavourites.mutate() : addtoFavourites.mutate()
        console.log("fav intial state: " + favourite)
        setFavourite(!favourite)
    }
    console.log("fav final state: " + favourite)

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
                    <Text truncate className={classes.title} fw={500} component="a" {...linkProps}>
                        {title}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <ActionIcon
                        className={classes.action}
                        title="Favourites"
                        component="button"
                        onClick={() => toggleFavourites()}
                    >
                        {fav ? (
                            <IconHeartFilled size="1rem" color={theme.colors.red[6]} />
                        ) : (
                            <IconHeart size="1rem" color={theme.colors.red[6]} />
                        )}
                    </ActionIcon>
                </Group>
            </Group>

            <Text fz="sm" color="dimmed" lineClamp={3}>
                {description}
            </Text>
        </Card>
    )
}