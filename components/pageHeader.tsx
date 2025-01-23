"use client"

import { signOut } from "@/auth"
import { auth } from "@/auth"
import { GithubIcon } from "@/components/ui/icon"
import ProjectLogoSmall from "@/public/logo-tmp-128x128.png"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "./header"
import Icon from "./icon"
import IconText from "./iconText"
import SubMenu from "./subMenu"
import UserProfile from "./userProfile"

export type PageHeaderProps = {
  bgColor: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default async function PageHeader({ bgColor = "", icon }: PageHeaderProps) {
  const IconComponent = icon === "UserCircleIcon" ? UserCircleIcon : null

  return (
    <div className="relative h-full">
      <Header bgColor={bgColor} />
      <div className="absolute inset-0 flex items-center">
        <div className="h-full w-1/5 overflow-hidden">
          <Image
            src={ProjectLogoSmall}
            width={128}
            height={128}
            alt="project logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex w-2/5 items-center" />
        <div className="flex w-2/5">
          <div className="flex items-center ml-auto">
            <Link
              href="https://github.com/git-ogawa/nextjs-learning-repo"
              className="flex items-center dark:text-white"
            >
              <GithubIcon className="h-10 w-10 " />
            </Link>
          </div>

          <div className="flex max-w-60 items-center px-10">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  )
}
