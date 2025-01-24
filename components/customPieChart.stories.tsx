import { exampleJobList } from "@/app/mock/job"
import {} from "@heroicons/react/24/outline"
import type { Meta } from "@storybook/react"
import CustomPieChart from "./customPieChart"

export default {
  title: "CustomPieChart",
  component: CustomPieChart,
  tags: ["autodocs"],
} as Meta

function calculateJobStatusTotals(jobList: Job[]) {
  const statusTotals = jobList.reduce(
    (acc, job) => {
      if (acc[job.status]) {
        acc[job.status] += 1
      } else {
        acc[job.status] = 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(statusTotals).map(([name, total]) => ({
    name,
    total,
  }))

  return data
}

const jobs = calculateJobStatusTotals(exampleJobList)

export const Default = {
  args: {
    data: jobs,
  },
}
