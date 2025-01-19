"use client"
import React, { useState, useEffect } from "react"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"
import { setItem, setSortedItem, selectItem, setSelectAll, clearAll, setCurrentPage, setItemsPerPage } from "@/app/lib/tableSlice"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/lib/store"
import Link from "next/link"

export type TableProps = {
  header: [
    {
      displayLabel: string
      label: string
    },
  ]
  tableItem: any
  perPage: number
}

export default function Table({ header, tableItem, perPage = 25 }: TableProps) {
  const dispatch = useDispatch()
  const sortedItem = useSelector((state: RootState) => state.table.sortedItem)
  const selectedItem = useSelector((state: RootState) => state.table.selectedItem)
  const selectAll = useSelector((state: RootState) => state.table.selectAll)
  const sortConfig = useSelector((state: RootState) => state.table.sortConfig)
  const currentPage = useSelector((state: RootState) => state.table.currentPage)
  const itemsPerPage = useSelector((state: RootState) => state.table.itemsPerPage)

  useEffect(() => {
    dispatch(setItem(Array.isArray(tableItem) ? tableItem : []))
    dispatch(setItemsPerPage(perPage))
    dispatch(setSortedItem({ key: "createdAt", direction: "ascending" }))
  }, [tableItem, perPage, dispatch])

  const handleSelectAllChange = () => {
    dispatch(setSelectAll())
  }

  const handleItemClick = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    dispatch(setSortedItem({ key, direction }))
  }

  const handleCheckboxChange = (item: any) => {
    dispatch(selectItem(item))
  }

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? <ArrowUpIcon className='w-4 h-4 inline' /> : <ArrowDownIcon className='w-4 h-4 inline' />
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "queued":
        return "bg-sky-500"
      case "active":
      case "success":
        return "bg-green-500"
      case "disconnected":
      case "failed":
        return "bg-red-500"
      case "canceled":
      case "deregistered":
        return "bg-orange-500"
      default:
        return ""
    }
  }

  const renderCellContent = (headerLabel: string, dataItem: any) => {
    switch (headerLabel) {
      case "status":
        return (
          <div className='flex items-center'>
            <div className={`h-2.5 w-2.5 rounded-full ${getStatusClass(dataItem.status)} me-2`}></div>
            {dataItem[headerLabel]}
          </div>
        )
      case "jobId":
        return (
          <div>
            <Link href={`/job/${dataItem[headerLabel]}`}>
              <div className='text-blue-300 hover:underline'>{dataItem[headerLabel]}</div>
            </Link>
          </div>
        )
      case "template":
      case "templateName":
        return (
          <div>
            <Link href={`/template/${dataItem[headerLabel]}`}>
              <div className='text-blue-300 hover:underline'>{dataItem[headerLabel]}</div>
            </Link>
          </div>
        )
      case "runner":
      case "runnerName":
        return (
          <div>
            <Link href={`/runner/${dataItem[headerLabel]}`}>
              <div className='text-blue-300 hover:underline'>{dataItem[headerLabel]}</div>
            </Link>
          </div>
        )
      case "userName":
        return (
          <div>
            <Link href={`/user/${dataItem[headerLabel]}`}>
              <div className='text-blue-300 hover:underline'>{dataItem[headerLabel]}</div>
            </Link>
          </div>
        )
      default:
        return dataItem[headerLabel]
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedItem.length > 0 ? sortedItem.slice(indexOfFirstItem, indexOfLastItem) : tableItem.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => dispatch(setCurrentPage(pageNumber))

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPage(Number(event.target.value)))
    dispatch(setCurrentPage(1)) // Reset to first page
  }

  const totalPages = Math.ceil(sortedItem.length / itemsPerPage)
  const pageNumbers = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.push(1)
    if (currentPage > 3) {
      pageNumbers.push("...")
    }

    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push("...")
    }
    pageNumbers.push(totalPages)
  }

  return (
    <div>
      <div className='flex  mb-4 gap-3'>
        <div className='flex'>
          <div className='flex dark:text-white gap-3'>
            <label htmlFor='itemsPerPage' className='flex items-center text-1xl font-bold'>
              Row
            </label>
            <select
              id='itemsPerPage'
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className='border rounded px-5 py-2 dark:bg-gray-700 dark:text-white justify-start text-left'
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className='pagination'>
          {pageNumbers.map((number, index) => (
            <button
              key={index}
              onClick={() => typeof number === "number" && paginate(number)}
              className={`px-4 py-2 ${currentPage === number ? "bg-blue-500 text-white" : "dark:bg-gray-700 text-white"}`}
              disabled={typeof number !== "number"}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-gray-400'>
        <thead className='text-xs text-white bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-400'>
          <tr>
            <th scope='col' className='p-4 '>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            {header.map((headerItem) => (
              <th key={headerItem.label} scope='col' className='px-6 py-3' onClick={() => handleItemClick(headerItem.label)}>
                {headerItem.displayLabel} {getSortIcon(headerItem.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='dark:text-white '>
          {currentItems.map((dataItem, index) => (
            <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id={`checkbox-table-${index}`}
                    type='checkbox'
                    checked={selectedItem.some((item) => item.id === dataItem.id)}
                    onChange={() => handleCheckboxChange(dataItem)}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor={`checkbox-table-${index}`} className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              {header.map((headerItem) => (
                <td key={headerItem.label} className='px-6 py-3'>
                  {renderCellContent(headerItem.label, dataItem)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={"border-t border-gray-400"}></tr>
        </tfoot>
      </table>
    </div>
  )
}
