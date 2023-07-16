import { RESOURCE_URL, UserClient } from "@fetch/index"
import { Avatar, Box, Group, Skeleton, Text, createStyles } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

const useStyles = createStyles((theme, user_type: string | undefined) => ({
    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: user_type === "AUTHOR" ? theme.colors.blue[6] : theme.colors.red[6],
    },
}))

type CommentAvatarProps = {
    userId: string
    postedAt: string
}

export function CommentAvatar({ userId, postedAt }: CommentAvatarProps) {
    const user_client = UserClient()
    const userInfo = useQuery(["user-info", userId], () => user_client.get(userId))
    const { classes } = useStyles(userInfo.data?.userType)

    if (userInfo.isLoading) return <Skeleton variant="rect" height={40} width={40} radius="xl" />

    return (
        <Group>
            <Avatar
                src={RESOURCE_URL(userInfo.data?.profilePhotoPath || "")}
                alt={userInfo.data?.userName}
                radius="xl"
            />
            <Box>
                <Text className={classes.name} size="sm">
                    {userInfo.data?.userName}
                </Text>
                <Text size="xs" color="dimmed">
                    {postedAt}
                </Text>
            </Box>
        </Group>
    )
}
