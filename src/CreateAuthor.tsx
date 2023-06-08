import { useState, useRef } from "react"
import { FileButton, Button, Group, Text } from "@mantine/core"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useNavigate } from "react-router-dom"
import { PORT } from "./constants"

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

        fetch(`http://localhost:${PORT}/author/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(author),
        }).then(() => {
            console.log(JSON.stringify(author))
            console.log("added new author")
        })
        setIsPending(false)
        backHistory("/")

        console.log(author)
    }

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
                    />
                </label>
                <label htmlFor="">
                    Second Name
                    <input
                        type="text"
                        required
                        value={authorSecondName}
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Email
                    <input
                        type="email"
                        required
                        value={authorEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
