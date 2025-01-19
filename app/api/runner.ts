import axios from "axios"
import { Runner, RunnerList } from "@/app/types/runner"
import { exampleRunnerList } from "@/app/mock/runner"

export async function listRunner(): Promise<RunnerList> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return exampleRunnerList
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/runner/list`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as Jobs
}

export async function deregisterRunner(runnerName: string[]): Promise<RunnerList> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return { status: "success", data: { title: "Success", body: "Runner has been deregistered." } }
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/runner/delete`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as Jobs
}

export async function getRunner(runnerName: string): Promise<Runner> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    const runner = exampleRunnerList.find((runner) => runner.runnerName === runnerName)
    return runner || null
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/template/list`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as Template
}
