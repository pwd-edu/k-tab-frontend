import { CenteredLoading, ErrorPage } from "@components/shared"
import { ChapterClient } from "@fetch/index"
import { Box, Text, Textarea, createStyles, rem } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { CommentAvatar } from "./userAvatar"

const useCommentStyles = createStyles((theme) => ({
    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
    },
}))

export function ChapterComments({ chapter_id }: { chapter_id: string }) {
    const chapter_client = ChapterClient()
    const { isLoading, data, isError } = useQuery(["comments"], () =>
        chapter_client.getChapterComments(chapter_id)
    )

    const queryClient = useQueryClient()
    const { mutate: addNewComment } = useMutation(async (comment: string) => {
        if (!chapter_id) return
        await chapter_client.postChapterComment(chapter_id, comment)
        queryClient.invalidateQueries({ queryKey: ["comments"] })
    }, {})

    if (isLoading) return <CenteredLoading />
    if (isError) return <ErrorPage />

    return (
        <Box>
            {data.map((comment, idx) => {
                return (
                    <ChapterComment
                        key={comment.commentId}
                        postedAt={comment.date}
                        body={comment.content}
                        author={{ authorId: comment.commenterId }}
                        lastComment={idx === data.length - 1}
                    />
                )
            })}

            <CommentInput
                onSend={(text) => {
                    addNewComment(text)
                }}
            />
        </Box>
    )
}

interface CommentSimpleProps {
    postedAt: string
    body: string
    author: {
        authorId: string
    }
    lastComment?: boolean
}

export function ChapterComment({ postedAt, body, author, lastComment }: CommentSimpleProps) {
    const { classes, cx } = useCommentStyles()
    return (
        <Box className={cx("py-4", !lastComment && "border-b border-gray-200")}>
            <CommentAvatar userId={author.authorId} postedAt={postedAt} />
            <Text className={classes.body} size="sm">
                {body}
            </Text>
        </Box>
    )
}

const CommentInput = ({ onSend }: { onSend: (text: string) => void }) => {
    const [text, setText] = useState<string>("")
    return (
        <Textarea
            placeholder="Leave a comment"
            value={text}
            onChange={(e) => {
                setText(e.target.value)
            }}
            onKeyUp={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                    onSend(text)
                    setText("")
                }
            }}
        />
    )
}
