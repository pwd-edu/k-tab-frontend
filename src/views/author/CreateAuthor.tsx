import { Button, FileButton, Group, Text } from "@mantine/core"
import axios from "axios"
import { FC, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useNavigate } from "react-router-dom"
import { Flip, ToastContainer, toast } from "react-toastify"

import { PORT } from "../../constants"

const CreateAuthor = () => {
    const [authorFirstName, setFirstName] = useState("")
    const [authorSecondName, setSecondName] = useState("")
    const [authorEmail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>() //useState<File | null>(null);
    const [profilePhotoBase64, setProfilePhotoBase64] = useState("")
    const [contact, setContact] = useState("")
    const [isPending, setIsPending] = useState(false)
    const backHistory = useNavigate()
    const resetRef = useRef<() => void>(null)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault() //prevents refresh

        const author = {
            authorName: authorFirstName + " " + authorSecondName,
            authorEmail: authorEmail,
            password: password,
            profilePhotoAsBinaryString: profilePhotoBase64,
            contact: contact,
        }

        setIsPending(true)

        // const response = fetch(`http://localhost:${PORT}/author/signup/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(author),
        // }).then(() => {
        //     console.log(JSON.stringify(author))
        //     console.log("added new author")
        //     console.log()

        // })

        // setIsPending(false)
        // backHistory("/")

        // console.log(author)
        // console.log(JSON.stringify(response))

        console.log(JSON.stringify(author))
        axios
            .post(`http://localhost:${PORT}/author/signup/`, author)
            .then(function (response) {
                console.log(JSON.stringify(author))
                console.log(response.data)
                setTimeout(() => {
                    backHistory("/login")
                }, 3000)
            })

            .catch(function (error) {
                console.log(error)
            })

        setIsPending(false)
    }

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     reset,
    //     formState: { errors },
    // } = useForm();
    // const submitData = () => {

    //     const author = {
    //         authorName: authorFirstName + " " + authorSecondName,
    //         authorEmail: authorEmail,
    //         password: password,
    //         profilePhotoAsBinaryString: profilePhotoBase64,
    //         contact: contact,
    //     }
    //     console.log(author);
    //     console.log(JSON.stringify(author))
    //     axios
    //         .post(`http://localhost:${PORT}/author/signup/`, JSON.stringify(author))
    //         .then(function (response) {
    //             // toast.success(response.data.message, {
    //             //     position: "top-right",
    //             //     autoClose: 3000,
    //             //     hideProgressBar: true,
    //             //     closeOnClick: true,
    //             //     pauseOnHover: true,
    //             //     draggable: false,
    //             //     progress: 0,
    //             //     toastId: "my_toast",
    //             // });

    //             console.log(JSON.stringify(author))
    //             console.log(response.data)
    //             reset();
    //             setTimeout(() => {
    //                 backHistory("/")
    //             }, 3000);
    //         })

    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const clearFile = () => {
        setProfilePhotoFile(null)
        resetRef.current?.()
    }

    const handleUploadPicture = (e: { preventDefault: () => void }) => {
        let document = ""
        const reader = new FileReader()
        const blobFile = profilePhotoFile as Blob
        reader.readAsDataURL(blobFile)
        reader.onload = function () {
            document = reader.result as string
            const base64String = document.replace("data:", "").replace(/^.+,/, "") as string
            setProfilePhotoBase64(base64String)
            console.log("onload base64String " + base64String)
            setProfilePhotoBase64(base64String)
        }
        reader.onerror = function (error) {
            console.log("Error: ", error)
            return "error"
        }
    }

    return (
        <div className="create-user">
            <h2>
                <b>Author Sign Up!</b>
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    First Name
                    <input
                        type="text"
                        required
                        value={authorFirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        // {...register("firstname", {
                        //     required: "Firstname is required!",
                        // })}
                    />
                </label>
                <label htmlFor="">
                    Second Name
                    <input
                        type="text"
                        required
                        value={authorSecondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        // {...register("lastname", {
                        //     required: "Lastname is required!",
                        // })}
                    />
                </label>
                <label htmlFor="">
                    Email
                    <input
                        type="email"
                        required
                        value={authorEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        // {...register("email", { required: "Email is required!" })}
                    />
                </label>

                <label htmlFor="">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // {...register("password", { required: "password is required!" })}
                    />
                </label>

                <Text>Phone Number</Text>
                <PhoneInput
                    enableAreaCodes={true}
                    country={"eg"}
                    value={contact}
                    onChange={(contact) => setContact(contact)}
                />

                <br></br>

                <>
                    <Group position="center">
                        <FileButton
                            resetRef={resetRef}
                            onChange={setProfilePhotoFile}
                            accept="image/png,image/jpeg"
                        >
                            {(props) => <Button {...props}>Upload image</Button>}
                        </FileButton>
                        <Button
                            disabled={!profilePhotoFile}
                            color="red"
                            onClick={clearFile}
                            size="xs"
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={!profilePhotoFile}
                            color="green"
                            onClick={handleUploadPicture}
                            size="xs"
                        >
                            Verify
                        </Button>
                    </Group>

                    {profilePhotoFile && (
                        <Text size="sm" align="center" mt="sm">
                            Picked file: {profilePhotoFile.name}
                        </Text>
                    )}
                </>
                <br />

                {!isPending && (
                    <button>
                        <b>Sign UP!</b>
                    </button>
                )}
                {isPending && <button disabled>Adding info..</button>}
            </form>
        </div>
    )
}

export default CreateAuthor
