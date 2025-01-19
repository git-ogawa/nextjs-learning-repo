"use client"

import React from "react"
import JobContent from "./jobContent"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"

export default function JobsPage() {
  return (
    <Provider store={store}>
      <JobContent />
    </Provider>
  )
}
