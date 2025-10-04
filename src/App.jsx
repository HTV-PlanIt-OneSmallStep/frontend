import { Outlet, NavLink } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app-root">
      <main style={{padding: 16}}>
        <Outlet />
      </main>
    </div>
  )
}

export default App
