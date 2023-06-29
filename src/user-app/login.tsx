import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Title,
    Text,
    Group,
    Button,
    Stack,
    useMantineTheme,
    Center,
    Box,
} from "@mantine/core"
import { Link, useNavigate } from "react-router-dom"
import { PORT } from "../constants"
import axios from "axios"

import Cover from "../assets/login-cover.png"
import Logo from "../assets/logo.svg"

export function LoginPage() {
    const navigation = useNavigate()

    const login = (data: any) => {
        const params = {
            email: data.email,
            password: data.password,
        }
        axios
            .post(`http://localhost:${PORT}/api/security/login/`, params)
            .then(function (response) {
                //   IF EMAIL ALREADY EXISTS
                if (response.data.success === false) {
                    return
                } else {
                    localStorage.setItem("auth", response.data.token)
                    setTimeout(() => {
                        navigation("/home")
                        console.log(response.data.token)
                    }, 3000)
                }
            })

            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <Group className="h-screen gap-0">
            <LoginForm />
            <ProductBranding />
        </Group>
    )
}

function LoginForm() {
    return (
        <Stack className="h-full grow-[1.3] basis-0 p-5">
            <img src={Logo} alt="K tab logo" width={150} height={150} />
            <Center className="flex-1">
                <Stack className="w-5/6 justify-start" spacing={10} mt={10}>
                    <Title>Welcome back!</Title>
                    <form>
                        <TextInput label="Email" placeholder="Your mail" required />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            mt="md"
                        />
                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>

                        <Button type="submit" fullWidth mt="xl" radius="xl">
                            Login
                        </Button>
                    </form>
                    <Text color="dimmed" size="sm" mt={5}>
                        Do not have an account yet? &nbsp;
                        <Anchor component={Link} to="/student">
                            Sign up
                        </Anchor>
                    </Text>
                </Stack>
            </Center>
        </Stack>
    )
}

function ProductBranding() {
    const theme = useMantineTheme()
    return (
        <Stack className="h-full grow-[1] basis-0" bg="white" p={20}>
            <Stack
                className="h-full items-center justify-center gap-20 rounded-lg"
                bg={theme.colors.indigo[6]}
            >
                <Box>
                    <Text size="xl" weight={500} color="white" align="left">
                        Learn effectively and inclusively with <strong>K-tab</strong>
                    </Text>
                    <Text size="xs" color="white" align="left">
                        Join now and start learning from the most modern effective books.
                    </Text>
                </Box>
                <img src={Cover} alt="Login cover" width="60%" />
            </Stack>
        </Stack>
    )
}
