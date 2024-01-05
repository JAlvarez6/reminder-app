import React from 'react'
import { Navbar } from './app/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SingleReminderPage } from './features/reminders/SingleReminderPage'
import { EditReminderForm } from './features/reminders/EditReminderForm'
import { Homepage } from './app/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:reminderId" element={<SingleReminderPage />} />
          <Route
            path="/editReminder/:reminderId"
            element={<EditReminderForm />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
