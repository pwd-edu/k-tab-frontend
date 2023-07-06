import { AppNavbar } from "../Navbar"
import { Group, createStyles, AppShell, Header, Footer } from "@mantine/core"
import { Book, AddBook } from "./AuthorBook"
import aofm from "../assets/aofm.jpg"
import useAuthorBooksData from "../hooks/useAuthorBooksData"
import Example from "../exampleRQ"

const useStyles = createStyles((theme) => ({
    grid: {
        padding: theme.spacing.md,
    },
}))

const buildStyles = () => {
    const { classes, cx, theme } = useStyles()
    const styles = {
        home_grid: cx(classes.grid),
    }
    return { styles, classes, cx, theme }
}

export const Home = () => {
    const { styles } = buildStyles()
    // const { isLoading, data, isError, error } = useAuthorBooksData()

    // if (isLoading) {
    //     return <h2>Loading...</h2>
    // }

    // if (isError) {
    //     return <h2>{error.message}</h2>
    // }
    return (
        <AppShell navbar={<AppNavbar />}>
            <Group className={styles.home_grid}>
                <AddBook />
                <Book
                    title="The art of mathematics"
                    thumbnail_img={aofm}
                    last_update={new Date(Date.now())}
                />
                {/* <div>
                    {data.data}
                </div> */}
                {/* <Example/> */}
            </Group>
        </AppShell>
    )
}
