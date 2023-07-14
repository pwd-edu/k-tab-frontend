import { CenteredLoading, ErrorPage } from "@components/shared"
import { RESOURCE_URL, StudentClient } from "@fetch/index"
import { AppNavbar } from "@layout/Navbar"
import { ActionIcon, AppShell, Group, createStyles } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft } from "@tabler/icons-react"
import { IconChevronsRight } from "@tabler/icons-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { string } from "zod"

import { StudentBook } from "./StudentBook"

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

export function BookStore() {
    const { styles } = buildStyles()

    const [operation, setOperation] = useState("next")
    const [next, setNext] = useState<string>() //or undefined
    const [prev, setPrev] = useState<string>()
    const [filter, toggleFilter] = useToggle(["AND", "OR"])
    const [title, setTitle] = useState<string | undefined>()
    const [tag, setTag] = useState<string | undefined>()

    const student_client = StudentClient()
    const bookStoreQuery = useQuery({
        queryKey: ["bookstore", prev, next],
        queryFn: () => student_client.getBookstore(operation, next, prev, title, tag, filter),
    })

    if (bookStoreQuery.isLoading) return <CenteredLoading />
    if (bookStoreQuery.isError) return <ErrorPage />

    const nxtPtr = bookStoreQuery.data.next
    const prevPtr = bookStoreQuery.data.prev

    const getFirstPage = () => {
        setPrev(undefined)
        setNext(undefined)
        setOperation("prev")
    }

    const getNextPage = () => {
        setOperation("next")
        setNext(nxtPtr)
        setPrev(prevPtr)
    }

    const getPrevPage = () => {
        setOperation("prev")
        setNext(bookStoreQuery.data.next)
        setPrev(bookStoreQuery.data.prev)
    }

    return (
        <>
            <AppShell navbar={<AppNavbar />}>
                <Group className={styles.home_grid}>
                    {bookStoreQuery.data.bookHeaders.map((book) => (
                        <StudentBook
                            key={book.bookId}
                            image={RESOURCE_URL(book.bookCoverPath)}
                            link={"https://mantine.dev/"}
                            price={book.price}
                            tags={book.tags}
                            title={book.title}
                            description={book.bookAbstract}
                            authorName={book.authorName}
                        />
                    ))}
                </Group>
                <Group>
                    <ActionIcon variant="light" onClick={() => getFirstPage()}>
                        <IconChevronsLeft size="1rem" />
                    </ActionIcon>
                    {prev != "" && (
                        <ActionIcon variant="light" onClick={() => getPrevPage()}>
                            <IconChevronLeft size="1rem" />
                        </ActionIcon>
                    )}
                    {next != "" && (
                        <ActionIcon variant="light" onClick={() => getNextPage()}>
                            <IconChevronRight size="1rem" />
                        </ActionIcon>
                    )}
                </Group>
            </AppShell>
        </>
    )
}
