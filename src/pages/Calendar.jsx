import { NavLink } from 'react-router-dom'
import CalendarWeek from '../components/calendar/CalendarWeek'
import Task from '../components/task/Task'

import { sampleSubtasks } from '../util/constants'
import { subtaskListToEvents } from '../util/helpers'

const sampleEvents = subtaskListToEvents(sampleSubtasks)

export default function Calendar() {
  return (
    <div>
      <nav className="page-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
          Home
        </NavLink>
      </nav>
      <div className='row'>
        <Task taskId={1}/>
        <CalendarWeek events={sampleEvents} />
      </div>
    </div>
  )
}
