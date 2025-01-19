import Icon from "./icon"
import { HomeIcon } from "@heroicons/react/24/outline"
import { GithubIcon } from "@/components/ui/icon"

export default {
  component: Icon,
  title: "Icon",
  tags: ["autodocs"],
}

export const Default = {
  args: {
    icon: HomeIcon,
    href: "/",
  },
}

export const Small = {
  args: {
    icon: HomeIcon,
    href: "/",
    size: "small",
  },
}

export const Medium = {
  args: {
    icon: HomeIcon,
    href: "/",
    size: "medium",
  },
}

export const Large = {
  args: {
    icon: HomeIcon,
    href: "/",
    size: "large",
  },
}

export const Github = {
  args: {
    icon: GithubIcon,
    href: "/",
    size: "large",
  },
}
