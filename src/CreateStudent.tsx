const CreateStudent = () => {


    return (
        <div className="create-student">
            <h2>Student Sign Up!</h2>
            <form>
                <label htmlFor="">First Name:</label>
                <input type="text"
                    required />
                <label htmlFor="">Second Name:</label>
                <input type="text"
                    required />
                <label htmlFor="">Email:</label>
                <input type="email"
                    required />
                <button>Sign UP!</button>
            </form>
        </div>
    );
}

export default CreateStudent;