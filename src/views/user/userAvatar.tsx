import { CenteredLoading, ErrorPage } from "@components/shared"
import { RESOURCE_URL, UserClient } from "@fetch/index"
import { Avatar, Group, Text, createStyles } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

const useStyles = createStyles((theme) => ({
    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.colors.blue[6],
    },
}))

type AvatarProps = {
    userId: string
}

export function UserAvatar({ userId }: AvatarProps) {
    const { classes } = useStyles()

    console.log("user id " + userId)
    const user_client = UserClient()
    const userInfo = useQuery(["user-info"], () => user_client.get(userId))

    if (userInfo.isLoading) return <CenteredLoading />
    if (userInfo.isError) return <ErrorPage />

    return (
        <div>
            <Group noWrap spacing={"sm"}>
                <Avatar
                    src={RESOURCE_URL(userInfo.data.profilePhotoPath)}
                    alt={userInfo.data?.userName}
                    radius="md"
                    size={46}
                    // mt="md"
                />
                <Text fz="lg" fw={700} className={classes.name} mt="-xs">
                    {userInfo.data.userName}
                </Text>
            </Group>
        </div>
    )
}
