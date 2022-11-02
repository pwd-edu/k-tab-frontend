import { Global } from "@mantine/core"
import nunito from "./assets/Nunito-VariableFont_wght.ttf"

export function MyGlobalStyles() {
    return (
        <Global
            styles={[
                {
                    "@font-face": {
                        fontFamily: "nunito",
                        src: `url('${nunito}') format("opentype")`,
                        fontWeight: 500,
                        fontStyle: "normal",
                    },
                },
            ]}
        />
    )
}
