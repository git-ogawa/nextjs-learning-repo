import { Meta } from "@storybook/react"
import Accordion from "./accordion"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ServerStackIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"

export default {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    label: "Settings",
    Icon: Cog6ToothIcon,
    items: [
      {
        href: "/",
        label: "Settings",
      },
      {
        href: "/test",
        label: "test",
      },
    ],
  },
}
