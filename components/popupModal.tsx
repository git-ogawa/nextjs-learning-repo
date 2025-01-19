import React from "react"
import Button from "./button"

interface ModalProps {
  open: boolean
  text: string
  yesLabel: string
  noLabel: string
  onYes: () => void
  onNo: () => void
}

export default function PopupModal({ open, text, yesLabel = "Yes", noLabel = "No", onYes, onNo }: ModalProps) {
  if (!open) return null

  return (
    <div>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-700 text-white'>
            <div className='mb-4'>
              <p className='text-base leading-relaxed text-gray-500 dark:text-white'>{text}</p>
            </div>
            <div className='flex justify-end space-x-2'>
              <button
                type='button'
                className='inline-block rounded rounded-3xl px-6 py-2 dark:bg-sky-500 dark:text-white font-bold  hover:bg-sky-400'
                onClick={onYes}
              >
                {yesLabel}
              </button>
              <button
                type='button'
                className='inline-block rounded rounded-3xl px-6 py-2 dark:bg-orange-400 dark:text-white font-bold  hover:bg-orange-300'
                onClick={onNo}
              >
                {noLabel}
              </button>

              {/* <Button primary label={yesLabel} onClick={onYes} />
              <Button label={noLabel} onClick={onNo} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
