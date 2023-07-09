import { Box, Center, Loader } from "@mantine/core"

import Logo from "./assets/logo.svg"
import { NotFoundTitle } from "./Error404"

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

export const ErrorPage = () => {
    return <NotFoundTitle />
}

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">

export const KtabLogo = (props: ImageProps) => {
    return <img src={Logo} alt="K tab logo" {...props} />
}
