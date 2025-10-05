import React from 'react';
import './Task.css';
import SubtaskPill from './SubtaskPill';
import { sampleTask, sampleSubtasks } from '../../util/constants'


function isOverdue(dueDate) {
  return new Date(dueDate) < new Date();
}

const Task = ({ taskId }) => {
  const { name, context: description } = sampleTask; // getTask(taskId);
  const subtasks = sampleSubtasks; // getSubtasksById(taskId);

  return (
    <div className="task-outer">
      <h2>{name}</h2>
      <p>{description}</p>
      <h4>Subtasks</h4>
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
    </div>
  );
}

export default Task;