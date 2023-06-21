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
} from '@mantine/core';
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react"

import { login } from "../auth-services/auth.services";
import { PORT } from "../constants"

type Props = {}

const AuthenticationTitle: React.FC<Props> = () => {
    const navigation = useNavigate()

    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const initialValues: {
        email: string;
        password: string;
    } = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This is required!"),
        password: Yup.string().required("This is required!")
    })

    const handleLogin = (formValue: { email: string, password: string }) => {
        const { email, password } = formValue;

        setMessage("");
        setLoading(true);

        console.log("mmmm")

        login(email, password).then(() => {
            navigate("/")
            window.location.reload();
            console.log("mmmmkkkk")
        },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );

    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet? Create account as {' '}
                <Anchor size="sm" component="button" onClick={() => navigation("/author")}>
                    Author
                </Anchor>
                {' '}or
                <Anchor size="sm" component="button" onClick={() => navigation("/student")}>
                    Student
                </Anchor>
            </Text>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form>
                        <div>
                            <TextInput label="Email" placeholder="you@mantine.dev" required />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div>
                            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <Group position="apart" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <Button type="submit" fullWidth mt="xl" radius="xl">
                            Login
                        </Button>
                    </form>
                </Paper>
            </Formik>
        </Container>
    );
}

export default AuthenticationTitle