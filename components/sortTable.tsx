"use client"

import React, { useState, useEffect } from "react"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/lib/store"
import { toggleJobSelection, selectAllJobs, clearAllJobs } from "@/app/lib/jobSlice"
import { Job, JobList } from "@/app/types/Job"

interface TableProps {
  jobs: JobList
  perPage?: number
}

export default function SortTable({ perPage = 25 }: TableProps) {
  const [sortedJobs, setSortedJobs] = useState<JobList>()
  const [sortConfig, setSortConfig] = useState<{ key: keyof Job; direction: "ascending" | "descending" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(perPage)

  const dispatch = useDispatch()
  const selectAll = useSelector((state: RootState) => state.job.selectAll)
  const filteredJobs = useSelector((state: RootState) => state.job.filteredJobs) || []

  useEffect(() => {
    if (JSON.stringify(sortedJobs) !== JSON.stringify(filteredJobs)) {
      setSortedJobs(filteredJobs)
    }
  }, [filteredJobs, sortedJobs])

  const handleCheckboxChange = (jobId: string) => {
    dispatch(toggleJobSelection(jobId))
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "queued":
        return "bg-sky-500"
      case "success":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "canceled":
        return "bg-orange-500"
      default:
        return ""
    }
  }

  const sortJobs = (key: keyof Job) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    const sortedArray = [...sortedJobs].sort((a, b) => {
      if (key === "createdAt" || key === "updatedAt") {
        return direction === "ascending" ? new Date(a[key]).getTime() - new Date(b[key]).getTime() : new Date(b[key]).getTime() - new Date(a[key]).getTime()
      } else {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1
        }
        return 0
      }
    })

    setSortedJobs(sortedArray)
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof Job) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? <ArrowUpIcon className='w-4 h-4 inline' /> : <ArrowDownIcon className='w-4 h-4 inline' />
  }

  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleJobsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setJobsPerPage(Number(event.target.value))
    setCurrentPage(1) // Reset to first page
  }

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
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

  const handleSelectAllChange = () => {
    if (selectAll) {
      dispatch(clearAllJobs())
    } else {
      dispatch(selectAllJobs(filteredJobs))
    }
  }

  return (
    <div className='table-container'>
      <div className='flex items-center mb-4 gap-3'>
        <div className='flex'>
          <div className='flex dark:text-white gap-3'>
            <label htmlFor='jobsPerPage' className='flex items-center text-1xl'>
              Row
            </label>
            <select
              id='jobsPerPage'
              value={jobsPerPage}
              onChange={handleJobsPerPageChange}
              className='border rounded px-3 py-2 ext-white dark:bg-gray-700 dark:text-white'
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
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-400'>
        <thead className='text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
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
            <th scope='col' className='px-6 py-3' onClick={() => sortJobs("jobId")}>
              Job ID {getSortIcon("jobId")}
            </th>
            <th scope='col' className='px-6 py-3' onClick={() => sortJobs("status")}>
              Status {getSortIcon("status")}
            </th>
            <th scope='col' className='px-6 py-3' onClick={() => sortJobs("createdAt")}>
              Created At {getSortIcon("createdAt")}
            </th>
            <th scope='col' className='px-6 py-3' onClick={() => sortJobs("updatedAt")}>
              Update At {getSortIcon("updatedAt")}
            </th>
          </tr>
        </thead>
        <tbody className='dark:text-white'>
          {currentJobs.map((job) => (
            <tr key={job.jobId} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-search-1'
                    type='checkbox'
                    checked={jobList.includes(job.jobId)}
                    onChange={() => handleCheckboxChange(job.jobId)}
                    title='Select job'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor={`checkbox-table-search-${job.jobId}`} className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <td className='px-6 py-4'>{job.jobId}</td>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  <div className={`h-2.5 w-2.5 rounded-full ${getStatusClass(job.status)} me-2`}></div> {job.status}
                </div>
              </td>
              <td className='px-6 py-4'>{job.createdAt}</td>
              <td className='px-6 py-4'>{job.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
