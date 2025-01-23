"use client"
import { cancelJob } from "@/app/api/v1.0/jobs/route"
import type { Job } from "@/app/types/job"
import Notification from "@/components/notification"
import PopupModal from "@/components/popupModal"
import Table from "@/components/table"
import { getStatusIcon } from "@/components/ui/utils"
import {} from "@heroicons/react/24/outline"
import type { Monaco } from "@monaco-editor/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"

export default function JobDetail(res: { job: Job }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [apiCallResult, setApiResult] = useState<{
    result: "success" | "error" | "none"
    title: string
    message: string
    isVisible: boolean
  }>({ result: "none", title: "", message: "", isVisible: false })

  const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

  const handleEditorWillMount = (monaco: Monaco) => {
    console.log("Monaco Editor is loading...", monaco)
  }

  const handleCancelJob = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await cancelJob(job.jobId)
    setShowConfirm(false)
    handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  const handleApiCall = async (res) => {
    let result
    let title
    let message

    if (res) {
      result = "success"
      title = "Job successfully cancelled"
      message = `Job Id ${job.jobId} has been cancelled`
    } else {
      result = "error"
      title = "Failed to call API"
      message = `error`
    }

    setApiResult({
      result: result,
      title: title,
      message: message,
      isVisible: true,
    })
    // setTimeout(() => {
    //   setAPIResult({ isVisible: false })
    // }, 10000)
  }

  const handleNotificationClose = () => {
    setApiResult({ isVisible: false })
  }

  const job = res.job
  const header = [
    {
      displayLabel: "key",
      label: "key",
    },
    {
      displayLabel: "value",
      label: "value",
    },
  ]

  return (
    <div className="flex-none bg-gray-800 px-12 py-12">
      <h2 className="flex py-6 text-3xl font-bold dark:text-white">{`Job > ${job.jobId}`}</h2>

      <Notification
        result={apiCallResult.result}
        title={apiCallResult.title}
        message={apiCallResult.message}
        isVisible={apiCallResult.isVisible}
        onClickClose={handleNotificationClose}
      />

      <div className="mb-4 flex items-center justify-between">
        <div className="mr-auto flex gap-2">
          <button
            type="button"
            className="inline-block rounded-3xl px-4 py-2 font-bold dark:bg-orange-400 dark:text-white hover:dark:bg-orange-300"
            onClick={handleCancelJob}
          >
            Cancel
          </button>
        </div>
      </div>

      {showConfirm && (
        <PopupModal
          text="Do you want to cancel the job?"
          open
          yesLabel="Yes"
          noLabel="No"
          onYes={handleConfirmYes}
          onNo={handleConfirmNo}
        />
      )}

      <div className="max-w-7xl flex-auto border border-white p-4 dark:text-white">
        <h3 className="p-2 text-2xl font-bold">Overview</h3>
        <div className="grid grid-cols-5 gap-4 p-4">
          <div>
            <div className="text-lg font-bold">Status</div>
            <div className="">
              <div className="flex items-center">
                {getStatusIcon(job.status)} {job.status}
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">Template</div>
            <div className="">
              <Link
                href={`/template/${job.template}`}
                className="inline-flex hover:underline dark:text-blue-300"
              >
                {job.template}
              </Link>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">Runner</div>
            <div className="">
              <Link
                href={`/runner/${job.runner}`}
                className="inline-flex hover:underline dark:text-blue-300"
              >
                {job.runner}
              </Link>
            </div>
          </div>

          <div>
            <div className="text-lg font-bold">Created at</div>
            <div className="">{job.createdAt}</div>
          </div>
          <div>
            <div className="text-lg font-bold">Updated at</div>
            <div className="">{job.updatedAt}</div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>

      <h2 className="flex py-6 text-3xl font-bold dark:text-white">Tags</h2>

      <div className="x max-w-7xl flex-grow dark:text-white">
        <Table header={header} tableItem={job.tags} />
      </div>

      <h2 className="flex py-6 text-3xl font-bold dark:text-white">Output</h2>

      <div className="x flex-grow border border-white p-4">
        <div style={{ height: "50vh" }}>
          <MonacoEditor
            height="100%"
            defaultLanguage="yaml"
            value=""
            beforeMount={handleEditorWillMount}
            theme="vs-dark"
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
