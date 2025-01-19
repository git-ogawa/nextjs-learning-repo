import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import { listJob } from "@/app/api/job"
import { listTemplate } from "@/app/api/template"
import { listRunner } from "@/app/api/runner"

export default async function Page() {
  // const jobs = fetchData()
  const jobList = await listJob()
  const runnerList = await listRunner()
  const templateList = await listTemplate()

  return (
    <main className='flex min-h-screen flex-col px-12'>
      <div className='py-6 bg-gray-800 text-white'>
        <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Welcome Username</h2>
      </div>

      <div className='mt-4 flex flex-col gap-4 md:flex-row dark:text-white'>
        <div className='flex flex-col gap-6 rounded-lg py-10 md:w-2/5 md:px-20 border border-white'>
          <div className='basis-1/3'>
            <h2 className='flex text-3xl font-bold'>Job</h2>
          </div>
          <div className='basis-2/3'>
            <h3 className='flex text-3xl '>Total job: {jobList.length}</h3>
          </div>
        </div>
        <div className='flex flex-col gap-6 rounded-lg py-10 md:w-2/5 md:px-20 border border-white'>
          <div className='basis-1/3'>
            <h2 className='flex text-3xl font-bold'>Template</h2>
          </div>
          <div className='basis-2/3'>
            <h3 className='flex text-3xl '>Total template: {templateList.length}</h3>
          </div>
        </div>
        <div className='flex flex-col gap-6 rounded-lg py-10 md:w-2/5 md:px-20 border border-white'>
          <div className='basis-1/3'>
            <h2 className='flex text-3xl font-bold'>Runner</h2>
          </div>
          <div className='basis-2/3'>
            <h3 className='flex text-3xl '>Total runner: {runnerList.length}</h3>
          </div>
        </div>
      </div>
    </main>
  )
}
