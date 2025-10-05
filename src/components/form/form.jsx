import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './form.css';


export default function Form({ closeForm, showForm }) {

    const [formData, setFormData] = useState({
        taskName: "Enter Task Name",
        addDeadline: false,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        context: ""
    });

    function handleDeadline() {
        setFormData(prevData => ({
            ...prevData,
            addDeadline: !formData.addDeadline
        }));
    }

    function handleNameChange() {
        setFormData(prevData => ({
            ...prevData,
            taskName: document.getElementById("task-name").value
        }));
    }

    function handleStartDateChange() {
        setFormData(prevData => ({
            ...prevData,
            startDate: document.getElementById("start-date").value
        }));
    }

    function handleEndDateChange() {
        setFormData(prevData => ({
            ...prevData,
            endDate: document.getElementById("end-date").value
        }));
    }

    function handleStartTimeChange() {
        setFormData(prevData => ({
            ...prevData,
            startTime: document.getElementById("start-time").value
        }));
    }

    function handleEndTimeChange() {
        setFormData(prevData => ({
            ...prevData,
            endTime: document.getElementById("end-time").value
        }));
    }

    function showEndDateTime() {
        return (
            <div className='end-date-time-row' id="end-date-tme-row">
                <label htmlFor='end' >End Date </label>
                <input type="date" name="endDate" id="end-date" value={formData.EndDate} min={getCurrentDate} onChange={handleEndDateChange}/>
                <input type="time" name="endTime" id="end-time" value={formData.EndTime} onInput={handleEndTimeChange} />
            </div>
        )
    }

    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate();
        return day;
    }

    return (
        <form className={showForm ? "add-task-form" : "add-task-form hidden"}>
            <h3>Add Task</h3>

            <label htmlFor="Name"><b>Task Name</b></label>
            <input type="text" id="task-name" placeholder={formData.taskName} name="Name" onInput={handleNameChange} required />

            <label htmlFor="deadline"><b>Add Deadline</b></label>
            <input type="checkbox" id="deadline-checkbox" onClick={handleDeadline} />

            <div className="date-time-row">
                <div className='start-date-time-row'>
                    <label htmlFor="start">
                        <b>{formData.addDeadline ? "Start Date" : "Date"}</b>
                    </label>
                    <input type="date" name="beginDate" value={formData.startDate} id="start-date" min="2025-10-05" onChange={handleStartDateChange}/>
                    <input type="time" name="beginTime" id="start-time" onInput={handleStartTimeChange}/>
                    <div className="time-dropdown-wrapper">

                        {/* <div id="time-dropdown" className="dropdown-content">
                            {Array.from({ length: 24 }, (_, i) => (
                                <button key={i}>{i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`}</button>
                            ))}
                        </div> */}
                    </div>
                </div>

                {formData.addDeadline && showEndDateTime()}


            </div>





            <label htmlFor="context"><b>Context</b></label>
            <p>What details about this event/project can you give?</p>
            <textarea id="context" name="context" rows="5" cols="50" />

            <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
                Generate Schedule
            </NavLink>
            <button type="button" className="Close" onClick={closeForm}>Close Form</button>
        </form>
  );
}
