import { forwardRef } from "react"
import { createStyles, Group, Input, Avatar, Tooltip } from "@mantine/core"
import { IconSearch, IconNotification } from "@tabler/icons"
import messi from "./assets/messi.jpg"
import logo from "./assets/logo.svg"
import { FlexSpace } from "./shared"

const useStyles = createStyles((theme, _params, getRef) => ({
    navbar: {
        height: "50px",
    },
    wrapper: {
        maxWidth: 215,
    },
    input: {},
    alert_notification: {
        ref: getRef("notifi"),
        [`& circle`]: {
            fill: "red",
            stroke: "red",
        },
    },
}))

const buildStyles = (params?: any) => {
    const { classes, cx, theme } = useStyles(params)
    const styles = {
        navbar: cx(classes.navbar, "px-3 shadow-md"),
        tooltip: cx("text-xs"),
    }
    return { styles, classes, cx, theme }
}

const Notification = forwardRef<HTMLDivElement>(function Notification(props, ref) {
    const { classes } = buildStyles()
    return (
        <div ref={ref} {...props}>
            <IconNotification
                size="30px"
                className={classes.alert_notification}
                color={"#333333"}
            />
        </div>
    )
})

export const Navbar = () => {
    const { styles } = buildStyles()

    return (
        <Group spacing="lg" className={styles.navbar} align="center">
            <img alt="Platform Logo" src={logo} style={{ width: "38px", height: "38px" }} />
            <Search />
            <FlexSpace />
            <Tooltip
                classNames={{ tooltip: styles.tooltip }}
                label="Notification"
                position="bottom"
            >
                <Notification />
            </Tooltip>
            <Avatar src={messi} radius="xl" size="md" />
        </Group>
    )
}

const Search = () => {
    const { classes } = buildStyles()
    return (
        <Input
            size="xs"
            classNames={{ wrapper: classes.wrapper, input: classes.input }}
            rightSection={<IconSearch size="20px" color="#828282" />}
            placeholder="Search"
            radius="md"
        />
    )
}
