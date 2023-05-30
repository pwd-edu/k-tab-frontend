import { ComponentStory, ComponentMeta } from "@storybook/react"

import { InsertImagePlaceHolder } from "../editor/ImagePlaceHolder"

export default {
    title: "Example/InsertImagePlaceHolder",
    component: InsertImagePlaceHolder,
    argTypes: {},
} as ComponentMeta<typeof InsertImagePlaceHolder>

const Template: ComponentStory<typeof InsertImagePlaceHolder> = () => (
    <InsertImagePlaceHolder onUpload={(files) => console.log(files)} />
)

export const Primary = Template.bind({})
Primary.args = {}
