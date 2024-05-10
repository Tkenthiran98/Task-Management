import React from 'react';

const Task = ({ task, onTaskSelect, onDelete }) => {
  return (
    <li onClick={() => onTaskSelect(task)}>
      {task.title} - {task.status}
      <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</button>
    </li>
  );
};

export default Task;
