import { CenteredLoading, ErrorPage } from "@components/shared"
import { RESOURCE_URL, StudentClient } from "@fetch/index"
import { Avatar, Button, Paper, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

interface StudentProfileProps {
    student_id: string
}

export function StudentProfile({ student_id }: StudentProfileProps) {
    const student_client = StudentClient()
    const { isLoading, data, isError } = useQuery(["student-profile"], () =>
        student_client.getProfile(student_id)
    )

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />

    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={RESOURCE_URL(data.profilePhotoPath)} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" weight={500} mt="md">
                {data.studentName}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
                {data.studentEmail} • {data.educationLevel}
            </Text>
            <Button variant="filled" fullWidth mt="md" color="blue">
                Follow
            </Button>
        </Paper>
    )
}
export default StudentProfile
