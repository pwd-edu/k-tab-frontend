import { CenteredLoading, ErrorPage } from "@components/shared"
import { UserClient } from "@fetch/index"
import { useQuery } from "@tanstack/react-query"

import AuthorProfile from "../author/AuthorProfile"
import StudentProfile from "../student/StudentProfile"

export function UserProfile({ user_id }: { user_id: string }) {
    const user_client = UserClient()
    const user = useQuery(["user-type"], () => user_client.get(user_id))

    if (user.isLoading) return <CenteredLoading />
    if (user.isError) return <ErrorPage />

    if (user.data.userType === "STUDENT") {
        return <StudentProfile student_id={user_id} />
    } else {
        return <AuthorProfile author_id={user_id} />
    }
}
