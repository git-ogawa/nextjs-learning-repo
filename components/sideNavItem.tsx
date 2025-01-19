import Link from "next/link"
import { SVGProps, ComponentType } from "react"
import clsx from "clsx"

export interface SideNavItemProps {
  label: string
  href: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export default function SideNavItem({ label, href, icon: Icon }: SideNavItemProps) {
  return (
    <div>
      <Link
        key={label}
        href={href}
        className={clsx(
          "flex h-[48px] grow items-center justify-center gap-2 text-gray-900 bg-gray-50 p-3 text-sm font-medium border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 hover:bg-sky-100 md:flex-none md:justify-start md:p-2 md:px-3 dark:hover:bg-gray-600",
        )}
      >
        {Icon && <Icon className='w-6' />}
        <p className='hidden md:block'>{label}</p>
      </Link>
    </div>
  )
}
