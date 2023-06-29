import { Box, Center, Loader } from "@mantine/core"

export const FlexSpace = () => {
    return <div className="flex-1"></div>
}

export const CenteredLoading = () => {
    return (
        <Center className="h-screen">
            <Box className="flex w-1/2 justify-center">
                <Loader size="md" variant="bars" />
            </Box>
        </Center>
    )
}
