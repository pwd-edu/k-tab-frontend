import { AuthorBookCard, AddBook } from "./AuthorBook"
import { AppNavbar } from "../Navbar"
import { Group, createStyles, AppShell } from "@mantine/core"
import { AuthorClient, RESOURCE_URL } from "../fetch"
import { toast, ToastContainer } from "react-toastify"
import { BookHeader } from "../editor/types"
import { useQuery } from "@tanstack/react-query"
import { CenteredLoading } from "../shared"

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

const author_client = AuthorClient()

export const Home = () => {
    const { styles } = buildStyles()
    const { isLoading, data, isError } = useQuery(["home-books"], () => author_client.getBooks())

    if (isLoading) {
        return <CenteredLoading />
    }

    if (isError) {
        toast.error("Unexpected error occurred", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    return (
        <AppShell navbar={<AppNavbar />}>
            <Group className={styles.home_grid}>
                <AddBook />
                {data?.map((book) => (
                    <HomeBookCard key={book.bookId} book={book} />
                ))}
            </Group>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AppShell>
    )
}

const HomeBookCard = ({ book }: { book: BookHeader }) => {
    return (
        <AuthorBookCard
            id={book.bookId}
            title={`${book.title}`}
            thumbnail_img={RESOURCE_URL(book.bookCoverPath)}
            last_update={new Date(Date.now())}
        />
    )
}
