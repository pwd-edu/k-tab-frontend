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
import React, { useState } from "react"
import { PORT } from "../constants"


function AuthenticationTitle() {
    const navigation = useNavigate()
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
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form>
                    <div>
                        <TextInput label="Email" placeholder="you@mantine.dev" required />

                    </div>
                    <div>
                        <PasswordInput label="Password" placeholder="Your password" required mt="md" />

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
    );
}

export default AuthenticationTitle