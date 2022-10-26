import { Text, Button, Stack } from "@mantine/core"

function App() {
    return (
        <div className="App">
            <Stack align="center" mt={50}>
                <Text size="xl" weight={500}>
                    Welcome to Mantine!
                </Text>
                <Button>Click the button</Button>
            </Stack>
        </div>
    )
}

export default App
