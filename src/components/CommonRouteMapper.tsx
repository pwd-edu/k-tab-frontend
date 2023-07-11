import { getUserType } from "@auth/helpers"

interface RouterMapperElement {
    roles: string[]
    element: JSX.Element
}

interface RouterMapperProps {
    map: RouterMapperElement[]
}

export const CommonRouteMapper = ({ map }: RouterMapperProps) => {
    const user_type = getUserType()

    const renderElement = () => {
        for (const val of map) {
            if (val.roles.includes(user_type as string)) {
                return val.element
            }
        }
        return null
    }
    return renderElement()
}
