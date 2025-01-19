import axios from "axios"
import { JobList, JobApiResponse, BackendJobApiCreateResponse } from "@/app/types/job"
import { exampleJobList } from "@/app/mock/job"

export async function listJob(): Promise<JobList> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return exampleJobList
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/job/list`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as JobList
}

export async function postCreateJob(jobId: string): Promise<JobApiResponse> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return {
      status: "success",
      data: {
        title: "Job successfully created !",
        body: "Job ID: xxxx",
        jobId: "xxx",
      },
    }
  }

  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/job/create`)
  const data: BackendJobApiCreateResponse = response.data as BackendJobApiCreateResponse

  if (data.status !== "success") {
    return {
      status: "error",
      data: {
        title: "Job failed to create",
        body: "error message",
      },
    }
  }

  return {
    status: "success",
    data: {
      title: "Job successfully created !",
      body: `Job ID: ${data.jobId}`,
      jobId: data.jobId,
    },
  }
}

export async function postCancelJob(jobIds: string[]): Promise<JobApiResponse> {
  if (jobIds.length == 0) {
    return {
      status: "error",
      data: {
        title: "Failed to call API",
        body: "There are no job selected",
      },
    }
  }

  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return {
      status: "success",
      data: {
        title: "Successfully",
        body: `${jobIds.length} jobs have been cancelled`,
      },
    }
  }
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/jobs/cancel`,
    { job_ids: jobIds },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (response.status !== 200) {
    return {
      status: "error",
      data: {
        title: "api failed",
        body: `failed to cancel jobs`,
      },
    }
  }

  return {
    status: "success",
    data: {
      title: "Successfully",
      body: `${jobIds.length} jobs have been cancelled`,
    },
  }
}

export async function getJob(jobId: string): Promise<Job> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    const job = exampleJobList.find((job) => job.jobId === jobId)
    return job || null
  }

  // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/job`, {})

  // if (response.status !== 200) {
  //   throw new Error("Failed to fetch data")
  // }
  // return response.data
}
