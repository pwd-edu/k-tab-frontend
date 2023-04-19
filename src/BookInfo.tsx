import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {PORT} from "./constants"
import PersistentDrawerLeft from "./LessonsNavDrawer"


const BookInfo = () => {
    const [authorFirstName, setFirstName] = useState('');
    const [authorSecondName, setSecondName] = useState('');
    const [authorEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [contact, setContact] = useState('');
    const [isPending, setIsPending] = useState(false);
    const backHistory = useNavigate();

    


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); //prevents refresh
        const author = { authorName: authorFirstName + " " + authorSecondName,
            authorEmail: authorEmail,
            password: password,
            profilePhoto: profilePhoto, 
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



    return (
        <div>
            <PersistentDrawerLeft></PersistentDrawerLeft>
            <div className="create-user">
                <h2>author Sign Up!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">First Name</label>
                    <input type="text"
                        required
                        value={authorFirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                

                    {!isPending && <button>Sign UP!</button>}
                    {isPending && <button disabled>Adding info..</button>}

                </form>
            </div>
        </div>
    );
}

export default BookInfo;