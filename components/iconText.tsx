"use client"
import Icon from "./Icon"
import SubMenu from "./subMenu"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React, { useState, useEffect, useRef } from "react"

type ButtonWithIconProps = {
  icon: string
  text: stringz
  subMenuItems: string[]
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ icon, text, subMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  const IconComponent = icon === "UserCircleIcon" ? UserCircleIcon : null

  const handleItemClick = () => {
    setIsOpen(true)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="absolute flex-none">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover flex items-center hover:border-gray-300 focus:border focus:border-gray-300"
        type="button"
        data-dropdown-toggle="dropdown"
      >
        {IconComponent && <IconComponent className="h-10 w-10 text-white" />}
        <div className="px-2 text-xl dark:text-white">{text}</div>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed mt-1 w-48 rounded border border-gray-300 bg-white shadow-lg dark:bg-gray-700 dark:text-white"
        >
          {subMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ButtonWithIcon
