import { useAuthSession } from "@auth/useAuthSession"

interface RouterMapperElement {
    roles: string[]
    element: JSX.Element
}

interface RouterMapperProps {
    map: RouterMapperElement[]
}

export const CommonRouteMapper = ({ map }: RouterMapperProps) => {
    const { user } = useAuthSession()

    const renderElement = () => {
        for (const val of map) {
            if (val.roles.includes(user?.userType as string)) {
                return val.element
            }
        }
        return null
    }
    return renderElement()
}
