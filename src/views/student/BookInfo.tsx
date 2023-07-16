import { CenteredLoading, ErrorPage } from "@components/shared"
import { BookClient, RESOURCE_URL, StudentClient } from "@fetch/index"
import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Group,
    Image,
    Text,
    createStyles,
    rem,
} from "@mantine/core"
import { IconUsers } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    paymentsection: {
        padding: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    cart: {
        color: theme.colors.blue[6],
    },

    label: {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}))

export function BookInfo() {
    const { classes, theme } = useStyles()
    const navigatePath = useNavigate()

    const book_id = useParams().bookId as string
    console.log("bookId: " + book_id)
    const book_client = BookClient()
    const bookInfoQuery = useQuery({
        queryKey: ["bookinfo"],
        queryFn: () => book_client.get(book_id),
    })

    if (bookInfoQuery.isError) return <ErrorPage />
    if (bookInfoQuery.isLoading) return <CenteredLoading />

    const book = bookInfoQuery.data

    const bookTags = book.tags.map((tag) => (
        <Badge color={theme.colorScheme === "dark" ? "dark" : "gray"} key={tag}>
            {tag}
        </Badge>
    ))

    const bookContributors = book.contributions.map((author) => {
        ;<Badge color={theme.colorScheme === "dark" ? "dark" : "gray"} key={author.contributorId}>
            {author.contributorId}
        </Badge>
    })

    const student_client = StudentClient()
    const handlePayment = async () => {
        student_client.postBookPayment(book_id)
        // navigatePath(`/book/${book_id}/1`) //go to book reader
        navigatePath("/library")
    }

    return (
        <Card withBorder radius="xl" p="xl" mx="xl" my="xl" className={classes.card}>
            <Card.Section mb="lg">
                <Image
                    src={RESOURCE_URL(book.bookCoverPath)}
                    alt={book.title}
                    height={280}
                    radius="lg"
                />
            </Card.Section>

            <Card.Section className={classes.section} my="lg">
                <Text fz="xl" fw={700} my="lg">
                    {book.title}
                </Text>

                <Text fz="md" mt="xs" c="dimmed">
                    {book.bookAbstract}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group spacing={7} mt={7}>
                    {bookTags}
                </Group>
            </Card.Section>
            {bookContributors && (
                <Group mt="xs">
                    <ActionIcon variant="subtle" radius="md" size={36}>
                        <IconUsers size="1.1rem" className={classes.cart} stroke={1.5} />
                    </ActionIcon>
                    <Group spacing={7} mt={5}>
                        {/* {bookContributors ? bookContributors : []} */}
                    </Group>
                </Group>
            )}
            <Card.Section className={classes.paymentsection}>
                <Group spacing={30}>
                    <div>
                        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }} mr="xl">
                            ${book.price}
                        </Text>
                    </div>

                    <Button
                        radius="xl"
                        style={{ flex: 1 }}
                        onClick={() => {
                            handlePayment()
                        }}
                    >
                        Get now
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    )
}
