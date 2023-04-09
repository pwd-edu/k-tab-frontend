import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {PORT} from "./constants"

const CreateStudent = () => {
    const [studentFirstName, setFirstName] = useState('');
    const [studentSecondName, setSecondName] = useState('');
    const [studentEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [contact, setContact] = useState('');
    const [educationLevel, setEducationLevel] = useState('Collage');
    const [disability, setDisability] = useState('');
    const [disabilityType, setDisabilityType] = useState('visual');
    const [isPending, setIsPending] = useState(false);
    const backHistory = useNavigate();

    


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); //prevents refresh
        const student = { studentName: studentFirstName + " " + studentSecondName,
            studentEmail: studentEmail,
            password: password,
            profilePhoto: profilePhoto, 
            contact: contact,
            educationLevel: educationLevel
            // , disability: disability, disabilityType: disabilityType 
        };

        setIsPending(true);

        

        fetch(`http://localhost:${PORT}/student`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }).then(() =>{
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
                    onChange={(e) => setSecondName(e.target.value)}/>
                <label htmlFor="">Email</label>
                <input type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

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
                onChange={(e) => setContact(e.target.value)}/>

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
                    <input type="radio" name="dis" id="" value="yes" />
                </div>
                <div>
                    <label htmlFor="no">NO</label>
                    <input type="radio" name="dis" id="" value={disability} />
                </div>

                <label htmlFor="">Disability</label>
                <select name="" id=""
                    value={disabilityType}
                    onChange={(e) => setDisabilityType(e.target.value)}
                >
                    <option value="visual">Visually Impaired</option>
                    <option value="sighted">Partially Sighted</option>
                    <option value="dyslexic">Dyslexia</option>
                </select>

                {!isPending && <button>Sign UP!</button>}
                {isPending && <button disabled>Adding info..</button>}

            </form>
        </div>
    );
}

export default CreateStudent;