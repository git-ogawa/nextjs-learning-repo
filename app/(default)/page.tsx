import { listJob } from "@/app/api/job"
import { listRunner } from "@/app/api/runner"
import { listTemplate } from "@/app/api/template"
import { calculateStatusTotal } from "@/app/lib/utils"
import { auth } from "@/auth"
import CustomPieChart from "@/components/customPieChart"

export default async function Page() {
  const jobList = await listJob()
  const runnerList = await listRunner()
  const templateList = await listTemplate()

  const jobTotal = calculateStatusTotal(jobList)
  const runnerTotal = calculateStatusTotal(runnerList)

  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col px-12">
      <div className="bg-gray-800 py-6 text-white">
        <h2 className="flex py-6 font-bold text-3xl dark:text-white">
          Welcome {session.user.name}
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col rounded-lg border border-white px-6 py-10">
          <h2 className="flex font-bold text-3xl dark:text-white">Job</h2>
          <CustomPieChart data={jobTotal} />
        </div>
        <div className="flex flex-col rounded-lg border border-white px-6 py-10">
          <h2 className="flex font-bold text-3xl dark:text-white">Runner</h2>
          <CustomPieChart data={runnerTotal} />
        </div>
        <div className="flex flex-col rounded-lg border border-white px-6 py-10">
          <h2 className="flex font-bold text-3xl dark:text-white">Template</h2>
          <h3 className="flex mt-2 text-3xl dark:text-white">
            Total template: {templateList.length}
          </h3>
        </div>
      </div>
    </main>
  )
}
