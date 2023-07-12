import { Book } from "@fetch/types"

export const getChapterId = (
    chapter_num: string | undefined,
    book: Book | undefined
): string | undefined => {
    const chapter_idx = chapter_num ? Number(chapter_num) - 1 : 0
    const chapters_headers = book?.chapterHeaders.sort((a, b) => a.chapterOrder - b.chapterOrder)
    const curr_chapter = chapters_headers?.[chapter_idx]
    const chapter_id = curr_chapter?.chapterId
    return chapter_id
}

export const getChapterNum = (chapter_id: string, book: Book): string => {
    const chapter_idx = book?.chapterHeaders.findIndex((ch) => ch.chapterId === chapter_id)
    const chapter_num = chapter_idx ? chapter_idx + 1 : 1
    return chapter_num.toString()
}
