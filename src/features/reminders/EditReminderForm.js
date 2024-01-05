import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectReminderById, updateReminder } from './remindersSlice'
import { format } from 'date-fns'
import { ReminderNotFound } from './ReminderNotFound'

export const EditReminderForm = () => {
  const { reminderId } = useParams()
  const reminder = useSelector((state) => selectReminderById(state, reminderId))

  const [title, setTitle] = useState(reminder?.title)
  const [notes, setNotes] = useState(reminder?.notes)
  const [date, setDate] = useState(
    reminder ? format(reminder.date, 'yyyy-MM-dd') : ''
  )
  const [time, setTime] = useState(
    reminder ? format(reminder?.date, 'HH:mm') : ''
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const canAdd = !Boolean(title) || !Boolean(date) || !Boolean(time)

  if (reminder) {
    return (
      <section className="reminders-container">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault()

            dispatch(
              updateReminder({
                id: reminderId,
                title,
                notes,
                date: new Date(date + ' ' + time).toString(),
              })
            )

            setTitle('')
            setNotes('')
            setDate('')
            setTime('')

            navigate(`/${reminderId}`, { replace: true })
          }}
        >
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

          <div className="editButtonsContainer">
            <button type="submit" disabled={canAdd}>
              Update Reminder
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    )
  } else {
    return <ReminderNotFound />
  }
}
