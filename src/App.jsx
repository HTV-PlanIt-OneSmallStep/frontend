import { Outlet, NavLink } from 'react-router-dom'
import dotenv from 'dotenv'
import './App.css'

dotenv.config();

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
