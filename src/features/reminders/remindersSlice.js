import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit'
import { format } from 'date-fns'

const remindersAdpater = createEntityAdapter({
  sortComparer: (a, b) => {
    return format(a.date, 'yyyy/MM/dd').localeCompare(
      format(b.date, 'yyyy/MM/dd')
    )
  },
})

export const fetchReminders = createAsyncThunk(
  'reminders/fetchReminders',
  async (data) => {
    return data
  }
)

const remindersSlice = createSlice({
  name: 'reminder',
  initialState: remindersAdpater.getInitialState(),
  reducers: {
    addReminder: {
      reducer: remindersAdpater.addOne,
      prepare: ({ title, notes, date, time }) => {
        const id = nanoid()
        const createdAt = format(new Date(), 'MM/dd/yyyy').toString()
        date = new Date(date + ' ' + time).toString()

        return {
          payload: {
            id,
            title,
            notes,
            date,
            createdAt,
            completed: false,
          },
        }
      },
    },
    updateReminder: remindersAdpater.upsertOne,
    removeReminder: remindersAdpater.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReminders.fulfilled, (state, action) => {
      remindersAdpater.setAll(state, action.payload)
    })
  },
})

export const { addReminder, updateReminder, removeReminder } =
  remindersSlice.actions

export default remindersSlice.reducer

export const {
  selectAll: selectAllReminders,
  selectById: selectReminderById,
  selectIds: selectReminderIds,
} = remindersAdpater.getSelectors((state) => state.reminders)
