import React from "react"
import { SideNavItemProps } from "./sideNavItem"
import SideNavItem from "./sideNavItem"

export interface SideNavProps {
  links: SideNavItemProps[]
}

export default function SideNav({ links }: SideNavProps) {
  return (
    <div>
      <div className='flex h-full flex-col px-3 py-4 md:px-2'>
        {links.map((link, index) => (
          <SideNavItem key={index} label={link.label} href={link.href} icon={link.icon} />
        ))}
      </div>
    </div>
  )
}
