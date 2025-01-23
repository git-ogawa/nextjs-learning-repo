"use client"
import { cancelJobs, listJob } from "@/app/api/v1.0/jobs/route"
import { filterJob, setJobList, setSearchCategory } from "@/app/lib/jobSlice"
import type { RootState } from "@/app/lib/store"
import Notification from "@/components/notification"
import PopupModal from "@/components/popupModal"
import SearchBox from "@/components/searchBox"
import Table from "@/components/table"
import {} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function JobContent() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [searchCategoryIsOpen, setSearchCategoryIsOpen] = useState(false)
  const [apiCallResult, setApiResult] = useState<{
    result: "success" | "error" | "none"
    title: string
    message: string
    isVisible: boolean
  }>({ result: "none", title: "", message: "", isVisible: false })

  const dispatch = useDispatch()
  const searchCategory = useSelector((state: RootState) => state.job.searchCategory)
  const filteredJobList = useSelector((state: RootState) => state.job.filteredJobList)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)

  const handleCancelJob = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await cancelJobs(selectedItem)
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

    if (res.status) {
      result = "success"
      title = "Job successfully cancelled"
      message = res.data.body
    } else {
      result = "error"
      title = "Failed to call API"
      message = res.error.message
    }

    setApiResult({
      result: result,
      title: title,
      message: message,
      isVisible: true,
    })
  }

  const handleNotificationClose = () => {
    setApiResult({ isVisible: false })
  }

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

  return (
    <div>
      <div className="bg-gray-800 px-12 py-6 text-white">
        <h2 className="flex py-6 text-3xl font-bold dark:text-white">Job</h2>

        <Notification
          result={apiCallResult.result}
          title={apiCallResult.title}
          message={apiCallResult.message}
          isVisible={apiCallResult.isVisible}
          onClickClose={handleNotificationClose}
        />
      </div>

      <div className="flex-grow overflow-auto px-12">
        {showConfirm && (
          <PopupModal
            text="Do you want to cancel selected job?"
            open
            yesLabel="Yes"
            noLabel="No"
            onYes={handleConfirmYes}
            onNo={handleConfirmNo}
          />
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="mr-auto flex gap-2">
            <Link href="/job/create">
              <button
                type="button"
                className="inline-block rounded-3xl px-6 py-2 font-bold hover:bg-sky-400 dark:bg-sky-500 dark:text-white"
              >
                Create Job
              </button>
            </Link>
            <button
              type="button"
              className="inline-block rounded-3xl px-6 py-2 font-bold dark:bg-orange-400 dark:text-white hover:dark:bg-orange-300"
              onClick={handleCancelJob}
            >
              Cancel selected jobs
            </button>

            <SearchBox
              itemList={jobCategories}
              isOpen={false}
              label={searchCategory}
              placeholder={"Search"}
              onItemSelect={(e) => handleSearchCategorySelect(e.target.value)}
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
