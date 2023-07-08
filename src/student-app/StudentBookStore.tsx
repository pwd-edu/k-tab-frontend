import { Group, createStyles, AppShell } from "@mantine/core"
import aofm from "../assets/aofm.jpg"
import { AppNavbar } from "../Navbar"
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

export const BookStore = () => {
    const { styles } = buildStyles()
    const bookTags = ["AI", "Stats"]
    console.log("ya rabbbb")
    return (
        <>
            <AppShell navbar={<AppNavbar />}>
                <Group className={styles.home_grid}>
                    <StudentBook
                        image={aofm}
                        link={"https://mantine.dev/"}
                        price={15}
                        tags={bookTags}
                        title={"bookkk titlllllle"}
                        description={
                            "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
                        }
                        authorName={"Mariam Ashraf"}
                    />
                    <StudentBook
                        image={aofm}
                        link={"https://mantine.dev/"}
                        title={
                            "bookkk titllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllle"
                        }
                        tags={bookTags}
                        // rating={"outstanding"}
                        price={15}
                        description={"bla bla bla bla bla bla bla bla bla bla bla bla"}
                        authorName={"Mariam Ashraf"}
                    />
                </Group>
            </AppShell>
        </>
    )
}
