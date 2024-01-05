import { configureStore } from '@reduxjs/toolkit'
import remindersReducer from '../features/reminders/remindersSlice.js'

export const store = configureStore({
  reducer: {
    reminders: remindersReducer,
  },
})
