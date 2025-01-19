import { Meta } from "@storybook/react"
import SearchBox from "./searchBox"

export default {
  title: "SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    itemList: ["Edit", "Delete"],
    label: "text",
  },
}

export const JobTableSearch = {
  args: {
    itemList: ["Job ID", "Status"],
  },
}
