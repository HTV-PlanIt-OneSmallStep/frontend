import { NavLink } from 'react-router-dom'
import CalendarWeek from '../components/calendar/CalendarWeek'

const sampleEvents = [
  { id: 'e1', date: new Date().toISOString().slice(0,10), title: 'Math HW', start: '09:00', end: '10:00' },
  { id: 'e2', date: new Date().toISOString().slice(0,10), title: 'English Essay', start: '13:30', end: '15:00' },
  // next day
  { id: 'e3', date: (() => { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10) })(), title: 'Group Study', start: '18:00', end: '20:00' },
]

export default function Calendar() {
  return (
    <div>
      <nav>
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
          Home
        </NavLink>
      </nav>
    <h2>Calendar</h2>
    <CalendarWeek events={sampleEvents} />
    </div>
  )
}
