import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../components/form/form.jsx';

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
      <div>
        <h2>Welcome to Planit</h2>
        <p>This is the home page where you can see quick stats and add tasks.</p>
        <div>
          <button className='add task' onClick={() => openForm()}>
            Add Task
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
