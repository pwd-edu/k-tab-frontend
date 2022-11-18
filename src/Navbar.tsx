import { forwardRef } from "react"
import { useState } from "react"
import { createStyles, Group, Input, Avatar, Tooltip, Stack, Text, Menu } from "@mantine/core"
import { IconSearch, IconNotification } from "@tabler/icons"
import messi from "./assets/messi.jpg"
import { FlexSpace } from "./shared"

const useStyles = createStyles((_theme, _params, getRef) => ({
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
    const _styles = {
        navbar: cx(["h-12", "px-3", "shadow-md"]),
        tooltip: cx("text-xs", "bg-slate-500", "leading-none"),
        notification_container: cx(["p-1"]),
    }
    const styles = { ..._styles }
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

type NotificationItemProps = {
    notifi_msg: string
}

export const NotificationItem = ({ notifi_msg }: NotificationItemProps) => {
    return (
        <Group spacing="lg">
            <Avatar src={messi} radius="xl" size="md" />
            <Stack className="gap-0">
                <Text style={{ fontSize: "14px" }} weight={700} color={"#4F4F4F"}>
                    {"3D Place Solution"}
                </Text>

                <Text style={{ fontSize: "10px" }} weight={700} color={"#4F4F4F"}>
                    {`${notifi_msg}`}
                </Text>
            </Stack>
        </Group>
    )
}

export const NotificationContainer = ({ children }: { children: React.ReactNode }) => {
    const { styles } = buildStyles()
    return (
        <Stack spacing="sm" className={styles.notification_container}>
            {children}
        </Stack>
    )
}

export const Navbar = () => {
    const { styles } = buildStyles()
    const [opened, setOpened] = useState(false)

    return (
        <Group spacing="lg" className={styles.navbar} align="center">
            <img alt="Platform Logo" src="/logo.svg" style={{ width: "38px", height: "38px" }} />
            <Search />
            <FlexSpace />

            <Menu opened={opened} onChange={setOpened} position="bottom-end">
                <Menu.Target>
                    <Tooltip
                        classNames={{ tooltip: styles.tooltip }}
                        label="Notification"
                        position="bottom"
                        disabled={opened}
                    >
                        <Notification />
                    </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Notification</Menu.Label>
                    <NotificationContainer>
                        <NotificationItem notifi_msg="Comment from 7h by Mohamed Ibrahim" />
                        <NotificationItem notifi_msg="Comment from 7h by Mohamed Ibrahim" />
                        <NotificationItem notifi_msg="Comment from 7h by Mohamed Ibrahim" />
                    </NotificationContainer>
                </Menu.Dropdown>
            </Menu>
            <Avatar src={messi} radius="xl" size="md" />
        </Group>
    )
}

const Search = () => {
    const { classes } = buildStyles()
    return (
        <Input
            size="xs"
            rightSection={<IconSearch size="20px" color="#828282" />}
            placeholder="Search"
            radius="md"
        />
    )
}
