"use client"

import React from "react"
import JobDetail from "./detail"
import { notFound } from "next/navigation"
import { getJob } from "@/app/api/job"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"

export default async function jobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params

  const targetjob = await getJob(jobId)

  if (!targetjob) {
    notFound()
  }

  return (
    <Provider store={store}>
      <JobDetail job={targetjob} />
    </Provider>
  )
}
