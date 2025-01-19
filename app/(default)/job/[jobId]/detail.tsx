"use client"
import { useState } from "react"
import type { Monaco } from "@monaco-editor/react"
import dynamic from "next/dynamic"
import yaml from "js-yaml"
import { getStatusIcon } from "@/components/ui/utils"
import Link from "next/link"
import PopupModal from "@/components/popupModal"
import { postCancelJob } from "@/app/api/job"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { Job, JobApiResponse } from "@/app/types/job"

export default function JobDetail(res: { job: Job }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

  const handleEditorWillMount = (monaco: Monaco) => {
    console.log("Monaco Editor is loading...", monaco)
  }

  const job = res.job

  const handleCancelJob = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await postCancelJob([job.jobId])
    setShowConfirm(false)
    handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  const handleApiCall = async (res: JobApiResponse) => {
    setAPIResult({ result: "none", message: "", additionalText: "" })

    switch (res.status) {
      case "success":
        setAPIResult({ result: "success", message: res.data.title, additionalText: res.data.body })
        break
      case "error":
        setAPIResult({ result: "error", message: res.data.title, additionalText: res.data.body })
        break
      default:
        setAPIResult({ result: "error", message: "", additionalText: "Unknown error" })
        break
    }
    setTimeout(() => {
      setAPIResult({ result: "none", message: "", additionalText: "" })
    }, 10000)
  }

  return (
    <div className='flex-none bg-gray-100 px-12 py-12 bg-gray-800'>
      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>{`Job > ${job.jobId}`}</h2>

      {apiCallResult.result === "success" && (
        <div className='pb-4'>
          <div className='w-full flex-grow rounded rounded-xl px-6 py-4 bg-green-600 '>
            <div className='flex text-2xl font-bold text-gray-900 dark:text-white items-center gap-2'>
              <CheckCircleIcon className='w-10 h-10 ' /> {apiCallResult.message}
            </div>
            <div className='text-xl py-2'>
              <div className={`text-base font-semibold leading-relaxed  dark:text-white`}>{apiCallResult.additionalText}</div>
            </div>
          </div>
        </div>
      )}

      {apiCallResult.result === "error" && (
        <div className='pb-4'>
          <div className='w-full flex-grow rounded-xl px-6 py-4 bg-red-400 '>
            <div className='flex text-2xl font-bold text-gray-900 dark:text-white items-center gap-2'>
              <ExclamationTriangleIcon className='w-10 h-10 ' /> {apiCallResult.message}
            </div>
            <div className='text-xl py-2'>
              <div className={`text-base font-semibold leading-relaxed  dark:text-white`}>{apiCallResult.additionalText}</div>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-2 mr-auto '>
          <button
            type='button'
            className='inline-block rounded-3xl px-4 py-2 dark:bg-orange-400 dark:text-white font-bold  hover:dark:bg-orange-300'
            onClick={handleCancelJob}
          >
            Cancel
          </button>
        </div>
      </div>

      {showConfirm && <PopupModal text='Do you want to cancel the job?' open yesLabel='Yes' noLabel='No' onYes={handleConfirmYes} onNo={handleConfirmNo} />}

      <div className='flex-auto p-4 border border-white dark:text-white max-w-7xl'>
        <h3 className='p-2 text-2xl font-bold'>Overview</h3>
        <div className='grid grid-cols-5 gap-4 p-4'>
          <div>
            <div className='font-bold text-lg'>Status</div>
            <div className=''>
              <div className='flex items-center'>
                {getStatusIcon(job.status)} {job.status}
              </div>
            </div>
          </div>
          <div>
            <div className='font-bold text-lg'>Template</div>
            <div className=''>
              <Link href={`/template/${job.template}`} className='inline-flex dark:text-blue-300 hover:underline'>
                {job.template}
              </Link>
            </div>
          </div>
          <div>
            <div className='font-bold text-lg'>Runner</div>
            <div className=''>
              <Link href={`/runner/${job.runner}`} className='inline-flex dark:text-blue-300 hover:underline'>
                {job.runner}
              </Link>
            </div>
          </div>

          <div>
            <div className='font-bold text-lg'>Created at</div>
            <div className=''>{job.createdAt}</div>
          </div>
          <div>
            <div className='font-bold text-lg'>Updated at</div>
            <div className=''>{job.updatedAt}</div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>

      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Tags</h2>

      <div className='flex-grow x p-4 border border-white max-w-7xl dark:text-white'>
        <div>
          {job.tags.map((item, index) => (
            <div key={item.key} className='flex gap-2'>
              {item.key} {item.value}
            </div>
          ))}
        </div>
      </div>

      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Output</h2>

      <div className='flex-grow x p-4 border border-white'>
        <div style={{ height: "50vh" }}>
          <MonacoEditor
            height='100%'
            defaultLanguage='yaml'
            value=''
            beforeMount={handleEditorWillMount}
            theme='vs-dark'
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
