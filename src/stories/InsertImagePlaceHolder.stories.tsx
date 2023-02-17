import { ComponentStory, ComponentMeta } from "@storybook/react"

import { InsertImagePlaceHolder } from "../ImagePlaceHolder"

export default {
    title: "Example/InsertImagePlaceHolder",
    component: InsertImagePlaceHolder,
    argTypes: {},
} as ComponentMeta<typeof InsertImagePlaceHolder>

const Template: ComponentStory<typeof InsertImagePlaceHolder> = () => <InsertImagePlaceHolder />

export const Primary = Template.bind({})
Primary.args = {}
