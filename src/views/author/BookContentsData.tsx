import axios from "axios"
import { useEffect, useState } from "react"

import { PORT } from "../../constants"
import TableOfContents from "./BookContents"

interface Chapter {
    chapterId: string
    title?: string
    readingDuration?: number
    tags?: []
    order?: number
}

const TableOfContentsData = () => {
    const [bookChapters, setBookChapters] = useState([])
    const [chapterId, setChapterId] = useState("")

    const bookId = "9c92b5c2-afe2-40c5-972d-061ab20380a2"

    const API_URL = `http://localhost:${PORT}/book/?bookId=${bookId}`

    const getChapterTitles = async () => {
        try {
            const fetchData = await axios.get(API_URL, {
                // headers: {
                //     authorization:
                //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWhtb3Vkc2FsZWVtNTIyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImFmZjViYTVjLTY4YmYtNGNjNi05NzBlLTYyNzM1ZWEwYWJhZCIsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2ODgwNjk2NTUsImV4cCI6MTY4OTE5OTIwMH0.RpsY7ePqjIs3czsIdosCYps2jVlt5OJoNxRGb0dqYBM",
                // },
            })
            console.log(fetchData.data.chaptersTitles)

            setBookChapters(fetchData.data.chaptersTitles)
            console.log("data: " + bookChapters)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener("load", getChapterTitles)
        return () => {
            window.removeEventListener("load", getChapterTitles)
        }
    }, [bookChapters])
    console.log("settings:" + bookChapters)

    const updateChapter = ({ chapterId, title, readingDuration, tags, order }: Chapter) => {
        axios.put(API_URL, {
            chapterId: chapterId,
            title: title,
            readingDuration: readingDuration,
            tags: tags,
            order: order,
        })
    }

    return <TableOfContents chapters={bookChapters} active={""} />
}

export default TableOfContentsData
