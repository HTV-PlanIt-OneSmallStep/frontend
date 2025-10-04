import React from 'react';
import { NavLink } from 'react-router-dom';
import './form.css';


export default function Form({ closeForm, showForm }) {
    const[deadline, setDeadline] = React.useState(false);

    return (
        <form action="/action_page.php" className={showForm ? "add-task-form" : "add-task-form hidden"}>
            <h3>Add Task</h3>

            <label htmlFor="Name"><b>Task Name</b></label>
            <input type="text" placeholder="Enter Task Name" name="Name" required />

            <label htmlFor="deadline"><b>Add Deadline</b></label>
            <input type="checkbox" />

            <label htmlFor="start"><b>{deadline ? "Start Date" : "Date"}</b></label>
            <input type="date" name="begin" value="" min="2025-10-04"/>

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />

            <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
                Generate Schedule
            </NavLink>
            <button type="button" className="Close" onClick={closeForm}>Close Form</button>
        </form>
  );
}
