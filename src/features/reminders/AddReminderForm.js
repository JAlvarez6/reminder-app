import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addReminder } from './remindersSlice'

export const AddReminderForm = () => {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const dispatch = useDispatch()

  const canAdd = !Boolean(title) || !Boolean(date) || !Boolean(time)

  const onAddReminder = (e) => {
    e.preventDefault()

    if (!title || !date || !time) {
      return
    }

    dispatch(addReminder({ title, notes, date, time }))

    setTitle('')
    setNotes('')
    setDate('')
    setTime('')
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="reminderTitle">Title:</label>
        <input
          type="text"
          name="title"
          id="reminderTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reminderNotes">Notes:</label>
        <textarea
          type="text"
          name="notes"
          id="reminderNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="date-time-container">
        <div className="form-group date-time">
          <label htmlFor="reminderDate">Date:</label>
          <input
            type="date"
            name="date"
            id="reminderDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group date-time">
          <label htmlFor="reminderTime">Time:</label>
          <input
            type="time"
            name="time"
            id="reminderTime"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>

      <button onClick={onAddReminder} disabled={canAdd}>
        Add Reminder
      </button>
    </form>
  )
}
