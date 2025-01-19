import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RunnerList } from "@/app/types/runner"

interface runnerState {
  runnerList: RunnerList
  filteredRunnerList: RunnerList
  isAllSelected: boolean
  searchCategory: string
  searchCategoryIsOpen: bool
}

const initialState: runnerState = {
  runnerList: [],
  filteredRunnerList: [],
  isAllSelected: false,
  searchCategory: "runnerName",
  searchCategoryIsOpen: false,
}

export const runnerSlice = createSlice({
  name: "runner",
  initialState,
  reducers: {
    setRunnerList(state, action: PayloadAction<JobList>) {
      state.runnerList = action.payload
      state.filteredRunnerList = action.payload
    },

    toggleSelection: (state, action: PayloadAction<string>) => {
      const name = action.payload

      if (state.filteredRunnerList.includes(name)) {
        state.filteredRunnerList = state.filteredRunnerList.filter((runner) => runner !== name)
      } else {
        state.filteredRunnerList.push(name)
      }
    },
    selectAll: (state, action: PayloadAction<RunnerList>) => {
      const filteredRunnerList: RunnerList = action.payload
      filteredRunnerList.map((runner) => {
        if (!state.filteredRunnerList.includes(runner.name)) {
          state.filteredRunnerList.push(runner.name)
        }
      })
      state.selectAllChecked = true
    },
    clearAll: (state) => {
      state.filteredRunnerList = []
      state.isAllSelected = false
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload
    },
    setSearchCategoryIsOpen: (state, action: PayloadAction<bool>) => {
      state.searchCategoryIsOpen = action.payload
    },
    filterRunner: (state, action: PayloadAction<string>) => {
      const searchText = action.payload
      if (searchText === "") {
        state.filteredRunnerList = state.runnerList
        return
      }
      state.filteredRunnerList = state.runnerList.filter((runner) => runner[state.searchCategory]?.toLowerCase().includes(searchText.toLowerCase()))
    },
  },
})

export const { setRunnerList, selectAll, clearAll, toggleSelection, filterRunner, setSearchCategory } = runnerSlice.actions

export default runnerSlice.reducer
