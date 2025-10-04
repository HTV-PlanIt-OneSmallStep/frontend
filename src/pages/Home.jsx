import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h2>Welcome to Planit</h2>
      <p>This is the home page where you can see quick stats and add tasks.</p>

      <nav>
        <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
          Calendar
        </NavLink>
      </nav>
    </div>
  )
}
