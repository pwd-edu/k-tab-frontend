import { useState,  useRef  } from "react";
import {useNavigate} from "react-router-dom"
import {PORT} from "./constants"
import UploadPictureButtons from "./ProfilePicUpload";


const CreateAuthor = () => {
    const [authorFirstName, setFirstName] = useState('');
    const [authorSecondName, setSecondName] = useState('');
    const [authorEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(); //useState<File | null>(null); 
    const [profilePhotoBase64, setProfilePhotoBase64] = useState('');
    const [contact, setContact] = useState('');
    const [isPending, setIsPending] = useState(false);
    const backHistory = useNavigate();
    const resetRef = useRef<() => void>(null);



    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); //prevents refresh

        // setProfilePhotoBase64(getBase64(profilePhotoFile));

        const author = { authorName: authorFirstName + " " + authorSecondName,
            authorEmail: authorEmail,
            password: password,
            profilePhoto: profilePhotoBase64, 
            contact: contact,
        };

        setIsPending(true);

        

        fetch(`http://localhost:${PORT}/author`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(author)
        }).then(() =>{
            console.log(JSON.stringify(author))
            console.log("added new author")
        })
        setIsPending(false);
        backHistory("/");

        console.log(author);
    }

    // const handleUploadPicture = (photo: File  | null) => {
    //     setProfilePhotoFile(photo);
    //     console.log(profilePhotoFile);
    //     setProfilePhotoBase64(getBase64(profilePhotoFile));
    //     console.log(profilePhotoBase64);

    // }

    const clearFile = () => {
        setProfilePhotoFile(null);
        resetRef.current?.();
      };
    
    const handleUploadPicture = (e: { preventDefault: () => void; }) => {
            e.preventDefault(); //prevents refresh
            console.log(profilePhotoFile);
            // setProfilePhotoBase64(getBase64(profilePhotoFile));
            console.log(profilePhotoBase64);

        }



    return (
        <div className="create-user">
            <h2>author Sign Up!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">First Name</label>
                <input type="text"
                    required
                    value={authorFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="">Second Name</label>
                <input type="text"
                    required 
                    value={authorSecondName}
                    onChange={(e) => setSecondName(e.target.value)}/>
                <label htmlFor="">Email</label>
                <input type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                
                <UploadPictureButtons/>
                

                <label htmlFor="">Phone Number</label>
                <input type="tel"
                placeholder="20-100-645-0599"
                pattern="[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{4}"
                value={contact}
                onChange={(e) => setContact(e.target.value)}/>

    
                {!isPending && <button>Sign UP!</button>}
                {isPending && <button disabled>Adding info..</button>}

            </form>
        </div>
    );
}

export default CreateAuthor;