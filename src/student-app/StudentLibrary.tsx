import { AppNavbar } from "../Navbar"
import { Group, createStyles } from "@mantine/core"
import aofm from "../assets/aofm.jpg"
import { StudentOwnedBook } from "./StudentOwnedBook"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PORT } from "../constants"

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
    const bookTags = ["Maths", "Physics"]

    const bookQuery = useQuery({
        queryKey: ["libraryBooks"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:${PORT}/payment/library/`)
            const data = await response.data
            console.log(data)
            return data
        },
    })

    if (bookQuery.isLoading) return <h1>Loading....</h1>
    if (bookQuery.isError) return <h1>Error loading data!!!</h1>

    return (
        <>
            <AppNavbar />
            <Group className={styles.home_grid}>
                {/* {bookQuery.data.map((book) => (
                    // <StudentOwnedBook
                    //     image= book.
                    //     link={"https://mantine.dev/"}
                    //     tags={bookTags}
                    //     title={"bookkk titlllllllllllllllllllllllllllllllllllllle"}
                    //     description={
                    //         "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                    //     }
                    // />
                ))} */}

                <StudentOwnedBook
                    image={aofm}
                    link={"link opens book info card where student buys book"}
                    tags={bookTags}
                    title={"bookkk titlllllllllllllllllllllllllllllllllllllle"}
                    description={
                        "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                    }
                />
                <StudentOwnedBook
                    image={aofm}
                    link={"https://mantine.dev/"}
                    tags={bookTags}
                    title={"bookkk titlllllle"}
                    description={"bla bla bla bla bla bla bla bla bla bla bla bla"}
                />
            </Group>
        </>
    )
}

export default Library
