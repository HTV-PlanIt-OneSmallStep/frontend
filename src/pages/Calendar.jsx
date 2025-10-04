import { NavLink } from 'react-router-dom'

export default function Calendar() {
  return (
    <div>
      <nav>
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
          Home
        </NavLink>
      </nav>
      <h2>Calendar</h2>
      <div style={{border: '1px dashed #ccc', padding: 12, marginTop: 8}}>
        <p style={{color: '#666'}}>No events yet.</p>
      </div>
    </div>
  )
}
