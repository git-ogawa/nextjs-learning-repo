"use client"
import React, { useState, useEffect, useRef } from "react"

export type DropdownProps = {
  label: string
  itemList: string[]
  onItemSelect?: (item: string) => void
}

export default function DropDown({ itemList, label, onItemSelect = () => {} }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)
  // 外部クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div>
      <div className='flex relative inline-block text-left' ref={menuRef}>
        <button
          id='dropdown-button'
          data-dropdown-toggle='dropdown'
          className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
          type='button'
          onClick={toggleDropdown}
        >
          {label}
          <svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </button>
        {isOpen && (
          <div className='absolute left-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg dark:bg-gray-700 dark:text-white'>
            {itemList.map((item, index) => (
              <button
                key={index}
                className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                onClick={() => {
                  onItemSelect(item)
                  setIsOpen(false)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
