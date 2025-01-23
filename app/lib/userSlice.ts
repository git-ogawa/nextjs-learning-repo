import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserList } from "@/app/types/user"

interface UserState {
  userList: UserList
  filteredUserList: UserList
  isAllSelected: boolean
  searchCategory: string
  searchCategoryIsOpen: bool
}

const initialState: UserState = {
  userList: [],
  filteredUserList: [],
  isAllSelected: false,
  searchCategory: "userName",
  searchCategoryIsOpen: false,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList(state, action: PayloadAction<JobList>) {
      state.userList = action.payload
      state.filteredUserList = action.payload
    },

    toggleSelection: (state, action: PayloadAction<string>) => {
      const name = action.payload

      if (state.filteredUserList.includes(name)) {
        state.filteredUserList = state.filteredUserList.filter((user) => user !== name)
      } else {
        state.filteredUserList.push(name)
      }
    },
    selectAll: (state, action: PayloadAction<UserList>) => {
      const filteredUserList: UserList = action.payload
      filteredUserList.map((user) => {
        if (!state.filteredUserList.includes(user.name)) {
          state.filteredUserList.push(user.name)
        }
      })
      state.selectAllChecked = true
    },
    clearAll: (state) => {
      state.filteredUserList = []
      state.isAllSelected = false
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.searchCategory = action.payload
    },
    setSearchCategoryIsOpen: (state, action: PayloadAction<bool>) => {
      state.searchCategoryIsOpen = action.payload
    },
    filterUser: (state, action: PayloadAction<string>) => {
      const searchText = action.payload
      if (searchText === "") {
        state.filteredUserList = state.userList
        return
      }
      state.filteredUserList = state.userList.filter((user) =>
        user[state.searchCategory]?.toLowerCase().includes(searchText.toLowerCase()),
      )
    },
  },
})

export const { setUserList, selectAll, clearAll, toggleSelection, filterUser, setSearchCategory } =
  UserSlice.actions

export default UserSlice.reducer
