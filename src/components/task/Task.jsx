import React from 'react';
import './Task.css';
import SubtaskPill from './SubtaskPill';
import { sampleTask, sampleSubtasks } from '../../util/constants'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubtasksByTaskId, getTaskById } from '../../api/logic';

function isOverdue(dueDate) {
  return new Date(dueDate) < new Date();
}

const Task = ({ taskId, refresh, events }) => {
  const { name, context: description } = sampleTask; // getTask(taskId);
  const [subtasks, setSubtasks] = useState([])
  const { scheduleId } = useParams();
  const [task, setTask] = useState({});
  const refreshSubtasks = async () => {
    if (!taskId) return;
    const t = await getSubtasksByTaskId(scheduleId, taskId);
    console.log("Got Subtasks", t)
    setSubtasks(t || []);
  }

  const refreshTask = async () => {
    if (!taskId) return;
    const t = await getTaskById(scheduleId, taskId);
    setTask(t || {});
    console.log(t)
  }

  useEffect(() => {
    console.log("TASK ID CHANGED", taskId)
    refreshTask()
    refreshSubtasks()
  }, [taskId]);

  return (
    <div className="task-outer">
      {
        taskId ?
      <>
        <h2 className='header'>{task.name}</h2>
        <p className='text-white'>{task.context}</p>
        <h4 className='subheader'>Subtasks</h4>
        <div className="subtask-list">
          {subtasks?.map(subtask => (
            <SubtaskPill
              key={subtask.eventId}
              id={subtask.eventId}
              title={subtask.name}
              eventId={subtask.eventId}
            />
          ))}
        </div>
      </>
      : <div className='header text-white no-task-text'><h4>No task selected</h4></div>
      }

    </div>
  );
}

export default Task;