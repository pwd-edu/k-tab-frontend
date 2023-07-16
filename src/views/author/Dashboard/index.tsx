import { CenteredLoading, ErrorPage } from "@components/shared"
import { AuthorClient } from "@fetch/index"
import { Group, Paper } from "@mantine/core"
import { useQueries } from "@tanstack/react-query"
import "chart.js/auto"
import { useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2"

import { booksData } from "./DummyData"
import { StatsRing } from "./Stats"

export const Dashboard = () => {
    const author_client = AuthorClient()

    const [topBooksQuery, disabilitiesPercentageQuery] = useQueries({
        queries: [
            {
                queryKey: ["top-books"],
                queryFn: () => author_client.getTopThreeBookViews(),
            },
            {
                queryKey: ["disabilities-distribution"],
                queryFn: () => author_client.getStudentsDisabilitesDistribution(),
            },
        ],
    })

    const [bookBarData, setBookbarData] = useState({
        labels: topBooksQuery.data?.map((data) => data.bookId),
        datasets: [
            {
                label: "Total No of Students",
                data: topBooksQuery.data?.map((data) => data.numberOfStudents),
                backgroundColor: ["#228BE6"],
                borderColor: ["#228BE6"],
                borderWidth: 1,
            },
        ],
    })

    const [disabilitiesChartData, setDisabilitiesChartData] = useState({
        labels: disabilitiesPercentageQuery.data?.map((data) => data.disabilityName),
        datasets: [
            {
                label: "Disabilities distribution in all books",
                data: disabilitiesPercentageQuery.data?.map((data) => data.studentsPercentage),
                backgroundColor: ["#FD7E14", "#228BE6", "#0CA678", "#AE3EC9"],
                borderColor: ["#CED4DA"],
                borderWidth: 1,
                color: "#666",
            },
        ],
    })

    const [,] = useState({
        labels: disabilitiesPercentageQuery.data?.map((data) => data.disabilityName),
        datasets: [
            {
                label: "Disabilities distribution in all books",
                data: disabilitiesPercentageQuery.data?.map((data) => data.studentsPercentage),
                backgroundColor: ["#FD7E14", "#228BE6", "#0CA678", "#AE3EC9"],
                borderColor: ["#CED4DA"],
                borderWidth: 1,
                color: "#666",
            },
        ],
    })

    if (topBooksQuery.isLoading || disabilitiesPercentageQuery.isLoading) return <CenteredLoading />
    if (topBooksQuery.isError || disabilitiesPercentageQuery.isError) return <ErrorPage />

    return (
        <>
            <Group p="md" spacing="lg">
                <StatsRing
                    data={[
                        {
                            label: "Book views",
                            stats: "45",
                            progress: 45,
                            color: "teal",
                            icon: "up",
                        },
                        {
                            label: "New Readers",
                            stats: "3",
                            progress: 3,
                            color: "blue",
                            icon: "up",
                        },
                        // {
                        //     label: "Orders",
                        //     stats: "4,735",
                        //     progress: 52,
                        //     color: "red",
                        //     icon: "down",
                        // },
                    ]}
                />
                <Paper
                    withBorder
                    radius="md"
                    p="xs"
                    sx={{ width: 900, height: 450, marginBlock: 100 }}
                >
                    {" "}
                    <Bar data={bookBarData} />
                </Paper>

                <Paper withBorder radius="md" p="xs" sx={{ width: 500, height: 450 }}>
                    <Pie data={disabilitiesChartData} />
                </Paper>
            </Group>
        </>
    )
}

export default Dashboard
