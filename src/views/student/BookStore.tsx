import { CenteredLoading, ErrorPage } from "@components/shared"
import { BookClient, RESOURCE_URL, StudentClient } from "@fetch/index"
import { AppNavbar } from "@layout/Navbar"
import { ActionIcon, AppShell, Group, Select, TextInput, createStyles } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconHash,
    IconLogicAnd,
    IconLogicOr,
    IconSearch,
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"

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
    const [title, setTitle] = useState<string>()
    const [tag, setTag] = useState<string>()

    const navigatePath = useNavigate()

    const student_client = StudentClient()
    const bookStoreQuery = useQuery({
        queryKey: ["bookstore", prev, next, tag, title],
        queryFn: () => student_client.getBookstore(operation, next, prev, title, tag, filter),
    })

    const book_client = BookClient()
    const tagsQuery = useQuery({
        queryKey: ["tags", prev, next],
        queryFn: () => book_client.getAllBooksTags(),
    })

    if (bookStoreQuery.isLoading || tagsQuery.isLoading) return <CenteredLoading />
    if (bookStoreQuery.isError || tagsQuery.isError) return <ErrorPage />

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

    const getSearchResultsWithTitle = (event: {
        currentTarget: { value: SetStateAction<string | undefined> }
    }) => {
        setTitle(event.currentTarget.value)
        setOperation("next")
        setNext("")
        setPrev("")
    }

    const getSearchResultsWithTags = (value: string) => {
        setTag(value)
        setOperation("next")
        setNext("")
        setPrev("")
    }

    return (
        <>
            <AppShell navbar={<AppNavbar />}>
                <Group spacing={"md"}>
                    <TextInput
                        icon={<IconSearch />}
                        placeholder="Search with book title"
                        onChange={(event) => getSearchResultsWithTitle(event)}
                    />
                    <ActionIcon onClick={() => toggleFilter()}>
                        {filter === "AND" ? (
                            <IconLogicAnd size="1.125rem" />
                        ) : (
                            <IconLogicOr size="1.125rem" />
                        )}
                    </ActionIcon>
                    <Select
                        icon={<IconHash />}
                        placeholder="Pick one tag"
                        data={tagsQuery.data ? tagsQuery.data : [""]}
                        value={tag}
                        onChange={getSearchResultsWithTags}
                    />
                </Group>

                <Group className={styles.home_grid}>
                    {bookStoreQuery.data.bookHeaders.map((book) => (
                        <StudentBook
                            key={book.bookId}
                            image={RESOURCE_URL(book.bookCoverPath)}
                            price={book.price}
                            tags={book.tags}
                            title={book.title}
                            description={book.bookAbstract}
                            authorName={book.authorName}
                            onClick={() => navigatePath(`/bookinfo/${book.bookId}`)}
                        />
                    ))}
                </Group>
                <Group>
                    {prevPtr && (
                        <ActionIcon variant="light" onClick={() => getFirstPage()}>
                            <IconChevronsLeft size="1rem" />
                        </ActionIcon>
                    )}
                    {prevPtr && (
                        <ActionIcon variant="light" onClick={() => getPrevPage()}>
                            <IconChevronLeft size="1rem" />
                        </ActionIcon>
                    )}
                    {nxtPtr && (
                        <ActionIcon variant="light" onClick={() => getNextPage()}>
                            <IconChevronRight size="1rem" />
                        </ActionIcon>
                    )}
                </Group>
            </AppShell>
        </>
    )
}
