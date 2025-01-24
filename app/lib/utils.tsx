import { getCurrentUser } from "@/app/api/v1.0/users/get-session"
import {
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline"

export const getStatusClass = (status: string): string => {
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

export const getStatusHexColor = (status: string): string => {
  switch (status) {
    case "queued":
      return "#0ea5e9"
    case "active":
    case "success":
      return "#22c55e"
    case "failed":
    case "disconnected":
      return "#ef4444"
    case "deregistered":
    case "canceled":
      return "#f97316"
    default:
      return ""
  }
}

export const getStatusIcon = (status: string) => {
  return <div className={`h-2.5 w-2.5 rounded-full ${getStatusClass(status)} me-2`} />
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

  if (user.role === "Admin") {
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

export const calculateStatusTotal = (data: Array) => {
  const statusTotals = data.reduce(
    (acc, d) => {
      if (acc[d.status]) {
        acc[d.status] += 1
      } else {
        acc[d.status] = 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const res = Object.entries(statusTotals).map(([name, total]) => ({
    name,
    total,
  }))

  return res
}
