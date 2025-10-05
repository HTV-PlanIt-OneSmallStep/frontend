import React, { useState } from 'react';
import './form.css';
import './../../index.css';
import { generatePlan } from '../../api/logic';

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

    const [isLoading, setIsLoading] = useState(false);

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

    function showEndDate() {
        return (
            <input type="date" name="endDate" id="end-date" value={formData.EndDate} min={formData.startDate} onChange={handleEndDateChange}/>
        )
    }

    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate();
        return day;
    }

    function handleContextChange() {
        setFormData(prevData => ({
            ...prevData,
            context: document.getElementById("context").value
        }));
    }

    const generateNewPlan = async (event, taskName, context, startDate, startTime, endDate, endTime)=> {
        event.preventDefault();
        setIsLoading(true);
        if (endDate === "" | endDate === null) {
            endDate = startDate;
        }

        const deadline = endDate && endTime ? `${endDate}T${endTime}` : endDate ? `${endDate}T23:59` : null;
        const startDateTime = startDate && startTime ? `${startDate}T${startTime}` : startDate ? `${startDate}T23:59` : null;
        console.log("deadline:", deadline)  
        console.log("endDate:", endDate)
        console.log("endTime:", endTime)
        const scheduleId = window.localStorage.getItem('planner-scheduleId');
        try {
            await generatePlan(scheduleId, taskName, context, startDateTime, deadline)
            setIsLoading(false);
            closeForm();
              
        } catch (error) {
            console.error("Error generating plan:", error);
        } 
    } 

    return (
        <form className={showForm ? "add-task-form" : "add-task-form hidden"}>
            <h3 className='homepage-title'>Add Task</h3>
            <div className="form-body">
                <div className='task-section'>
                    <label htmlFor="Name" className='input-label'><b>Task Name  </b></label>
                    <input type="text" id="task-name" className='input-text' placeholder={formData.taskName} name="Name\t" onInput={handleNameChange} required />
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
                            <b>{formData.addDeadline ? "Start Date" : "Start Time"}</b>
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
                    <div className='date-time-row' id="end-date-tme-row">
                        <label htmlFor='end' className='input-label'> <b>{formData.addDeadline ? "End Date" : "End Time" }</b> </label>
                        {formData.addDeadline && showEndDate()}
                        <input type="time" name="endTime" id="end-time" value={formData.EndTime} onInput={handleEndTimeChange} />
                    </div>

                </div>
            </div>


            <div className='task-section'>
                <label htmlFor="context" className='input-label'><b>Context</b></label>
                <p>What details about this event/project can you give?</p>
                <textarea id="context" name="context" rows="5" cols="50" onInput={handleContextChange} />
            </div>
            <div className='task-section'>
                <button type="button" className={({isActive}) => isActive ? 'active' : ''} 
                    onClick={() => generateNewPlan(event, formData.taskName, formData.context, formData.startDate, formData.startTime, formData.endDate, formData.endTime)}
                    disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Generate Schedule'}
                </button>
                <button type="button" className="Close" onClick={closeForm}>Close Form</button>
            </div>
        </form>
  );
}
