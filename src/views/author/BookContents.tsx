import { Box, Group, Text, createStyles, rem } from "@mantine/core"
import { IconListSearch } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    link: {
        ...theme.fn.focusStyles(),
        display: "block",
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        lineHeight: 1.2,
        fontSize: theme.fontSizes.sm,
        padding: theme.spacing.xs,
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
        borderLeft: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        fontWeight: 500,
        borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 6 : 7],
        color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 2 : 7],

        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
        },
    },
}))

interface TableOfContentsProps {
    chapters: {
        title: string
        S3_link: string
        order: number
    }[]

    active: string
}

export function TableOfContents({ chapters, active }: TableOfContentsProps) {
    const { classes, cx } = useStyles()
    const items = chapters.map((item) => (
        <Box<"a">
            component="a"
            href={item.S3_link}
            onClick={(event) => event.preventDefault()}
            key={item.title}
            className={cx(classes.link, { [classes.linkActive]: active === item.S3_link })}
            sx={(theme) => ({ paddingLeft: `calc(${item.order} * ${theme.spacing.md})` })}
        >
            {item.title}
        </Box>
    ))

    return (
        <div>
            <Group mb="md">
                <IconListSearch size="1.1rem" stroke={1.5} />
                <Text>Table of contents</Text>
            </Group>
            {items}
        </div>
    )
}

export default TableOfContents
