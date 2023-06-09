import { Article, AddArticle } from "./Article"
import { Navbar } from "./Navbar"
import { Group, createStyles } from "@mantine/core"
import aofm from "./assets/aofm.jpg"

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
    return (
        <>
            <Navbar />
            <Group className={styles.home_grid}>
                <AddArticle />
                <Article
                    title="The art of mathematics"
                    thumbnail_img={aofm}
                    last_update={new Date(Date.now())}
                />
            </Group>
        </>
    )
}
