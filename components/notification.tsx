import React, { useState } from "react"
type NotificationProps = {
  type: "success" | "error"
  message: string
  additionalText?: string
}

export default function Notification({ type, message, additionalText }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  let bgColor
  let textColor
  let darkTextColor

  switch (type) {
    case "success":
      bgColor = "bg-green-400"
      textColor = "text-grey-900"
      darkTextColor = "dark:text-white"
      break
    case "error":
      bgColor = "bg-red-400"
      textColor = "text-white"
      darkTextColor = "dark:text-white"
      break
    default:
      bgColor = ""
      textColor = ""
      darkTextColor = ""
      break
  }

  return (
    <div className={`fixed top-4 right-4 px-6 py-4 ${textColor} ${bgColor} rounded shadow-lg flex items-center`}>
      <div className={`relative ${bgColor}`}>
        <div className='flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600 gap-5'>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white'>{message}</h3>
          <button
            type='button'
            className='text-white-400 dark:text-white-400 bg-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            data-modal-hide='default-modal'
            onClick={() => setIsVisible(false)}
          >
            <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        <div className='p-4 md:p-5 space-y-4'>
          <p className={`text-base font-semibold leading-relaxed ${textColor} ${darkTextColor}`}>{additionalText}</p>
        </div>
      </div>
    </div>
  )
}
