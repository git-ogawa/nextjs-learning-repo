"use client"
import { getCurrentUser } from "@/app/api/v1.0/users/get-session"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
    }
    fetchUser()
  }, [])

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
    <div className="bg-cyan-800 dark:bg-cyan-800">
      <button
        onClick={handleItemClick}
        className="flex w-max-48 items-center px-2 py-2 hover:bg-cyan-500"
        type="button"
        data-dropdown-toggle="dropdown"
      >
        <UserCircleIcon className="h-10 w-10 text-white" />
        <div className="px-2 text-xl dark:text-white">{currentUser?.name}</div>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed mt-1 w-48 rounded border border-gray-300 bg-white shadow-lg dark:bg-gray-700 dark:text-white"
        >
          <Link
            href={`/user/${currentUser?.id}/profile`}
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span>Profile</span>
          </Link>
          <button
            type="submit"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
