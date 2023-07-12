import { CenteredLoading, ErrorPage } from "@components/shared"
import { ChapterClient } from "@fetch/index"
import { Divider, Group, Stack, Text, createStyles, rem } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

import { UserAvatar } from "./userAvatar"

const useStyles = createStyles((theme) => ({
    content: {
        paddingLeft: theme.spacing.sm,
    },
    meta: {
        paddingLeft: rem(57),
    },
}))

export function ChapterComments({ chapter_id }: { chapter_id: string }) {
    const { classes } = useStyles()

    const chapter_client = ChapterClient()
    const { isLoading, data, isError } = useQuery(["comments"], () =>
        chapter_client.getChapterComments(chapter_id)
    )

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />

    return (
        <div>
            {data.map((comment) => {
                {
                    console.log("id in comment" + comment.commenterId)
                }
                return (
                    <>
                        <Group key={comment.commentId}>
                            <Stack>
                                <Group noWrap>
                                    <Stack spacing={"xs"}>
                                        <UserAvatar userId={comment.commenterId} />
                                        <Text
                                            size="xs"
                                            color="dimmed"
                                            className={classes.meta}
                                            mt="-xl"
                                        >
                                            {comment.commenterType} • {comment.date}
                                        </Text>
                                    </Stack>
                                </Group>
                                <Text className={classes.content} fz="lg">
                                    {comment.content}
                                </Text>
                            </Stack>
                        </Group>

                        <Divider my="xs" />
                    </>
                )
            })}
        </div>
    )
}
