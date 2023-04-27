import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Multiselect } from 'multiselect-react-dropdown';
import { disabilityOptions } from './Disabilities';
import { PORT } from "./constants"

const CreateStudent = () => {



    const [studentFirstName, setFirstName] = useState('');
    const [studentSecondName, setSecondName] = useState('');
    const [studentEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [contact, setContact] = useState('');
    const [educationLevel, setEducationLevel] = useState('Collage');
    const [disabilityType, setDisabilityType] = useState(disabilityOptions)
    const [isPending, setIsPending] = useState(false);
    const [hasDisability, setHasDisability] = useState<boolean | null>(null);
    const backHistory = useNavigate();

    var str2bool = (value: string) => {
        
        if (value.toLowerCase() === "yes") return true;
        if (value.toLowerCase() === "no") return false;
        else return false;

    }

    const handleDisabilityRadiobtn = (event: React.ChangeEvent<HTMLInputElement>) => {
        var boolValue = str2bool((event.target as HTMLInputElement).value);
        console.log(boolValue);
        setHasDisability(boolValue);
    }

    // const [options] = useState(disabilityOptions)
    // type Option = {
    //     code: string;
    //     name: string;
    // }

    const [selectedOptions, setSelectedOptions] = useState([] as any);
    const [removedOptions, setRemovedOptions] = useState([] as any);

    const onSelectOptions = (selectedList: string[], selectedItem: string) => {
        setSelectedOptions([...selectedOptions, selectedItem]);
    };
    const onRemoveOptions = (selectedList: string[], removedItem: string) => {
        setRemovedOptions([...removedOptions, removedItem]);
    };




    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); //prevents refresh
        const student = {
            studentName: studentFirstName + " " + studentSecondName,
            studentEmail: studentEmail,
            password: password,
            profilePhoto: profilePhoto,
            contact: contact,
            educationLevel: educationLevel,
            disabilityList: selectedOptions
        };

        setIsPending(true);



        fetch(`http://localhost:${PORT}/student`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            }).then(() => {
                console.log(JSON.stringify(student))
                console.log("added new student")
            })
        setIsPending(false);
        backHistory("/");

        console.log(student);
    }



    return (
        <div className="create-user">
            <h2>Student Sign Up!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">First Name</label>
                <input type="text"
                    required
                    value={studentFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="">Second Name</label>
                <input type="text"
                    required
                    value={studentSecondName}
                    onChange={(e) => setSecondName(e.target.value)} />
                <label htmlFor="">Email</label>
                <input type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="">Profile Picture URL</label>
                <input type="text"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                />

                <label htmlFor="">Phone Number</label>
                <input type="tel"
                    placeholder="20-100-645-0599"
                    pattern="[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{4}"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)} />

                <label htmlFor="">Educational Level</label>
                <select name="" id=""
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                >
                    <option value="visual">High School</option>
                    <option value="sighted">Collage</option>
                </select>

                <label htmlFor="">Do you have any <span>disability</span>?</label>
                <div>
                    <label htmlFor="yes">YES</label>
                    <input type="radio" name="dis" id=""
                    onChange= {handleDisabilityRadiobtn}
                    />
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
                {hasDisability && <div>
                    <Multiselect options={disabilityOptions}
                        onSelect={onSelectOptions}
                        onRemove={onRemoveOptions}
                        displayValue="name"
                        closeIcon="cancel"
                        placeholder="Select Options"
                        selectedValues={selectedOptions}
                    />
                </div>}

                <br />
                {!isPending && <button>Sign UP!</button>}
                {isPending && <button disabled>Adding info..</button>}

            </form>
        </div>
    );
}

export default CreateStudent;