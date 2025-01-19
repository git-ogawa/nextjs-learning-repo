import React from "react"
import TemplateDetail from "./detail"
import { notFound } from "next/navigation"
import { getTemplate } from "@/app/api/template"

export default async function TemplateDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params

  const targetTemplate = await getTemplate(name)

  if (!targetTemplate) {
    notFound()
  }

  return (
    <div>
      <TemplateDetail template={targetTemplate} />
    </div>
  )
}
