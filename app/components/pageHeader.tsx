"use client"
import React, { useEffect, useState, useRef } from "react"
import Header from "./header"
import Icon from "./icon"
import IconText from "./iconText"
import { GithubIcon } from "@/components/ui/icon"
import Link from "next/link"
import { signOut } from "@/auth"
import SubMenu from "./subMenu"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export type pageHeaderProps = {
  bgColor: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function PageHeader({ bgColor = "", icon }: pageHeaderProps) {
  const [currentUser, setCurrentUser] = useState<User>()
  const router = useRouter()
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

  const handleSignOut = async () => {
    const csrfToken = await fetch("/api/auth/csrf")
      .then((res) => res.json())
      .then((data) => data.csrfToken)
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ csrfToken }),
    })
    router.push("/login")
  }

  return (
    <div className='relative'>
      <Header bgColor={bgColor} />
      <div className='absolute inset-0 flex justify-center items-center'>
        <div className='w-1/5 relative px-6 flex items-center dark:text-white text-2xl font-bold'>Job Runner</div>
        <div className='w-2/5  flex items-center'></div>
        <div className='w-2/5  flex'>
          <div className='w-2/3 flex  flex items-center justify-end right-1 space-x-5 px-6'>
            <Link href='https://github.com' className='dark:text-white w-10 h-10 inline-flex items-center justify-center'>
              <GithubIcon />
            </Link>
          </div>

          <div className='w-1/3 flex p-2 items-center justify-center'>
            <div className='absolute flex-none'>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className='flex items-center hover hover:border-gray-300 focus:border focus:border-gray-300'
                type='button'
                data-dropdown-toggle='dropdown'
              >
                <UserCircleIcon className='w-10 h-10 text-white' />
                <div className='dark:text-white text-xl px-2'>{currentUser?.name || "Username"}</div>
              </button>
              {isOpen && (
                <div ref={menuRef} className='fixed mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg dark:bg-gray-700 dark:text-white'>
                  <Link href='/user/profile' className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    <span>Profile</span>
                  </Link>
                  <form action={handleSignOut}>
                    <button type='submit' className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Logout
                    </button>
                  </form>
                </div>
              )}
            </div>
            {/* <IconText icon='UserCircleIcon' text={currentUser?.name || "Username"} subMenuItems={userMenu} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
