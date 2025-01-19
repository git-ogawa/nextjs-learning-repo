"use client"

import React from "react"
import RunnerContent from "./runnerContent"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"

export default function RunnerPage() {
  return (
    <Provider store={store}>
      <RunnerContent />
    </Provider>
  )
}
