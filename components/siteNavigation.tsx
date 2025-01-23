import SideNav from "@/components/sideNav"
import {} from "@heroicons/react/24/outline"

export default async function SiteNavigation({ user }) {
  // const siteNav = await getSiteNavItems()

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

  // if (user.role == "Admin") {
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
  return (
    <>
      <SideNav links={siteNav} />
    </>
  )
}
