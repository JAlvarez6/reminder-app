import React from 'react'
import { AddReminderForm } from '../features/reminders/AddReminderForm'
import { RemindersList } from '../features/reminders/RemindersList'

export const Homepage = () => {
  return (
    <section className="reminders-Container">
      <AddReminderForm />
      <RemindersList />
    </section>
  )
}
