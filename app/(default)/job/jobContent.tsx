"use client"
import React, { useState, useEffect } from "react"
import { listJob, postCancelJob } from "@/app/api/job"
import Button from "@/components/button"
import PopupModal from "@/components/popupModal"
import Notification from "@/components/notification"
import SearchBox from "@/components/searchBox"
import { useSelector, useDispatch } from "react-redux"
import { setJobList, setSearchCategory, filterJob } from "@/app/lib/jobSlice"
import { RootState } from "@/app/lib/store"
import { JobApiResponse } from "@/app/types/job"
import Table from "@/components/table"
import { setItem, setSortedItem, selectItem, setSelectAll, clearAll, setCurrentPage, setItemsPerPage } from "@/app/lib/tableSlice"
import Link from "next/link"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export default function JobContent() {
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  const searchCategory = useSelector((state: RootState) => state.job.searchCategory)

  const filteredJobList = useSelector((state: RootState) => state.job.filteredJobList)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)

  const [searchCategoryIsOpen, setSearchCategoryIsOpen] = useState(false)

  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const jobCategories = ["jobId", "status", "template", "runner"]

  const header = [
    {
      displayLabel: "job id",
      label: "jobId",
    },
    {
      displayLabel: "status",
      label: "status",
    },
    {
      displayLabel: "created at",
      label: "createdAt",
    },
    {
      displayLabel: "update at",
      label: "updatedAt",
    },
    {
      displayLabel: "template",
      label: "template",
    },
    {
      displayLabel: "runner",
      label: "runner",
    },
  ]

  const handleCancelJob = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await postCancelJob(selectedItem)
    setShowConfirm(false)
    handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listJob()
        const serializedRes = JSON.parse(JSON.stringify(res))
        dispatch(setJobList(serializedRes))
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch jobs:", error))
  }, [])

  const handleSearchCategorySelect = (category: string) => {
    dispatch(setSearchCategory(category))
    setSearchCategoryIsOpen(false)
  }

  const handleSearchTextChange = (value: string) => {
    dispatch(filterJob(value))
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
    <div>
      <div className='px-12 py-6 bg-gray-800 text-white'>
        <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Job</h2>
      </div>
      {apiCallResult.result === "success" && (
        <div className='px-12 pb-4'>
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
        <div className='px-12 pb-4'>
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

      <div className='flex-grow overflow-auto px-12'>
        {showConfirm && (
          <PopupModal text='Do you want to cancel selected job?' open yesLabel='Yes' noLabel='No' onYes={handleConfirmYes} onNo={handleConfirmNo} />
        )}

        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-2 mr-auto'>
            <Link href='/job/create'>
              <button type='button' className='inline-block rounded-3xl px-6 py-2 dark:bg-sky-500 dark:text-white font-bold hover:bg-sky-400'>
                Create Job
              </button>
            </Link>
            <button
              type='button'
              className='inline-block rounded-3xl px-6 py-2 dark:bg-orange-400 dark:text-white font-bold  hover:dark:bg-orange-300'
              onClick={handleCancelJob}
            >
              Cancel selected jobs
            </button>

            <SearchBox
              itemList={jobCategories}
              isOpen={false}
              label={searchCategory}
              placeholder={"test"}
              onItemSelect={(category) => handleSearchCategorySelect(category)}
              onSearchTextChange={(e) => handleSearchTextChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Table header={header} tableItem={filteredJobList} />
        </div>
      </div>
    </div>
  )
}
