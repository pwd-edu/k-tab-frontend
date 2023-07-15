import { CenteredLoading, ErrorPage } from "@components/shared"
import { UserClient } from "@fetch/index"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import AuthorProfile from "../author/AuthorProfile"
import StudentProfile from "../student/StudentProfile"

export function UserProfile() {
    const userId = useParams().userId
    const user_client = UserClient()
    const user = useQuery(["user-type"], () => user_client.get(userId))

    if (user.isLoading) return <CenteredLoading />
    if (user.isError) return <ErrorPage />

    if (user.data.userType === "STUDENT") {
        console.log("id: " + userId)
        return <StudentProfile student_id={userId ? userId : ""} />
    } else {
        console.log("id: " + userId)
        return <AuthorProfile author_id={userId ? userId : ""} />
    }
}
