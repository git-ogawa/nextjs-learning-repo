/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore } from "@reduxjs/toolkit"
import jobReducer from "./jobSlice"
import runnerReducer from "./runnerSlice"
import currentUserReducer from "./currentUserSlice"
import templateReducer from "./templateSlice"
import tableReducer from "./tableSlice"

export const store = configureStore({
  reducer: {
    job: jobReducer,
    runner: runnerReducer,
    currentUser: currentUserReducer,
    template: templateReducer,
    table: tableReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
