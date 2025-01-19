"use client"
import React, { useEffect, useState } from "react"
import Button from "@/components/button"
import PopupModal from "@/components/popupModal"
import Notification from "@/components/notification"
import SearchBox from "@/components/searchBox"
import { useSelector, useDispatch } from "react-redux"
import { listTemplate } from "@/app/api/template"
import { setTemplateList, setSearchCategory, filterTemplate } from "@/app/lib/templateSlice"
import { Provider } from "react-redux"
import { store } from "@/app/lib/store"
import Table from "@/components/table"
import Link from "next/link"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export default function TemplateContent() {
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()

  const templateList = useSelector((state: RootState) => state.template.templateList)
  const searchCategory = useSelector((state: RootState) => state.template.searchCategory)

  const filteredTemplateList = useSelector((state: RootState) => state.template.filteredTemplateList)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)

  const [searchCategoryIsOpen, setSearchCategoryIsOpen] = useState(false)

  const templateCategories = ["templateName"]
  const header = [
    {
      displayLabel: "name",
      label: "templateName",
    },
    {
      displayLabel: "created at",
      label: "createdAt",
    },
    {
      displayLabel: "current version",
      label: "version",
    },
  ]

  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const handleDeleteTemplate = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    setShowConfirm(false)
    // handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listTemplate()
        dispatch(setTemplateList(res))
      } catch (error) {
        console.error("Failed to fetch template:", error)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch template:", error))
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
    dispatch(filterTemplate(e.target.value))
  }

  return (
    <div>
      <div className='flex-none bg-gray-100 px-12 py-6 bg-gray-800 text-white'>
        <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Template</h2>
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
          <PopupModal text='Do you want to delete selected templates?' open yesLabel='Yes' noLabel='No' onYes={handleConfirmYes} onNo={handleConfirmNo} />
        )}

        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-2 mr-auto'>
            <Link href='/template/create'>
              <button type='button' className='inline-block rounded-3xl px-6 py-2 dark:bg-sky-500 dark:text-white font-bold   hover:bg-sky-400'>
                Create new template
              </button>
            </Link>
            <button
              type='button'
              className='inline-block rounded-3xl px-6 py-2 dark:bg-orange-400 dark:text-white font-bold  hover:dark:bg-orange-300'
              onClick={handleDeleteTemplate}
            >
              Delete selected templates
            </button>

            <SearchBox
              itemList={templateCategories}
              isOpen={false}
              label={searchCategory}
              placeholder={"test"}
              onItemSelect={handleSearchCategorySelect}
              onSearchTextChange={handleSearchTextChange}
            />
          </div>
        </div>

        <div>
          <Table header={header} tableItem={filteredTemplateList} />
        </div>
      </div>
    </div>
  )
}
