"use client"
import { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"

type userStoreProvider = {
  children: ReactNode
}

export default function userStoreProvider({ children }: Readonly<userStoreProvider>) {
  export default function UserProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
}
