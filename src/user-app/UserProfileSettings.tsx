import { useState, useEffect } from "react"
import { Avatar, Text } from "@mantine/core"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useNavigate } from "react-router-dom"
import { PORT } from "../constants"
import axios from "axios"

const ProfileSettings = () => {
    const [authorFirstName, setFirstName] = useState("")
    const [authorSecondName, setSecondName] = useState("")
    const [authorEmail, setEmail] = useState("")
    const [profilePhotoFileS3, setProfilePhotoFileS3] = useState("") //useState<File | null>(null);
    const [contact, setContact] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [user, setUser] = useState<UserProps>(Object)
    const backHistory = useNavigate()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault() //prevents refresh

        const author = {
            authorName: authorFirstName + " " + authorSecondName,
            authorEmail: authorEmail,
            // profilePhotoAsBinaryString: profilePhotoBase64,
            contact: contact,
        }

        setIsPending(true)

        const ID = "d52ce1e7-2ab4-4d0a-9b7f-e6b278fcafc6"

        fetch(`http://localhost:${PORT}/getauthor/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(author),
        }).then(() => {
            console.log(JSON.stringify(author))
            console.log("get author")
        })
        setIsPending(false)
        backHistory("/")

        console.log(author)
    }

    interface UserProps {
        name: string
        email: string
        contact: string
        profile_photo: string
    }

    const URL = `http://localhost:${PORT}/author/`

    const getUser = async () => {
        try {
            const fetchData = await axios.get(URL, {
                // headers: {
                //   authorization: 'Bearer JWT Token',
                // },
            })

            const authorId = fetchData.data.authorId
            //const chaptersTitles = fetchData.data.chaptersTitles;

            const authorData: UserProps = {
                name: fetchData.data.authorName,
                email: fetchData.data.authorEmail,
                contact: fetchData.data.contact,
                profile_photo: fetchData.data.profilePhotoPath,
            }
            setUser(authorData)
            console.log("user:" + user)
            console.log(authorData)
            console.log(fetchData.data)
            console.log("user mail: " + user.email)

            const fullName = authorData.name.split(" ")
            setFirstName(fullName[0])
            setSecondName(fullName[1])
            setContact(authorData.contact)
            setEmail(authorData.email)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener("load", getUser)
        return () => {
            window.removeEventListener("load", getUser)
        }
    }, [user])
    console.log("book:" + user)

    return (
        <div className="create-user">
            <form>
                <br></br>

                <Avatar src={profilePhotoFileS3} size={120} radius={120} mx="auto" />
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

                <Text>Phone Number</Text>
                <PhoneInput
                    enableAreaCodes={true}
                    country={"eg"}
                    value={contact}
                    onChange={(contact) => setContact(contact)}
                />

                <br />

                {!isPending && (
                    <button>
                        <b>Edit !</b>
                    </button>
                )}
                {isPending && <button disabled>Adding info..</button>}
            </form>
        </div>
    )
}

export default ProfileSettings
