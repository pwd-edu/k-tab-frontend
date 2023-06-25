import { useQuery } from "react-query"
import { request } from "../utils/axios-utils"

const fetchAuthorBooks = () => {
    return request({ url: "/home/" })
}

const useAuthorBooksData = () => {
    return useQuery(
        "author-books",
        fetchAuthorBooks
        // {
        //   onSuccess,
        //   onError
        // }
    )
}

export default useAuthorBooksData
