"use client"
import { getJob } from "@/app/api/job"
import { store } from "@/app/lib/store"
import { notFound } from "next/navigation"
import { Provider } from "react-redux"
import JobDetail from "./detail"

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
