import React from "react"
import Link from "next/link"

export type IconProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href?: string
  className?: string
  size: string
}

export default function Icon({ href, icon: Icon, size = "medium" }: IconProps) {
  let iconSize: string = "w-5 h-5"
  switch (size) {
    case "small":
      iconSize = "w-5 h-5"
      break
    case "medium":
      iconSize = "w-10 h-10"
      break
    case "large":
      iconSize = "w-12 h-12"
      break
    default:
      break
  }

  const iconClass: string = `inline-flex ${iconSize} block`

  return (
    <div>
      {href ? (
        <Link
          href={href}
          className='inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:bg-blue-100 dark:hover:bg-blue-200 dark:focus:ring-blue-300 item-center '
        >
          {Icon && <Icon className={iconClass} />}
        </Link>
      ) : (
        <div className='inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:bg-blue-100 dark:hover:bg-blue-200 dark:focus:ring-blue-300 item-center '>
          {Icon && <Icon className={iconClass} />}
        </div>
      )}
    </div>
  )
}
