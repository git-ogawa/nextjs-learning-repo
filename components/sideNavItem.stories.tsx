import SideNavItem from "./sideNavItem"
import { HomeIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { Meta } from "@storybook/react"

export default {
  title: "SideNavItem",
  component: SideNavItem,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
}

export const Jobs = {
  args: {
    label: "Jobs",
    href: "/jobs",
    icon: DocumentDuplicateIcon,
  },
}
