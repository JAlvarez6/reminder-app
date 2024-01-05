import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ReminderNotFound = () => {
  const navigate = useNavigate()

  return (
    <section>
      <button
        type="button"
        className="notFoundButton"
        onClick={() => navigate('/')}
      >
        Back
      </button>
      <div>
        <h1 className="notFoundText">Reminder Not Found</h1>
      </div>
    </section>
  )
}
