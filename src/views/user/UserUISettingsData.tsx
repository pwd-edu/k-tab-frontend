import axios from "axios"
import { useEffect, useState } from "react"

import { PORT } from "../../constants"
import UIsettings from "./UserUISettings"

const UserSettingsData = () => {
    const [data, setData] = useState([])

    const URL = `http://localhost:${PORT}/settings/`

    const getSettings = async () => {
        try {
            const fetchData = await axios.get(URL, {
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWhtb3VkQGdtYWlsLmNvbSIsInVzZXJJZCI6IjUyNDExOTdjLTViMmQtNGJkZS1hNDRjLTE3YWM0NTU1Zjc3YSIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2ODY5OTk1MTQsImV4cCI6MTY4ODE2MjQwMH0.gQPmaOQ_7chkhHR_fvpV-WJ5Qui33LeVSq_CiyVgDDQ",
                },
            })
            console.log(fetchData.data.settings)

            setData(fetchData.data.settings)
            console.log("data: " + data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener("load", getSettings)
        return () => {
            window.removeEventListener("load", getSettings)
        }
    }, [data])

    return <UIsettings data={data} />
}

export default UserSettingsData
