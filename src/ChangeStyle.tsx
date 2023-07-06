import { MantineProvider, useMantineTheme, MantineTheme } from "@mantine/core"

interface ReactCompProps {
    component: React.ReactNode | React.ReactNode[]
}

export default function DarkMode({
    component,
}: {
    component: React.ReactNode | React.ReactNode[]
}) {
    return <MantineProvider theme={{ colorScheme: "dark" }}>{component}</MantineProvider>
}

function getColor(theme: MantineTheme) {
    return theme.colors.blue[5]
}

export function changeBackground({
    component,
}: {
    component: React.ReactNode | React.ReactNode[]
}) {
    const theme = useMantineTheme()
    return <div style={{ background: getColor(theme) }}> {component}</div>
}
