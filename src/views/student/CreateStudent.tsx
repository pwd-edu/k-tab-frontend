import { Text } from "@mantine/core"
import { Multiselect } from "multiselect-react-dropdown"
import { useState } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useNavigate } from "react-router-dom"

import { DISABILITIES, PORT } from "../../constants"

const CreateStudent = () => {
    const [studentFirstName, setFirstName] = useState("")
    const [studentSecondName, setSecondName] = useState("")
    const [studentEmail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [contact, setContact] = useState("")
    const [educationLevel, setEducationLevel] = useState("Collage")
    const [disabilityType, setDisabilityType] = useState(DISABILITIES)
    const [isPending, setIsPending] = useState(false)
    const [hasDisability, setHasDisability] = useState<boolean | null>(null)
    const backHistory = useNavigate()

    const str2bool = (value: string) => {
        if (value.toLowerCase() === "yes") return true
        if (value.toLowerCase() === "no") return false
        else return false
    }

    const handleDisabilityRadiobtn = (event: React.ChangeEvent<HTMLInputElement>) => {
        const boolValue = str2bool((event.target as HTMLInputElement).value)
        console.log(boolValue)
        setHasDisability(boolValue)
    }

    const [selectedOptions, setSelectedOptions] = useState([] as any)
    const [removedOptions, setRemovedOptions] = useState([] as any)

    const onSelectOptions = (selectedList: string[], selectedItem: string) => {
        setSelectedOptions([...selectedOptions, selectedItem])
    }
    const onRemoveOptions = (selectedList: string[], removedItem: string) => {
        setRemovedOptions([...removedOptions, removedItem])
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault() //prevents refresh
        const student = {
            studentName: studentFirstName + " " + studentSecondName,
            studentEmail: studentEmail,
            password: password,
            profilePhoto: profilePhoto,
            contact: contact,
            educationLevel: educationLevel,
            disabilityList: selectedOptions,
        }

        setIsPending(true)

        fetch(`http://localhost:${PORT}/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        }).then(() => {
            console.log(JSON.stringify(student))
            console.log("added new student")
        })
        setIsPending(false)
        backHistory("/")

        console.log(student)
    }

    return (
        <div className="create-user">
            <h2>
                <b>Student Sign Up!</b>
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    First Name
                    <input
                        type="text"
                        required
                        value={studentFirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Second Name
                    <input
                        type="text"
                        required
                        value={studentSecondName}
                        onChange={(e) => setSecondName(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Email
                    <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Password
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label htmlFor="">
                    Profile Picture URL
                    <input
                        type="text"
                        value={profilePhoto}
                        onChange={(e) => setProfilePhoto(e.target.value)}
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

                <label htmlFor="">
                    Educational Level
                    <select
                        name=""
                        id=""
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                    >
                        <option value="visual">High School</option>
                        <option value="sighted">Collage</option>
                    </select>
                </label>

                <Text>
                    Do you have any <span>disability</span>?
                </Text>
                <div>
                    <label htmlFor="yes">YES</label>
                    <input type="radio" name="dis" id="" onChange={handleDisabilityRadiobtn} />
                </div>
                <div>
                    <label htmlFor="no">NO</label>
                    <input type="radio" name="dis" id="" />
                </div>

                {/* <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </div> */}
                {hasDisability && (
                    <div>
                        <Multiselect
                            options={DISABILITIES}
                            onSelect={onSelectOptions}
                            onRemove={onRemoveOptions}
                            displayValue="name"
                            closeIcon="cancel"
                            placeholder="Select Options"
                            selectedValues={selectedOptions}
                        />
                    </div>
                )}

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

export default CreateStudent
