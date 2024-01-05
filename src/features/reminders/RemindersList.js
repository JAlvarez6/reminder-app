import React, { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllReminders,
  removeReminder,
  updateReminder,
} from './remindersSlice'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

const ReminderExcerpt = memo(function ReminderExcerpt({ reminder }) {
  const dispatch = useDispatch()

  const dateComparer = format(reminder.date, 'MM/dd/yyyy').localeCompare(
    format(new Date().toString(), 'MM/dd/yyyy')
  )

  const dateTextClassnames = classnames('dateText', {
    overDue: dateComparer === -1 ? true : false,
  })

  const dueToday =
    dateComparer === 0 ? 'Today' : format(reminder.date, 'MM/dd/yyyy')

  return (
    <div className="reminder">
      <input
        type="checkbox"
        className="reminder-button"
        id="reminderCheck"
        aria-label="Completed"
        checked={reminder.completed}
        onChange={() =>
          dispatch(
            updateReminder({ id: reminder.id, completed: !reminder.completed })
          )
        }
      />

      <div className="reminder-details">
        <h2>{reminder.title.substring(0, 30)}</h2>
        <p>
          {reminder.notes.substring(0, 100) +
            (reminder.notes.length > 100 ? '...' : '')}
        </p>
        <p className={dateTextClassnames}>
          Due: {dueToday}, {format(reminder.date, 'hh:mm a')}
        </p>

        <Link className="link" to={`/${reminder.id}`}>
          View Reminder
        </Link>
      </div>

      <button
        className="reminder-button remove"
        onClick={() => dispatch(removeReminder(reminder.id))}
      >
        <i className="fa fa-trash-o" aria-label="Remove"></i>
      </button>
    </div>
  )
})

export const RemindersList = () => {
  const reminders = useSelector((state) => selectAllReminders(state))
  const [reminderFilter, setReminderFilter] = useState('Show All')

  const sortedReminders = reminders.slice()

  sortedReminders.sort((a, b) => {
    return format(a.date, 'yyyy/MM/dd').localeCompare(
      format(b.date, 'yyyy/MM/dd')
    )
  })

  const content = sortedReminders
    .filter((reminder) => {
      switch (reminderFilter) {
        case 'Show All':
          return reminder
        case 'Show Completed':
          return reminder.completed
        case 'Show Incompleted':
          return !reminder.completed
        default:
          return reminder
      }
    })
    .map((reminder) => {
      return <ReminderExcerpt key={reminder.id} reminder={reminder} />
    })

  return (
    <>
      <div className="reminderFiltersContainer">
        <select
          id="reminderFilters"
          className="reminderFiltersButton"
          onChange={(e) => setReminderFilter(e.target.value)}
        >
          <option value={'Show All'}>Show All</option>
          <option value={'Show Completed'}>Show Completed</option>
          <option value={'Show Incompleted'}>Show Incompleted</option>
        </select>
      </div>
      {content}
    </>
  )
}
