import { Avatar, Button, Paper, Text } from "@mantine/core"

interface UserInfoActionProps {
    profilephoto_url: string
    name: string
    email: string
    bio: string
}

export function UserInfoAction({ profilephoto_url, name, email, bio }: UserInfoActionProps) {
    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={profilephoto_url} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" weight={500} mt="md">
                {name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
                {email} • {bio}
            </Text>

            <Button variant="default" fullWidth mt="md">
                Follow
            </Button>
        </Paper>
    )
}
export default UserInfoAction
