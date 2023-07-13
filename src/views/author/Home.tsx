import { CenteredLoading } from "@components/shared"
import { AuthorClient, RESOURCE_URL } from "@fetch/index"
import { BookHeader } from "@fetch/types"
import { AppNavbar } from "@layout/Navbar"
import { AppShell, Group, createStyles } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"

import { AddBook, AuthorBookCard } from "./AuthorBook"

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

export const AuthorHome = () => {
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
                {data?.map((book: BookHeader) => (
                    <HomeBookCard key={book.bookId} book={book} />
                ))}
            </Group>
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
