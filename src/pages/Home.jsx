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
        <div className='homepage-button-container'  style={{marginTop: 20}}>
          <div>
            <button className='homepage-button' onClick={() => openForm()}>
              <div class="rocket" style={{marginRight: 10}} /> Add Task
            </button>
          </div>
          {showForm && <Form closeForm={closeForm} showForm={showForm} />}
          <nav style={{marginTop: 10}}>
            <NavLink to={`/calendar/${window.localStorage.getItem('planner-scheduleId')}`} className={({isActive}) => isActive ? 'active' : ''}>
              <button className='homepage-button'>
                <div class="moon" style={{marginRight: 10}} /> Calendar
              </button>
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}
