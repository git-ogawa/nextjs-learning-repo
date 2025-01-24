"use client"
import Notification from "@/components/notification"
import PopupModal from "@/components/popupModal"
import { useState } from "react"

export default function UserProfileContent({ user }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

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

  const handleUpdateUser = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    // const res = await updateUser((id = user.id), (password = password))
    setShowConfirm(false)
    // handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  return (
    <div className="flex-none bg-gray-800 px-12 py-6">
      <h2 className="flex py-6 text-3xl font-bold dark:text-white">User Profile</h2>

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
            text="Update the password?"
            open
            yesLabel="Yes"
            noLabel="No"
            onYes={handleConfirmYes}
            onNo={handleConfirmNo}
          />
        )}
      </div>

      <div className="max-w-5xl">
        <div className="flex-auto justify-start">
          <form className="mx-auto max-w-sm">
            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                disabled
                value={user.name}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
                disabled
                value={user.email}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleUpdateUser}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
