"use client"
import { store } from "@/app/lib/store"
import { Provider } from "react-redux"
import UserContent from "./userContent"

export default function UserPage() {
  return (
    <Provider store={store}>
      <UserContent />
    </Provider>
  )
}
