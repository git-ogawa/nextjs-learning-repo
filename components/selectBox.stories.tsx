import { Meta } from "@storybook/react"
import SelectBox from "./selectBox"

export default {
  title: "SelectBox",
  component: SelectBox,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    defaultValue: "Create",
    options: ["Create", "Edit", "Delete"],
  },
}

export const AlertOnChange = {
  args: {
    defaultValue: "Create",
    options: ["Create", "Edit", "Delete"],
    onChange: (event) => alert(`Selected: ${event.target.value}`),
  },
}
