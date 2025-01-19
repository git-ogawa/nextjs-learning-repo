import PageHeader from "./pageHeader"
import { HomeIcon } from "@heroicons/react/24/outline"

export default {
  component: PageHeader,
  title: "Page/PageHeader",
  tags: ["autodocs"],
}

export const Default = {
  args: {
    icon: HomeIcon,
    bgColor: "bg-blue-200",
  },
}
