import Cover from "@assets/login-cover.png"
import { useAuth } from "@auth/useAuth"
import { AuthStatus, useAuthSession } from "@auth/useAuthSession"
import { CenteredLoading, KtabLogo } from "@components/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Anchor,
    Box,
    Button,
    Center,
    Checkbox,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    useMantineTheme,
} from "@mantine/core"
import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { z } from "zod"

const LoginSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
})

type LoginFormInputs = z.infer<typeof LoginSchema>
export function LoginPage() {
    const { status } = useAuthSession()

    if (status === AuthStatus.LOADING) {
        return <CenteredLoading />
    }

    if (status === AuthStatus.AUTHENTICATED) {
        return <Navigate to="/" replace />
    }

    return (
        <Group className="h-screen gap-0">
            <LoginForm />
            <ProductBranding />
        </Group>
    )
}

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(LoginSchema),
    })
    const { login } = useAuth()

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const { email, password } = data
            await login(email, password)
        } catch (e) {
            toast.error("Invalid credentials", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            reset()
        }
    }

    return (
        <Stack className="h-full grow-[1.3] basis-0 p-5">
            <KtabLogo width={150} height={150} />
            <Center className="flex-1">
                <Stack className="w-5/6 justify-start" spacing={10} mt={10}>
                    <Title>Welcome back!</Title>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            label="Email"
                            placeholder="Your mail"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            mt="md"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                {" "}
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                p={20}
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
