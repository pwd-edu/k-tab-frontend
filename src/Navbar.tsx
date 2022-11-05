import { createStyles, Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons"

const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        maxWidth: 215,
    },
}))

export const Search = () => {
    const { classes } = useStyles()
    return (
        <Input
            classNames={{ wrapper: classes.wrapper }}
            rightSection={<IconSearch color="#828282" />}
            placeholder="Search"
            radius="md"
            size="xs"
        />
    )
}
