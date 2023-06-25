import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { PORT } from "../constants"
import { useForm } from "react-hook-form"
import axios from "axios"

function AuthenticationTitle() {
    const navigation = useNavigate()
    const { register, handleSubmit } = useForm()

    const login = (data: any) => {
        const params = {
            email: data.email,
            password: data.password,
        }
        console.log(params)
        axios
            .post(`http://localhost:${PORT}/api/security/login/`, params)
            .then(function (response) {
                //   IF EMAIL ALREADY EXISTS
                if (response.data.success === false) {
                    console.log("failed")
                } else {
                    localStorage.setItem("auth", response.data.token)
                    console.log("success login")
                    setTimeout(() => {
                        navigation("/")
                        console.log(response.data.token)
                    }, 3000)
                }
            })

            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet? Create account as{" "}
                <Anchor size="sm" component="button" onClick={() => navigation("/author")}>
                    Author
                </Anchor>{" "}
                or
                <Anchor size="sm" component="button" onClick={() => navigation("/student")}>
                    Student
                </Anchor>
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit(login)}>
                    <div>
                        <TextInput
                            label="Email"
                            placeholder="you@mantine.dev"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            {...register("password")}
                        />
                    </div>
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
            </Paper>
        </Container>
    )
}

export default AuthenticationTitle
