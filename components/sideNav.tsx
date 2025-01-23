import { auth } from "@/auth"
import {} from "@heroicons/react/24/outline"
import Accordion from "./accordion"
import SideNavItem from "./sideNavItem"
export interface SideNavProps {
  links: SideNavLinkProps[]
}

export interface SideNavLinkProps {
  type: "link" | "accordion"
  label: string
  href?: string
  icon?: string
  items?: ItemProps[]
}

const checkItemType = (link: SideNavLinkProps, index: number): JSX.Element => {
  if (link.type === "accordion") {
    return <Accordion key={index} label={link.label} icon={link.icon} items={link.items} />
  }
  return <SideNavItem key={index} label={link.label} href={link.href} icon={link.icon} />
}

export default async function SideNav() {
  const session = await auth()
  const siteNav = [
    {
      label: "Home",
      href: "/",
      icon: "HomeIcon",
    },
    {
      label: "Job",
      href: "/job",
      icon: "DocumentDuplicateIcon",
    },
    {
      label: "Template",
      href: "/template",
      icon: "DocumentDuplicateIcon",
    },
    {
      label: "Runner",
      href: "/runner",
      icon: "ServerStackIcon",
    },
  ]

  if (session.user.role === "Admin") {
    siteNav.push({
      type: "accordion",
      label: "Admin",
      icon: "Cog6ToothIcon",
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
  }

  return (
    <div>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        {siteNav.map((link, index) => checkItemType(link, index))}
      </div>
    </div>
  )
}
