import React from "react"
import RunnerDetail from "./detail"
import { notFound } from "next/navigation"
import { getRunner } from "@/app/api/runner"

export default async function runnerDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params

  const targetrunner = await getRunner(name)

  if (!targetrunner) {
    notFound()
  }

  return (
    <div>
      <RunnerDetail runner={targetrunner} />
    </div>
  )
}
