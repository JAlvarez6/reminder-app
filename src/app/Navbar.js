import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <Link to={'/'}>
          <h1>Reminders</h1>
        </Link>
      </section>
    </nav>
  )
}
