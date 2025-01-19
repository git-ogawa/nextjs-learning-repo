"use client"
import "@/components/ui/global.css"
import SideNav from "@/components/sideNav"
import { HomeIcon, DocumentDuplicateIcon, ServerStackIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import PageHeader from "@/components/pageHeader"
import { signOut } from "@/auth"
import { useRouter } from "next/router"

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
  {
    label: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <div className='flex h-screen flex-col dark:bg-gray-700'>
          <div className='flex-none bg-cyan-800 dark:bg-cyan-800 py-4'>
            <PageHeader icon={HomeIcon} />
          </div>
          <div className='flex flex-grow'>
            <div className='flex-none w-64'>
              <SideNav links={siteNav} />
            </div>

            <div className='flex-grow overflow-auto dark:bg-gray-800'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
