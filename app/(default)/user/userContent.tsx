"use client"
import React, { useState, useEffect } from "react"
import { listUser, deleteUsers } from "@/app/api/v1.0/users/route"
import PopupModal from "@/components/popupModal"
import SearchBox from "@/components/searchBox"
import { useSelector, useDispatch } from "react-redux"
import { setUserList, setSearchCategory, filterUser } from "@/app/lib/userSlice"
import { RootState } from "@/app/lib/store"
import Table from "@/components/table"
import Link from "next/link"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import Notification from "@/components/notification"

export default function UserContent() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [searchCategoryIsOpen, setSearchCategoryIsOpen] = useState(false)
  const [apiCallResult, setApiResult] = useState<{
    result: "success" | "error" | "none"
    title: string
    message: string
    isVisible: boolean
  }>({ result: "none", title: "", message: "", isVisible: false })

  const dispatch = useDispatch()
  const searchCategory = useSelector((state: RootState) => state.user.searchCategory)
  const filteredUserList = useSelector((state: RootState) => state.user.filteredUserList)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)

  const handleDeleteUser = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const userIds = selectedItem.map((user) => user.id)
    const res = await deleteUsers(userIds)
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
      title = "User successfully deleted"
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

  const userCategories = ["name", "email", "role"]

  const header = [
    {
      displayLabel: "name",
      label: "name",
    },
    {
      displayLabel: "email",
      label: "email",
    },
    {
      displayLabel: "role",
      label: "role",
    },
    {
      displayLabel: "created at",
      label: "createdAt",
    },
    {
      displayLabel: "update at",
      label: "updatedAt",
    },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listUser()
        dispatch(setUserList(res))
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch users:", error))
  }, [])

  const handleSearchCategorySelect = (category: string) => {
    dispatch(setSearchCategory(category))
    setSearchCategoryIsOpen(false)
  }

  const handleSearchTextChange = (value: string) => {
    dispatch(filterUser(value))
  }

  return (
    <div>
      <div className="bg-gray-800 px-12 py-6 text-white">
        <h2 className="flex py-6 text-3xl font-bold dark:text-white">User</h2>

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
            text="Do you want to delete selected users?"
            open
            yesLabel="Yes"
            noLabel="No"
            onYes={handleConfirmYes}
            onNo={handleConfirmNo}
          />
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="mr-auto flex gap-2">
            <Link href="/user/create">
              <button
                type="button"
                className="inline-block rounded-3xl px-6 py-2 font-bold hover:bg-sky-400 dark:bg-sky-500 dark:text-white"
              >
                Create new user
              </button>
            </Link>
            <button
              type="button"
              className="inline-block rounded-3xl px-6 py-2 font-bold dark:bg-orange-400 dark:text-white hover:dark:bg-orange-300"
              onClick={handleDeleteUser}
            >
              Delete selected users
            </button>

            <SearchBox
              itemList={userCategories}
              isOpen={false}
              label={searchCategory}
              placeholder={"Search"}
              onItemSelect={(e) => handleSearchCategorySelect(e.target.value)}
              onSearchTextChange={(e) => handleSearchTextChange(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Table header={header} tableItem={filteredUserList} />
        </div>
      </div>
    </div>
  )
}
