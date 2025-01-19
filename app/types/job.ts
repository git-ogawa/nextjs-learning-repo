export type Job = {
  id: string
  jobId: string
  createdAt: string
  updatedAt: string
  status: string
  template: string
  runner: string
  tags: map[]
}

export type JobList = Job[]

export type JobApiResponse = {
  status: "success" | "error"
  data: {
    title: string
    body: string
    [key: string]: string
  }
}

export type BackendJobApiCreateResponse = {
  status: "success" | "error"
  jobId: string
}

export type BackendJobApiCancelResponse = {
  status: "success" | "error"
}
