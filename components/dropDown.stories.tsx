import { Meta } from "@storybook/react"
import DropDown from "./dropDown"

export default {
  title: "DropDown",
  component: DropDown,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    itemList: ["Edit", "Delete"],
    label: "text",
    onItemSelect: (item) => alert(`Select`),
  },
}

export const JobTableSearch = {
  args: {
    itemList: ["Job ID", "Status"],
    label: "Job ID",
  },
}
