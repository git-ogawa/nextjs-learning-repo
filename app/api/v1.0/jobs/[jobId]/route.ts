import { NextRequest } from "next/server"
import { cancelJob } from "@/app/api/v1.0/jobs/route"
import { APISuccessResponse, APIErrorResponse } from "@/app/types/api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const userId = Number((await params).id)

  const user = (await getUser(userId)) || {}
  return Response.json(user)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: number }> },
) {
  const jobId = Number((await params).jobId)

  const job = (await cancelJob(jobId)) || {}
  return Response.json(job)
}
