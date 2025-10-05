import React from 'react'
import './SubtaskPill.css'

export default function SubtaskPill({ id, title, eventId }) {
  const handleClick = () => {
    const detail = { id: eventId || id }
    console.log("DISPATCHING", detail)
    window.dispatchEvent(new CustomEvent('highlight-event', { detail }))
  }

  return (
    <button type="button" className="subtask-pill" onClick={handleClick}>
      {title}
    </button>
  )
}
