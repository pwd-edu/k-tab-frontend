import "chart.js/auto"
import { useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2"

import { UserData } from "./DummyData"

export const Dashboard = () => {
    const [bookBarData, setBookbarData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Views of each book todays",
                data: UserData.map((data) => data.userGain),
                backgroundColor: ["rgb(153, 102, 255)"],
                borderColor: ["rgb(153, 102, 255)"],
                borderWidth: 1,
            },
        ],
    })

    return (
        <>
            <div>
                <div style={{ width: 700 }}>
                    <Bar data={bookBarData} />
                </div>

                <div style={{ width: 700 }}>
                    <Pie data={bookBarData} />
                </div>
                <div style={{ width: 700 }}>
                    <Line data={bookBarData} />
                </div>
            </div>
        </>
    )
}

export default Dashboard
