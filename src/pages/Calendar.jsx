import { NavLink, useParams } from 'react-router-dom'
import CalendarWeek from '../components/calendar/CalendarWeek'
import Task from '../components/task/Task'

import { sampleSubtasks } from '../util/constants'
import { subtaskListToEvents } from '../util/helpers'

import { useState, useEffect } from 'react'
import { getTasksInTimestampRange } from '../api/logic.js'

const sampleEvents = subtaskListToEvents(sampleSubtasks)

// const events = useState([])

export default function Calendar() {

  const { scheduleId } = useParams();
  const [events, setEvents] = useState([])
  const [week, setWeeks] = useState(['2025-12-01', '2025-12-07'])

  const [taskId, setTaskId] = useState(null);

  const refreshTasks = async () => {
    const tasks = await getTasksInTimestampRange(scheduleId, week[0], week[1]);
    console.log(tasks)
    setEvents(tasks)
    setTaskId(!taskId && tasks.length > 0 ? tasks[tasks.length - 1]?.parent.id : taskId);
  }

  useEffect(() => {
    refreshTasks();
  }, [scheduleId, week])

  return (
    <div>
      <nav className="page-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
          Home
        </NavLink>
      </nav>
      <div className='row'>
        <Task taskId={taskId} scheduleId={scheduleId}/>
        <CalendarWeek events={events} setWeeks={setWeeks} setTaskId={setTaskId}/>
      </div>
    </div>
  )
}
