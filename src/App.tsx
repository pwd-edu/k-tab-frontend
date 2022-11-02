import { Text, Button, Stack } from "@mantine/core"
import { Article } from "./Article"
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
        </div>
    )
}

export default App
