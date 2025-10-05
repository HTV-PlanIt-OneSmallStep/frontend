import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './form.css';
import './../../index.css';

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
            <div className='date-time-row' id="end-date-tme-row">
                <label htmlFor='end' className='input-label'> <b>End Date</b> </label>
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
            <h3 className='homepage-title'>Add Task</h3>
            <div className="form-body">
                <div className='task-section'>
                    <label htmlFor="Name" className='input-label'><b>Task Name  </b></label>
                    <input type="text" id="task-name" placeholder={formData.taskName} name="Name\t" onInput={handleNameChange} required />
                </div>
                <div className='task-section'>
                    <label htmlFor="deadline" className='input-label'><b>Add Deadline  </b></label>
                    <div className='toggle'>
                        <input type="checkbox"  id="deadline-checkbox" onClick={handleDeadline} />
                        <label></label>
                    </div>
                </div>

                <div >
                    <div className='date-time-row'>
                        <label htmlFor="start" className='input-label'>
                            <b>{formData.addDeadline ? "Start Date\t" : "Date\t"}</b>
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
            </div>


            <div className='task-section'>
                <label htmlFor="context" className='input-label'><b>Context</b></label>
                <p>What details about this event/project can you give?</p>
                <textarea id="context" name="context" rows="5" cols="50" />
            </div>
            <div className='task-section'>
                <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
                    Generate Schedule
                </NavLink>
                <button type="button" className="Close" onClick={closeForm}>Close Form</button>
            </div>
        </form>
  );
}
