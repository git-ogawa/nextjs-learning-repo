import React from "react"
import { forbidden } from "next/navigation"
import { getCurrentUser } from "@/app/api/v1.0/users/get-session"

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (user.role !== "Admin") {
    forbidden()
  }

  return <h1 className="text-3xl dark:text-white"> settings page</h1>
}
