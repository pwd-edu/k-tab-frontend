import { Card, Image, Text, Group, Badge, createStyles, Center, Button, rem } from "@mantine/core"
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from "@tabler/icons-react"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        width: 260,
        height: 300,
    },

    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        height: 160,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: rem(-0.25),
        textTransform: "uppercase",
    },

    section: {
        padding: theme.spacing.md,
        // borderTop: `${rem(1)} solid ${
        //   theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        // }`,
    },

    icon: {
        marginRight: rem(5),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
    },
}))

const mockdata = [
    { label: "Author Name", icon: IconUsers },
    //   { label: '100 km/h in 4 seconds', icon: IconGauge },
    //   { label: 'Automatic gearbox', icon: IconManualGearbox },
    //   { label: 'Electric', icon: IconGasStation },
]

export function StudentBook() {
    const { classes } = useStyles()
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text fz="sm" c="dimmed" className={classes.label} size="xs">
                {feature.label}
            </Text>
        </Center>
    ))

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
            </Card.Section>

            {/* <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section> */}

            <Card.Section className={classes.section}>
                <Card.Section className={classes.section} mt="md">
                    {/* <Text fz="sm" c="dimmed" className={classes.label}>
                        Basic configuration
                    </Text> */}

                    <Group spacing={8} mb={-8}>
                        {features}
                    </Group>
                </Card.Section>
                <Group spacing={30}>
                    <div>
                        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                            $168.00
                        </Text>
                        {/* <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                            per day
                        </Text> */}
                    </div>

                    <Button radius="xl" style={{ flex: 1 }}>
                        Rent now
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    )
}
