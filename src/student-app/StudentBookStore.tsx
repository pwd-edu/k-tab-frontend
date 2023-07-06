import { Navbar } from "../Navbar"
import { Group, createStyles } from "@mantine/core"
import aofm from "../assets/aofm.jpg"
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
    return (
        <>
            <Navbar />
            <Group className={styles.home_grid}>
                <StudentBook
                    title="The art of mathematics"
                    thumbnail_img={aofm}
                    last_update={new Date(Date.now())}
                />
                <StudentBook
                    title="Software Engineering"
                    thumbnail_img={aofm}
                    last_update={new Date(Date.now())}
                />
            </Group>
        </>
    )
}
