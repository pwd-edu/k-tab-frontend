import { useAuth } from "@auth/useAuth"
import { useAuthSession } from "@auth/useAuthSession"
import { UserClient } from "@fetch/index"
import {
    Avatar,
    Button,
    Group,
    Input,
    Menu,
    Stack,
    Text,
    ThemeIcon,
    Tooltip,
    createStyles,
} from "@mantine/core"
import { Navbar, getStylesRef, rem } from "@mantine/core"
import { IconBook2, IconHome, IconNotification, IconSearch } from "@tabler/icons"
import { IconBellRinging, IconLogout, IconSettings } from "@tabler/icons-react"
import { forwardRef } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
    backgroundColor,
    boxShadow,
    classnames,
    height,
    lineHeight,
    padding,
    typography,
} from "tailwindcss-classnames"

import messi from "../assets/messi.jpg"
import { KtabLogo } from "../components/shared"

const useStyles = createStyles((theme) => ({
    alert_notification: {
        [`& circle`]: {
            fill: "red",
            stroke: "red",
        },
    },
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xxxs} ${theme.spacing.xxs}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,

            [`& .${getStylesRef("icon")}`]: {
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
                .background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
            [`& .${getStylesRef("icon")}`]: {
                color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
            },
        },
    },
}))

const buildStyles = () => {
    const { classes, cx, theme } = useStyles()
    const styles = {
        navbar: classnames(height("h-12"), padding("px-3"), boxShadow("shadow-md")),
        tooltip: classnames(
            lineHeight("leading-none"),
            typography("text-xs"),
            backgroundColor("bg-slate-500")
        ),
        notification_container: classnames(padding("p-1")),
        ...classes,
    }
    return { styles, classes, cx, theme }
}

const Notification = forwardRef<HTMLDivElement>(function Notification(props, ref) {
    const { styles } = buildStyles()
    return (
        <div ref={ref} {...props}>
            <IconNotification size="30px" className={styles.alert_notification} color={"#333333"} />
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

export const AppNavbar = () => {
    const { styles } = buildStyles()
    const { logout } = useAuth()

    return (
        <Navbar width={{ sm: 250 }} p="md">
            <Navbar.Section grow>
                <Group className={styles.header} position="apart">
                    <KtabLogo width={150} height={150} />
                </Group>
                <NavbarLinks />
            </Navbar.Section>

            <Navbar.Section className={styles.footer}>
                <Button variant="white" onClick={() => logout()} color="indigo" aria-label="Logout">
                    <IconLogout stroke={1.5} aria-hidden="true" />
                    <Text className="ml-2">Logout</Text>
                </Button>
            </Navbar.Section>
        </Navbar>
    )
}

const NavbarLinks = () => {
    const { styles, cx, theme } = buildStyles()
    const [active, setActive] = useState("Billing")

    const authorData = [
        { link: "/", label: "Home", icon: IconHome, color: theme.primaryColor },
        { link: "/", label: "Notifications", icon: IconBellRinging, color: theme.primaryColor },
        { link: "/editor", label: "Book Editor", icon: IconBook2, color: theme.primaryColor },
        { link: "/", label: "Settings", icon: IconSettings, color: theme.primaryColor },
    ]

    const studentData = [
        { link: "/bookstore", label: "Home", icon: IconHome, color: theme.primaryColor },
        { link: "/", label: "Notifications", icon: IconBellRinging, color: theme.primaryColor },
        { link: "/library", label: "Library", icon: IconBook2, color: theme.primaryColor },
        { link: "/", label: "Settings", icon: IconSettings, color: theme.primaryColor },
    ]

    const { user } = useAuthSession()

    function getClientNavData() {
        if (user?.userType == "STUDENT") {
            return studentData
        } else {
            return authorData
        }
    }

    const data = getClientNavData()

    const isActive = (item: { label: string }) => {
        return item.label === active
    }

    return (
        <>
            {data?.map((item) => (
                <Link
                    className={cx(styles.link, { [styles.linkActive]: isActive(item) })}
                    to={item.link}
                    key={item.label}
                    onClick={() => {
                        setActive(item.label)
                    }}
                >
                    <Group>
                        <ThemeIcon
                            variant={"light"}
                            size="lg"
                            color={isActive(item) ? theme.primaryColor : "indigo"}
                        >
                            {<item.icon />}
                        </ThemeIcon>

                        <Text size="sm">{item.label}</Text>
                    </Group>
                </Link>
            ))}
        </>
    )
}

export const Search = () => {
    return (
        <Input
            size="xs"
            rightSection={<IconSearch size="20px" color="#828282" />}
            placeholder="Search"
            radius="md"
        />
    )
}

type NotificationMenuProps = {
    opened: boolean
    setOpened: (opened: boolean) => void
}

export const NotificationMenu = ({ opened, setOpened }: NotificationMenuProps) => {
    const { styles } = buildStyles()
    return (
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
    )
}
