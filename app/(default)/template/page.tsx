"use client"

import React from "react"
import TemplateContent from "./templateContent"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"

export default function TemplatePage() {
  return (
    <Provider store={store}>
      <TemplateContent />
    </Provider>
  )
}
