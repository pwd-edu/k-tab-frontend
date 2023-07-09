import { AppNavbar } from "../Navbar"
import { Group, createStyles, AppShell } from "@mantine/core"
import { StudentOwnedBook } from "./StudentOwnedBook"
import { useQuery } from "@tanstack/react-query"
import { StudentClient } from "../fetch"
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

    const { isLoading, data, isError } = useQuery({
        queryKey: ["student-library"],
        queryFn: () => student_client.getLibrary(),
    })

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />
    console.log(data)

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
                                image={book.bookCoverPath}
                            />
                        ))}
                    </Group>
                }
            </AppShell>
        </>
    )
}

export default Library
