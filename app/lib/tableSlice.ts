import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface tableState {
  item: any[]
  sortedItem: any[]
  selectedItem: any[]
  selectAll: boolean
  sortConfig: { key: string; direction: "ascending" | "descending" } | null
  currentPage: number
  itemsPerPage: number
}

const initialState: tableState = {
  item: [],
  sortedItem: [],
  selectedItem: [],
  selectAll: false,
  sortConfig: null,
  currentPage: 1,
  itemsPerPage: 25,
}

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<any[]>) => {
      state.item = action.payload
    },
    selectItem: (state, action: PayloadAction<any>) => {
      const item = action.payload

      if (state.selectedItem.some((selected) => selected.id === item.id)) {
        state.selectedItem = state.selectedItem.filter((selected) => selected.id !== item.id)
      } else {
        state.selectedItem.push(item)
      }
    },
    setSelectAll: (state) => {
      if (!state.selectAll) {
        state.selectedItem = state.item
        state.selectAll = true
      } else {
        state.selectedItem = []
        state.selectAll = false
      }
    },
    clearAll: (state) => {
      state.selectedItem = []
    },
    setSortedItem: (state, action: PayloadAction<{ key: string; direction: "ascending" | "descending" }>) => {
      const { key, direction } = action.payload
      state.sortConfig = { key, direction }

      const sortedArray = [...state.item].sort((a, b) => {
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

      state.sortedItem = sortedArray
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
  },
})

export const { setItem, setSortedItem, selectItem, setSelectAll, clearAll, setCurrentPage, setItemsPerPage } = tableSlice.actions

export default tableSlice.reducer
