import { ComponentMeta, ComponentStory } from "@storybook/react"

import { InsertImagePlaceHolder } from "../views/author/editor/ImagePlaceHolder"

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
