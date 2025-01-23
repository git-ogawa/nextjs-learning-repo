"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import {
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"

import Link from "next/link"
import type {} from "react"

export interface AccordionProps {
  label: string
  Icon?: string
  items: ItemProps[]
}

export interface ItemProps {
  href: string
  label: string
}

const iconMap = {
  HomeIcon,
  DocumentDuplicateIcon,
  ServerStackIcon,
  Cog6ToothIcon,
}

export default function Accordion({
  label,
  icon,
  items,
  maxHight = "max-h-[128px]",
}: AccordionProps) {
  const IconComponent = iconMap[icon]

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggleOpen}
        className="flex h-[48px] w-full items-center justify-between px-3 py-2 text-white focus:outline-none dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        <div className="flex items-center gap-2 text-sm">
          {IconComponent && <IconComponent className="w-6" />} {label}
        </div>
        <ChevronRightIcon
          className={`h-5 w-5 transform items-center transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden bg-gray-100 transition-[max-height] duration-200 ease-in-out dark:bg-gray-700 ${
          isOpen ? maxHight : "max-h-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="item-center flex h-[40px] justify-center gap-2 border-gray-300 bg-gray-50 text-gray-900 hover:bg-sky-100 focus:border-blue-500 focus:ring-blue-500 md:flex-none md:justify-start md:p-2 md:px-3 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:border-blue-500"
          >
            <div className="flex items-center gap-2 text-sm">
              {/* empty space to align text  */}
              <div className="w-6" />
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
