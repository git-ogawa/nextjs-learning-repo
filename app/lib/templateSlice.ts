import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TemplateList } from "@/app/types/template"

interface TemplateState {
  templateList: TemplateList
  filteredTemplateList: TemplateList
  isAllSelected: boolean
  searchCategory: string
  searchCategoryIsOpen: bool
}

const initialState: TemplateState = {
  templateList: [],
  filteredTemplateList: [],
  isAllSelected: false,
  searchCategory: "templateName",
  searchCategoryIsOpen: false,
}

export const TemplateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplateList(state, action: PayloadAction<JobList>) {
      state.templateList = action.payload
      state.filteredTemplateList = action.payload
    },

    toggleSelection: (state, action: PayloadAction<string>) => {
      const name = action.payload

      if (state.filteredTemplateList.includes(name)) {
        state.filteredTemplateList = state.filteredTemplateList.filter((template) => template !== name)
      } else {
        state.filteredTemplateList.push(name)
      }
    },
    selectAll: (state, action: PayloadAction<TemplateList>) => {
      const filteredTemplateList: TemplateList = action.payload
      filteredTemplateList.map((template) => {
        if (!state.filteredTemplateList.includes(template.name)) {
          state.filteredTemplateList.push(template.name)
        }
      })
      state.selectAllChecked = true
    },
    clearAll: (state) => {
      state.filteredTemplateList = []
      state.isAllSelected = false
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload
    },
    setSearchCategoryIsOpen: (state, action: PayloadAction<bool>) => {
      state.searchCategoryIsOpen = action.payload
    },
    filterTemplate: (state, action: PayloadAction<string>) => {
      const searchText = action.payload
      if (searchText === "") {
        state.filteredTemplateList = state.templateList
        return
      }
      state.filteredTemplateList = state.templateList.filter((template) => template[state.searchCategory]?.toLowerCase().includes(searchText.toLowerCase()))
    },
  },
})

export const { setTemplateList, selectAll, clearAll, toggleSelection, filterTemplate, setSearchCategory } = TemplateSlice.actions

export default TemplateSlice.reducer
