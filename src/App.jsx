import { Outlet, NavLink } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { use } from 'react'
import { createSchedule } from './api/logic'

function App() {
  

  useEffect(() => {
    const scheduleId = window.localStorage.getItem('planner-scheduleId');
    if (scheduleId) {
      ""
    } else {
      createSchedule().then(s => {
        window.localStorage.setItem('planner-scheduleId', s.id);
      })
    }
  }, [])

  return (
    <div className="app-root">
      <main style={{padding: 16}}>
        <Outlet />
      </main>
    </div>
  )
}

export default App
