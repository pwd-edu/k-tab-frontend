import { CenteredLoading, ErrorPage } from "@components/shared"
import { AuthorClient, RESOURCE_URL } from "@fetch/index"
import { Avatar, Button, Divider, Group, Paper, Text, createStyles } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

import { StudentBook } from "../student/StudentBook"

interface AuthorProfileProps {
    author_id: string
}

const useStyles = createStyles((theme) => ({
    grid: {
        padding: theme.spacing.md,
    },
}))

const buildStyles = (params?: any) => {
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        home_grid: cx(classes.grid),
    }
    return { styles, classes, cx, theme }
}
export function AuthorProfile({ author_id }: AuthorProfileProps) {
    const { styles } = buildStyles()

    const author_client = AuthorClient()
    const { isLoading, data, isError } = useQuery(["author-profile"], () =>
        author_client.getProfile(author_id)
    )

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />

    function navigatePath(arg0: string): void {
        throw new Error("Function not implemented.")
    }

    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={RESOURCE_URL(data.profilePhotoPath)} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" weight={500} mt="md">
                {data.authorName}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
                {data.authorEmail} •
            </Text>
            <Button variant="filled" fullWidth mt="md" color="blue">
                Follow
            </Button>
            <Divider my="xs" />
            <Group className={styles.home_grid}>
                {data.bookHeaders?.map((item) => (
                    <StudentBook
                        key={item.bookId}
                        image={RESOURCE_URL(item.bookCoverPath)}
                        title={item.title}
                        description={item.bookAbstract}
                        price={item.price ? item.price : 0}
                        tags={item.tags ? item.tags : ["TECH"]}
                        rating={item.avgRating}
                        onClick={() => navigatePath(`/bookinfo/${item.bookId}`)}
                    />
                ))}
            </Group>
        </Paper>
    )
}
export default AuthorProfile
