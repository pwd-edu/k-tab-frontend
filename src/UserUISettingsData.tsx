import { useState, useEffect } from "react";
import { PORT } from "./constants"
import axios from "axios"
import UIsettings, { SwitchesCardProps } from "./UserUISettings";


const UserSettingsData = () =>{
const [data, setData] = useState<SwitchesCardProps>(Object)

const URL = `http://localhost:${PORT}/settings/`

const getSettings = async () => {
    try {
        const fetchData = await axios.get(URL, {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpYW1AZ21haWwuY29tIiwidXNlcklkIjoiZTdmZmZhMjctZTI5MC00NmQxLTkyN2UtYjY1N2Y3ZWYzNzg3IiwidXNlclR5cGUiOiJBRE1JTiIsImlhdCI6MTY4NDc3MTAxMywiZXhwIjoxNjg1OTE2MDAwfQ.9Yg1c2i5VDmx3PDDHEXCKVusDfGBz-0IzBcwTxex8iI"
            },
        })
        console.log(fetchData.data)

        setData(fetchData.data)
        console.log("data: " + data);

    } catch (error) {
        console.log(error)
    }
}


useEffect(() => {
    window.addEventListener('load', getSettings)
    return () => {
        window.removeEventListener('load', getSettings)
    }
}, [data])
console.log("settings:" + data);


return(
<UIsettings data={data}/>
)
}

export default UserSettingsData
