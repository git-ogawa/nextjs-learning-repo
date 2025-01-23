import { Meta } from "@storybook/react"
import SideNav from "./sideNav"
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { HomeModernIcon } from "@heroicons/react/24/solid"

export default {
  title: "SideNav",
  component: SideNav,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    links: [
      { label: "Home", href: "/", icon: HomeModernIcon },
      { label: "User", href: "/about", icon: UserGroupIcon },
      { label: "Services", href: "/services", icon: DocumentDuplicateIcon },
      { label: "Contact", href: "/contact", icon: HomeModernIcon },
      {
        type: "accordion",
        label: "Settings",
        icon: Cog6ToothIcon,
        items: [
          {
            href: "/",
            label: "users",
          },
          {
            href: "/site",
            label: "site",
          },
        ],
      },
    ],
  },
}

const siteNav = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: DocumentDuplicateIcon,
  },
]

export const Site = {
  args: {
    links: siteNav,
  },
}
