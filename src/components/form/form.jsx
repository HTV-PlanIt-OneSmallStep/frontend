import React from 'react';
import { NavLink } from 'react-router-dom';
import './form.css';


export default function Form({ closeForm, showForm }) {
    const[deadline, setDeadline] = React.useState(true);

    return (
        <form className={showForm ? "add-task-form" : "add-task-form hidden"}>
            <h3>Add Task</h3>

            <label htmlFor="Name"><b>Task Name</b></label>
            <input type="text" placeholder="Enter Task Name" name="Name" required />

            <label htmlFor="deadline"><b>Add Deadline</b></label>
            <input type="checkbox" />

            <label htmlFor="start"><b>{deadline ? "Start Date" : "Date"}</b></label>
            <input type="date" name="beginDate" value="" min="2025-10-04"/>
            <input type="time" name="beginTime" />

            <div>
                <label htmlFor='end' >End Date</label>
                <input type="date" name="endDate" value="" min="2025-10-04"/>
                <input type="time" name="endTime" />
            </div>


            <label htmlFor="psw"><b>Context</b></label>
            <p>What details about this event/project can you give?</p>
            <textarea id="context" name="context" rows="4" cols="50" />

            <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
                Generate Schedule
            </NavLink>
            <button type="button" className="Close" onClick={closeForm}>Close Form</button>
        </form>
  );
}
