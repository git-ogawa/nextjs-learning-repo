"use client"
import React, { useEffect, useState } from "react"
import PopupModal from "@/components/popupModal"
import SearchBox from "@/components/searchBox"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/lib/store"
import { listRunner, deregisterRunner } from "@/app/api/runner"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/table"
import { setRunnerList, setSearchCategory, filterRunner } from "@/app/lib/runnerSlice"

export default function RunnerContent() {
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  const searchCategory = useSelector((state: RootState) => state.runner.searchCategory)
  const filteredRunnerList = useSelector((state: RootState) => state.runner.filteredRunnerList)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)
  const [searchCategoryIsOpen, setSearchCategoryIsOpen] = useState(false)

  const runnerCategories = ["runnerName", "status"]
  const header = [
    {
      displayLabel: "name",
      label: "runnerName",
    },
    {
      displayLabel: "status",
      label: "status",
    },
    {
      displayLabel: "created at",
      label: "createdAt",
    },
  ]

  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const handleDeregisterRunner = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await deregisterRunner(selectedItem)
    setShowConfirm(false)
    handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listRunner()
        dispatch(setRunnerList(res))
      } catch (error) {
        console.error("Failed to fetch runner:", error)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch runner:", error))
  }, [])

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

  const handleSearchCategorySelect = (category: string) => {
    dispatch(setSearchCategory(category))
    setSearchCategoryIsOpen(false)
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterRunner(e.target.value))
  }

  return (
    <div>
      <div className="flex-none bg-gray-100 bg-gray-800 px-12 py-6 text-white">
        <h2 className="flex py-6 text-3xl font-bold dark:text-white">Runner</h2>
      </div>

      {apiCallResult.result === "success" && (
        <div className="px-12 pb-4">
          <div className="w-full flex-grow rounded rounded-xl bg-green-600 px-6 py-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <CheckCircleIcon className="h-10 w-10" /> {apiCallResult.message}
            </div>
            <div className="py-2 text-xl">
              <div className={`text-base font-semibold leading-relaxed dark:text-white`}>
                {apiCallResult.additionalText}
              </div>
            </div>
          </div>
        </div>
      )}

      {apiCallResult.result === "error" && (
        <div className="px-12 pb-4">
          <div className="w-full flex-grow rounded rounded-xl bg-red-400 px-6 py-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <ExclamationTriangleIcon className="h-10 w-10" /> {apiCallResult.message}
            </div>
            <div className="py-2 text-xl">
              <div className={`text-base font-semibold leading-relaxed dark:text-white`}>
                {apiCallResult.additionalText}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto px-12">
        {showConfirm && (
          <PopupModal
            text="Do you want to deregister selected runners?"
            open
            yesLabel="Yes"
            noLabel="No"
            onYes={handleConfirmYes}
            onNo={handleConfirmNo}
          />
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="mr-auto flex gap-2">
            <button
              type="button"
              className="inline-block rounded-3xl px-6 py-3 font-bold dark:bg-orange-400 dark:text-white hover:dark:bg-orange-300"
              onClick={handleDeregisterRunner}
            >
              Deregister runners
            </button>

            <SearchBox
              itemList={runnerCategories}
              isOpen={false}
              label={searchCategory}
              onItemSelect={handleSearchCategorySelect}
              onSearchTextChange={handleSearchTextChange}
            />
          </div>
        </div>

        <div>
          <Table header={header} tableItem={filteredRunnerList} />
        </div>
      </div>
    </div>
  )
}
