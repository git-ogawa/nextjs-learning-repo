import {
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import type {} from "react"

export interface SideNavItemProps {
  label: string
  href: string
  icon?: string
}

const iconMap = {
  HomeIcon,
  DocumentDuplicateIcon,
  ServerStackIcon,
  Cog6ToothIcon,
}

export default function SideNavItem({ label, href, icon }: SideNavItemProps) {
  const IconComponent = iconMap[icon]

  return (
    <div>
      <Link
        key={label}
        href={href}
        className={clsx(
          "flex h-[48px] grow items-center justify-center gap-2 border-gray-300 bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 focus:border-blue-500 focus:ring-blue-500 md:flex-none md:justify-start md:p-2 md:px-3 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:bg-gray-600 dark:focus:border-blue-500",
        )}
      >
        {IconComponent && <IconComponent className="w-6" />}
        <p className="hidden md:block">{label}</p>
      </Link>
    </div>
  )
}
