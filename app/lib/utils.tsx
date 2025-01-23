import { getCurrentUser } from "@/app/api/v1.0/users/get-session"
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ServerStackIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"

export const getStatusClass = (status: string) => {
  switch (status) {
    case "queued":
      return "bg-sky-500"
    case "active":
    case "success":
      return "bg-green-500"
    case "failed":
    case "disconnected":
      return "bg-red-500"
    case "deregistered":
    case "canceled":
      return "bg-orange-500"
    default:
      return ""
  }
}

export const getStatusIcon = (status: string) => {
  return <div className={`h-2.5 w-2.5 rounded-full ${getStatusClass(status)} me-2`}></div>
}

export async function getSiteNavItems() {
  const user = getCurrentUser()
  const siteNav = [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Job",
      href: "/job",
      icon: DocumentDuplicateIcon,
    },
    {
      label: "Template",
      href: "/template",
      icon: DocumentDuplicateIcon,
    },
    {
      label: "Runner",
      href: "/runner",
      icon: ServerStackIcon,
    },
  ]

  if (user.role == "Admin") {
    siteNav.push({
      type: "accordion",
      label: "Admin",
      icon: Cog6ToothIcon,
      items: [
        {
          href: "/user",
          label: "User",
        },
        {
          href: "/settings",
          label: "Settings",
        },
      ],
    })

    return siteNav
  }
}
