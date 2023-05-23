import { useState, useEffect } from "react";
import { PORT } from "./constants"
import axios from "axios"
import UIsettings from "./UserUISettings";


const UserSettingsData = () => {
    const [data, setData] = useState([]);

    const URL = `http://localhost:${PORT}/settings/`

    const getSettings = async () => {
        try {
            const fetchData = await axios.get(URL, {
                headers: {
                    authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWhtb3VkQGdtYWlsLmNvbSIsInVzZXJJZCI6IjNmYzAzODI0LTZkOWMtNDllYS1iMThjLTE3NzkxMTkwM2FkNyIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2ODQ4NzI2MjAsImV4cCI6MTY4NjAwMjQwMH0.PlUnB2q1WHEny9pPkxlaE1zKAuMAo9KABgPMLMzH1qg"
                },
            })
            console.log(fetchData.data.settings)

            setData(fetchData.data.settings)
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


    return (
        <UIsettings data={data} />
    )
}

export default UserSettingsData
