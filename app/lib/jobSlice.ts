import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Job, JobList } from "@/app/types/job"

interface jobState {
  jobList: JobList
  filteredJobList: JobList
  selectAll: boolean
  searchCategory: string
  searchCategoryIsOpen: bool
}

const initialState: jobState = {
  jobList: [],
  filteredJobList: [],
  selectAll: false,
  searchCategory: "jobId",
  searchCategoryIsOpen: false,
}

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobList(state, action: PayloadAction<JobList>) {
      state.jobList = action.payload
      state.filteredJobList = action.payload
    },
    toggleJobSelection: (state, action: PayloadAction<string>) => {
      const jobId = action.payload

      if (state.jobList.includes(jobId)) {
        state.jobList = state.jobList.filter((id) => id !== jobId)
      } else {
        state.jobList.push(jobId)
      }
    },
    selectAllJobs: (state, action: PayloadAction<Job[]>) => {
      const jobs = action.payload

      jobs.map((job) => {
        if (!state.jobList.includes(job.jobId)) {
          state.jobList.push(job.jobId)
        }
      })
      state.selectAll = true
    },
    clearAllJobs: (state) => {
      state.jobList = []
      state.selectAll = false
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload
    },
    setSearchCategoryIsOpen: (state, action: PayloadAction<bool>) => {
      state.searchCategoryIsOpen = action.payload
    },
    filterJob: (state, action: PayloadAction<string>) => {
      const searchText = action.payload
      if (searchText === "") {
        state.filteredJobList = state.jobList
        return
      }
      state.filteredJobList = state.jobList.filter((job) => job[state.searchCategory]?.toLowerCase().includes(searchText.toLowerCase()))
    },
  },
})

export const { setJobList, toggleJobSelection, selectAllJobs, clearAllJobs, setSearchCategory, filterJob } = jobSlice.actions

export default jobSlice.reducer
