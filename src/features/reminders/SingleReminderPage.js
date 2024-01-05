import React from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectReminderById,
  removeReminder,
  updateReminder,
} from './remindersSlice.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { ReminderNotFound } from './ReminderNotFound.js'

export const SingleReminderPage = () => {
  const { reminderId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reminder = useSelector((state) => selectReminderById(state, reminderId))

  if (reminder) {
    const dateComparer = format(reminder.date, 'MM/dd/yyyy').localeCompare(
      format(new Date().toString(), 'MM/dd/yyyy')
    )

    const dateTextClassnames = classnames('dateText', {
      overDue: dateComparer === -1 ? true : false,
    })

    const dueToday =
      dateComparer === 0 ? 'Today' : format(reminder.date, 'MM/dd/yyyy')

    return (
      <section className="reminder-container">
        <div className="reminder">
          <input
            type="checkbox"
            className="reminder-button"
            id="reminderCheck"
            checked={reminder.completed}
            aria-label="Completed"
            onChange={() =>
              dispatch(
                updateReminder({
                  id: reminder.id,
                  completed: !reminder.completed,
                })
              )
            }
          />

          <div className="reminder-details">
            <h2>{reminder.title}</h2>
            <p>{reminder.notes}</p>
            <p className={dateTextClassnames}>
              Due: {dueToday}, {format(reminder.date, 'hh:mm a')}
            </p>

            <Link className="link" to={`/editReminder/${reminderId}`}>
              Edit Reminder
            </Link>
          </div>

          <button
            className="reminder-button remove"
            onClick={() => {
              dispatch(removeReminder(reminder.id))
              navigate('/', { replace: true })
            }}
          >
            <i className="fa fa-trash-o" aria-label="Remove"></i>
          </button>
        </div>
      </section>
    )
  } else {
    return <ReminderNotFound />
  }
}
