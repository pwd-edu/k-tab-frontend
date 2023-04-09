import { useState } from "react";
import axios from "axios"
import PORT from "./CreateStudent"

const Create = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const user = {email, password};

  

    // let data = {
    //     studentName: studentName,
    //     studentEmail: studentEmail
    //     // disability: disability,
    //     // disabilityType: disabilityType
    // };

    try {
            const response = await axios.post(`http://localhost:${PORT}/${type}`,
               JSON.stringify(data)
              , 
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              )
            
            console.log(response.data)
        } catch (e) {
            alert(e)
        }
  }

  return (
    <div className="create-student">
            <h2>Student Sign Up!</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="">Email:</label>
                <input type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                {<button>Login!</button>}
            </form>
        </div>
  );
}
 
export default Create;