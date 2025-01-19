import React, { useRef } from "react"
import DropDown from "./dropDown"

export type SearchBoxProps = {
  itemList: string[]
  isOpen: bool
  label?: string
  placeholder?: string
  onItemSelect?: (category: string) => void
  onSearchTextChange?: (value: string) => void
  onClickToSend?: () => void
}

export default function SearchBox({
  itemList,
  label = "",
  isOpen = false,
  placeholder = "",
  onItemSelect = () => {},
  onSearchTextChange = () => {},
  onClickToSend = () => {},
}: SearchBoxProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex items-center'>
      <form className='max-w-lg'>
        <div className='flex text-left' ref={menuRef}>
          <label htmlFor='search-dropdown' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
            Category
          </label>
          <DropDown itemList={itemList} label={label} onItemSelect={onItemSelect} />
          <div className='relative w-full'>
            <input
              type='search'
              id='search-dropdown'
              className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder={placeholder}
              required
              onChange={onSearchTextChange}
            />
            <button
              type='submit'
              className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={onClickToSend}
            >
              <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
