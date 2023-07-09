import { AppNavbar } from "../Navbar"
import { Group, createStyles, AppShell } from "@mantine/core"
import { StudentOwnedBook } from "./StudentOwnedBook"
import { useQuery } from "@tanstack/react-query"
import { RESOURCE_URL, S3Client, StudentClient } from "../fetch"
import { CenteredLoading, ErrorPage } from "../shared"
import { DndList } from "./FavouritesGrid"

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
    const s3_client = S3Client()

    const { isLoading, data, isError } = useQuery({
        queryKey: ["student-library"],
        queryFn: () => student_client.getLibrary(),
    })

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />
    console.log(data)

    // const favourites = useQuery({
    //     queryKey: ["student-favourites"],
    //     queryFn: () => student_client.getFavourites(),
    // })

    return (
        <>
            <AppShell navbar={<AppNavbar />}>
                {
                    <Group className={styles.home_grid}>
                        {data.map((book) => (
                            // eslint-disable-next-line react/jsx-key
                            <StudentOwnedBook
                                tags={book.tags}
                                title={book.title}
                                description={book.bookAbstract}
                                image={RESOURCE_URL(book.bookCoverPath)}
                            />
                        ))}
                    </Group>
                }
            </AppShell>
        </>
    )
}

export default Library
