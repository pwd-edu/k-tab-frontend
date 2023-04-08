import { useState } from "react";
import axios from "axios"

const Create = () => {
    const [studentName, setName] = useState('');
    const [studentEmail, setEmail] = useState('');


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const blog = {studentName, studentEmail};

    // fetch('http://localhost:8080/students/', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog)
    // }).then(() => {
    //   console.log('new user!');
    // })

    let data = {
        studentName: studentName,
        studentEmail: studentEmail
        // disability: disability,
        // disabilityType: disabilityType
    };

    try {
            const response = await axios.post('http://localhost:8080/student',
               JSON.stringify(data)
              , 
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              
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
                <label htmlFor="">First Name:</label>
                <input type="text"
                    required
                    value={studentName}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="">Email:</label>
                <input type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {<button>Sign UP!</button>}
            </form>
        </div>
  );
}
 
export default Create;