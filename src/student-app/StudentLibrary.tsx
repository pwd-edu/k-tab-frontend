import { AppNavbar } from "../Navbar"
import { Group, createStyles, AppShell, Stack, Text, Divider } from "@mantine/core"
import { StudentOwnedBook } from "./StudentOwnedBook"
import { useQueries } from "@tanstack/react-query"
import { RESOURCE_URL, StudentClient } from "../fetch"
import { CenteredLoading, ErrorPage } from "../shared"

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

const Library = () => {
    const { styles } = buildStyles()
    console.log("Library")

    const student_client = StudentClient()

    const [libraryQuery, favouritesQuery] = useQueries({
        queries: [
            {
                queryKey: ["student-library"],
                queryFn: () => student_client.getLibrary(),
            },
            {
                queryKey: [`favourites`],
                queryFn: () => student_client.getFavourites(),
            },
        ],
    })

    if (libraryQuery.isLoading || favouritesQuery.isLoading) return <CenteredLoading />
    if (libraryQuery.isError || favouritesQuery.isError) return <ErrorPage />

    return (
        <>
            <AppShell navbar={<AppNavbar />}>
                {
                    <Stack>
                        <Text fz="lg" fw={500}>
                            Library
                        </Text>
                        <Group className={styles.home_grid}>
                            {libraryQuery.data.map((book) => (
                                <StudentOwnedBook
                                    key={book.bookId}
                                    tags={book.tags}
                                    title={book.title}
                                    description={book.bookAbstract}
                                    image={RESOURCE_URL(book.bookCoverPath)}
                                />
                            ))}
                        </Group>
                        <Divider my="xs" />
                        <Text fz="lg" fw={500}>
                            Favourites
                        </Text>
                        <Group className={styles.home_grid}>
                            {favouritesQuery.data.map((fav_book) => (
                                <StudentOwnedBook
                                    key={fav_book.bookId}
                                    tags={fav_book.tags}
                                    title={fav_book.title}
                                    description={fav_book.bookAbstract}
                                    image={RESOURCE_URL(fav_book.bookCoverPath)}
                                />
                            ))}
                        </Group>
                    </Stack>
                }
            </AppShell>
        </>
    )
}

export default Library
