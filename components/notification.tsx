import React from "react"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export type NotificationProps = {
  result: "success" | "error"
  title: string
  message: string
  width: string
  isVisible: boolean
  onClickClose: () => void
}

export default function Notification({
  result,
  title,
  message,
  width = "w-full",
  isVisible = true,
  onClickClose = () => {},
}: NotificationProps) {
  if (!isVisible) return null

  switch (result) {
    case "success":
      return (
        <div className="pb-4">
          <div className={`${width} relative flex-grow flex-col rounded-xl bg-green-500 px-6 py-4`}>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <CheckCircleIcon className="h-10 w-10" /> {title}
            </div>
            <div className="flex py-2 text-xl">
              <div className={`text-base font-semibold dark:text-white`}>{message}</div>
            </div>
            <button
              className="absolute right-6 top-3 text-2xl font-bold dark:text-white hover:dark:bg-green-400"
              onClick={onClickClose}
            >
              x
            </button>
          </div>
        </div>
      )
      break
    case "error":
      return (
        <div className="pb-4">
          <div className={`${width} relative flex-grow flex-col rounded-xl bg-red-400 px-6 py-4`}>
            <div className="flex items-center gap-2 text-2xl font-bold dark:text-white">
              <ExclamationTriangleIcon className="h-10 w-10" /> {title}
            </div>
            <div className="flex py-2 text-xl">
              <div className={`text-base font-semibold dark:text-white`}>{message}</div>
            </div>
            <button
              className="absolute right-6 top-3 text-2xl font-bold dark:text-white hover:dark:bg-red-300"
              onClick={onClickClose}
            >
              x
            </button>
          </div>
        </div>
      )
      break
    default:
      return null
  }
}
