import { CenteredLoading, ErrorPage } from "@components/shared"
import { RESOURCE_URL, S3Client, StudentClient } from "@fetch/index"
import { AppNavbar } from "@layout/Navbar"
import { AppShell, Divider, Group, Stack, Title, createStyles } from "@mantine/core"
import { useQueries } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

import { BookReader } from "./BookReader"
import { DndList } from "./FavouritesGrid"
import { StudentOwnedBook } from "./StudentOwnedBook"

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
                refetchInterval: 500, //refetch every 500 ms (0.5 s)
            },
            {
                queryKey: [`favourites`],
                queryFn: () => student_client.getFavourites(),
                refetchInterval: 500, //refetch every 500 ms (0.5 s)
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
                        <Title order={2} weight={100} fw={500}>
                            Library
                        </Title>
                        <Group className={styles.home_grid}>
                            {libraryQuery.data.map((book) => (
                                <StudentOwnedBook
                                    key={book.bookId}
                                    book_id={book.bookId}
                                    fav={book.fav}
                                    tags={book.tags}
                                    title={book.title}
                                    description={book.bookAbstract}
                                    image={RESOURCE_URL(book.bookCoverPath)}
                                />
                            ))}
                        </Group>
                        <Divider my="xs" />
                        <Title order={2} fw={500}>
                            Favourites
                        </Title>
                        <Group className={styles.home_grid}>
                            {favouritesQuery.data.map((fav_book) => (
                                <StudentOwnedBook
                                    fav={true}
                                    key={fav_book.bookId}
                                    book_id={fav_book.bookId}
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
