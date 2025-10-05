import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../components/form/form.jsx';
import './../index.css'

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  function openForm() {
    setShowForm(true);
    return <Form />;
  }

  function closeForm() {
    setShowForm(false);}



  return (
    <>
      <div className='homepage-body'>
        <div class="planet" />
        <h2 className='homepage-title'>Welcome to Planit</h2>
        <p>This is the home page where you can see quick stats and add tasks.</p>
        <div>
          <button className='homepage-button' onClick={() => openForm()}>
            <div class="rocket" />  Add Task
          </button>
        </div>
        {showForm && <Form closeForm={closeForm} showForm={showForm} />}
        <nav>
          <NavLink to={`/calendar/${window.localStorage.getItem('planner-scheduleId')}`} className={({isActive}) => isActive ? 'active' : ''}>
            Calendar
          </NavLink>
        </nav>
      </div>
    </>
  );
}
