import { createStyles, Card, Group, Switch, Text, rem, TextInput, Slider } from "@mantine/core"
import { IconAccessible } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    item: {
        "& + &": {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        "& *": {
            cursor: "pointer",
        },
    },

    title: {
        lineHeight: 1,
    },
}))

interface SwitchesCardProps {
    title: string
    description: string
    data: {
        type: string
        title: string
        description: string
    }[]
}

const useStylesSlider = createStyles((theme) => ({
    thumb: {
        border: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[3]
        }`,
        width: rem(28),
        height: rem(22),
        color: theme.colors.gray[5],
        backgroundColor: theme.white,
        borderRadius: theme.radius.sm,
    },
}))

export function UIsettings({ data }: SwitchesCardProps) {
    const { classes } = useStyles()
    const stylesSlider = { thumb: { borderWidth: 2, height: 26, width: 26, padding: 3 } }

    const items = data.map((item, idx) => {
        if (item.type === "boolean") {
            return (
                <Group key={idx} position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{item.title}</Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                    <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
                </Group>
            )
        }
        if (item.type === "string") {
            return (
                <Group key={idx} position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{item.title}</Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                    <TextInput value={item.title} size="lg" />
                </Group>
            )
        }
        if (item.type === "integer") {
            return (
                <Group key={idx} position="apart" className={classes.item} noWrap spacing="xl">
                    <div>
                        <Text>{item.title}</Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                    <div>
                        <Slider
                            thumbChildren={<IconAccessible size="1rem" stroke={1.5} />}
                            color="blue"
                            label={null}
                            defaultValue={40}
                            styles={stylesSlider}
                        />
                    </div>
                </Group>
            )
        }
    })

    return (
        <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={500} color="blue">
                <b>Configure UI Preferences</b>
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
                Choose what preferences you want to display
            </Text>
            {items}
        </Card>
    )
}

export default UIsettings
