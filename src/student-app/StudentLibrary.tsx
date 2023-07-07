import { AppNavbar } from "../Navbar"
import { Group, createStyles } from "@mantine/core"
import aofm from "../assets/aofm.jpg"
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
    const bookTags = ["Maths", "Physics"]
    return (
        <>
            <AppNavbar />
            <Group className={styles.home_grid}>
                <StudentOwnedBook
                    image={aofm}
                    link={"https://mantine.dev/"}
                    tags={bookTags}
                    title={"bookkk titlllllle"}
                    description={"bla bla bla bla bla bla bla bla bla bla bla bla"}
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
