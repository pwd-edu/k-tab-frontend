import { Text, Button, Stack } from "@mantine/core"
import { Article, AddArticle } from "./Article"
import { Search } from "./Navbar"
import aofm from "./assets/aofm.jpg"

function App() {
    return (
        <div className="App">
            <div>
                <Article
                    title="The art of mathematics"
                    thumbnail_img={aofm}
                    last_update={new Date(Date.now())}
                />
            </div>
            <div>
                <AddArticle />
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}

export default App
