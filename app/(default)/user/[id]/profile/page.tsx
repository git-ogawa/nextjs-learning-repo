import React from "react"
import UserProfileContent from "./userProfileContent"
import { notFound } from "next/navigation"
import { getUser } from "@/app/api/v1.0/users/route"

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await getUser(Number(id))

  if (!user) {
    notFound()
  }

  return <UserProfileContent user={user} />
}
