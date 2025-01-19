"use client"
import Link from "next/link"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { postCreateJob } from "@/app/api/job"
import { listTemplate } from "@/app/api/template"
import React, { useState, useEffect } from "react"
import { JobApiResponse } from "@/app/types/job"

export default function CreateJobForm() {
  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const [jobTemplate, setJobTemplate] = useState<string>("")
  const [templateList, setTemplateList] = useState<string[]>([])

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

    // 一定時間後に成功メッセージを非表示にする
    setTimeout(() => {
      setAPIResult({ result: "none", message: "", additionalText: "" })
    }, 10000) // 10秒後に非表示
  }

  const handleCreateJob = async () => {
    const res = await postCreateJob(jobTemplate)
    handleApiCall(res)
  }

  const fetchTemplate = async () => {
    try {
      const res = await listTemplate()

      const templateNameList = res.map((item) => item.templateName)
      setTemplateList(templateNameList)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setJobTemplate(event.target.value)
  }

  useEffect(() => {
    fetchTemplate()
  }, [])

  return (
    <div className='flex-none px-12 py-6 bg-gray-800'>
      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Create new Job</h2>

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
          <div className='w-full flex-grow rounded rounded-xl px-6 py-4 bg-red-400 '>
            <div className='flex text-2xl font-bold text-gray-900 dark:text-white items-center gap-2'>
              <ExclamationTriangleIcon className='w-10 h-10 ' /> {apiCallResult.message}
            </div>
            <div className='text-xl py-2'>
              <div className={`text-base font-semibold leading-relaxed  dark:text-white`}>{apiCallResult.additionalText}</div>
            </div>
          </div>
        </div>
      )}

      <div className='max-w-5xl'>
        <div className='flex-auto justify-start'>
          <form>
            <div className='mb-5'>
              <label htmlFor='large-input' className='block mb-2 font-medium text-gray-900 dark:text-white text-2xl'>
                Template
              </label>

              <select
                id='dropdown'
                aria-label='Select job template'
                className='border rounded-md px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white max-w-fit'
                value={jobTemplate}
                onChange={handleChange}
              >
                <option value='' disabled>
                  Choose a template
                </option>
                {templateList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className='flex gap-4 items-start'>
          <button
            type='button'
            className='inline-block rounded rounded-3xl px-6 py-3 dark:bg-sky-500 dark:text-white font-bold  hover:bg-sky-400'
            onClick={handleCreateJob}
          >
            Create
          </button>
          <Link href='/job'>
            <button type='button' className='inline-block rounded rounded-3xl px-6 py-3 dark:bg-orange-400 dark:text-white font-bold  hover:dark:bg-orange-300'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
