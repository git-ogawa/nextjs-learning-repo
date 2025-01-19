import React from "react"
import JobDetail from "./detail"
import { notFound } from "next/navigation"
import { getJob } from "@/app/api/job"

export default async function jobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params

  const targetjob = await getJob(jobId)

  if (!targetjob) {
    notFound()
  }

  return (
    <div>
      <JobDetail job={targetjob} />
    </div>
  )
}
