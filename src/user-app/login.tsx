import axios from "axios"
import React , { useState } from "react"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PasswordStrength } from "../PasswordInput"
import { login } from "../auth-services/auth.services";
import { PORT } from "../constants"

type Props = {}

const Login: React.FC <Props> = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // const user = {email, password};

        function createJson(type: string) {
            const data = new FormData()
            data.append(`${type}+email`, email)
            data.append(`${type}+password`, password)

            return data
        }

        // const type = "student";

        const [post, setPost] = React.useState(null)

        React.useEffect(() => {
            axios.get(`http://localhost:${PORT}/student/get/${email}`).then((response) => {
                setPost(response.data)
            })
        }, [])

        const type = "student"

        try {
            const response = await axios.post(
                `http://localhost:${PORT}/${type}/get/${email}`,
                JSON.stringify(createJson(type)),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            console.log(response.data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className="create-user">
            <h2>Login to your Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    Email:
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                {/* <PasswordStrength /> */}

                <label htmlFor="">
                    Password
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </label>

                {<button>Login!</button>}
            </form>
        </div>
    )
}

export default Login
