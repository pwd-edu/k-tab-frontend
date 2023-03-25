

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
                <label htmlFor="">Do you have any <span>disability</span></label>
                <input type="radio" name="dis" id="" value="YES" />
                <input type="radio" name="dis" id="" value="NO" />

                <label htmlFor="">Disability</label>
                <select name="" id="">
                    <option value="visual">Visually Impaired</option>
                    <option value="sighted">Partially Sighted</option>
                    <option value="dyslexic">Dyslexia</option>
                </select>
                <button>Sign UP!</button>
            </form>
        </div>
    );
}

export default CreateStudent;