import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/app/types/User"

interface currentUserState {
  currentUser: User
}

const initialState: currentUserState = {
  currentUser: {
    id: 1,
    name: "admin",
    email: "admin",
    role: "admin",
  },
}

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = currentUserSlice.actions

export default currentUserSlice.reducer
