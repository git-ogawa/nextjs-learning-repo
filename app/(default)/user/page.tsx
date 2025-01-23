"use client"
import React from "react"
import UserContent from "./userContent"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"
import { listUser } from "@/app/api/v1.0/users/route"
import { getCurrentUser } from "@/app/api/v1.0/users/get-session"
import { forbidden } from "next/navigation"
import userStoreProvider from "./userProvider"

export default async function UserPage() {
  // const user = await getCurrentUser()
  // if (user.role !== "Admin") {
  //   forbidden()
  // }

  return (
    <Provider store={store}>
      <UserContent />
    </Provider>
  )
}
