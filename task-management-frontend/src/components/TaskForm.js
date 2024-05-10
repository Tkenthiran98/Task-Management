import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './TaskForm.css';
import EditTaskPopup from './EditTaskPopup';
import './EditTaskPopup.css';

const TaskForm = ({ onCreate, onUpdate, onDelete, onCancel }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [formErrors, setFormErrors] = useState({ teamMemberName: '', title: '', description: '', status: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamMemberFilter, setTeamMemberFilter] = useState('');
  const [teamMemberName, setTeamMemberName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const fetchAllTasks = useCallback(async () => {
    try {
      let url = 'http://localhost:8080/api/v1/taskmanagement/all';
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (teamMemberFilter) {
        params.teamMember = teamMemberFilter;
      }
      const response = await axios.get(url, { params });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [statusFilter, teamMemberFilter]);
  

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const taskData = { teamMemberName, title, description, status };

      try {
        await axios.post('http://localhost:8080/api/v1/taskmanagement/create', taskData);
        setSuccessMessage('Your Task added successfully');
        onCreate(taskData);
        fetchAllTasks();
      } catch (error) {
        setErrorMessage('Error adding task');
        console.error('Error creating task:', error);
      }

      setTitle('');
      setDescription('');
      setTeamMemberName('');
      setStatus('');
    }
  };

  const validateForm = () => {
    let errors = { teamMemberName: '', title: '', description: '', status: '' };
    let isValid = true;

    if (!title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (status === 'select') {
      errors.status = 'Please select a status';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/taskmanagement/delete-by-id/${taskId}`);
      setSuccessMessage('Task deleted successfully');
      fetchAllTasks();
    } catch (error) {
      setErrorMessage('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (task) => {
    try {
      const updatedTaskData = { teamMemberName, title, description, status }; 
      await axios.put(`http://localhost:8080/api/v1/taskmanagement/update-by-id/${task.id}`, updatedTaskData);
      setSuccessMessage('Task updated successfully');
      onUpdate(updatedTaskData);
      fetchAllTasks();
    } catch (error) {
      setErrorMessage('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setStatus('');
  };

  const handleEditCancel = () => {
    setEditedTask(null);
    setShowEditPopup(false);
  };

  return (
    <div className="task-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h2 className="task-form-title">Add Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label className="form-label">Team Member Name:</label>
          <input type="text" value={teamMemberName} onChange={(e) => setTeamMemberName(e.target.value)} className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
          {formErrors.title && <span className="error">{formErrors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
          {formErrors.description && <span className="error">{formErrors.description}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
            <option value="select">Please select</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {formErrors.status && <span className="error">{formErrors.status}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Add Task</button>
          <button type="button" onClick={handleClear} className="btn btn-secondary">Clear</button>
        </div> 
      </form>

      <div className="filter-controls">
  <div className="filter-item">
    <label htmlFor="statusFilter">Status:</label>
    <select
      id="statusFilter"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="filter-select"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <div className="filter-item">
    <label htmlFor="teamMemberFilter">Team Member:</label>
    <input
      id="teamMemberFilter"
      type="text"
      value={teamMemberFilter}
      onChange={(e) => setTeamMemberFilter(e.target.value)}
      placeholder="Filter by team member..."
      className="filter-input"
    />
  </div>
</div>

      <div className="task-list-container">
        <h2 className="task-list-title">All Tasks</h2>
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty-task">No tasks available.</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className="task-item">
                <div className="task-details">
                  <p className="task-label">Assign Team Member Name:</p>
                  <p>{task.teamMemberName}</p>
                  <p className="task-label">Title:</p>
                  <p>{task.title}</p>
                  <p className="task-label">Description:</p>
                  {task.showDescription ? (
                    <div>
                      <p style={{ textAlign: 'justify' }}>{task.description}</p>
                      <button
                        className="btn btn-show-more"
                        onClick={() => {
                          const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, showDescription: false } : t);
                          setTasks(updatedTasks);
                        }}
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p style={{ textAlign: 'justify' }}>{task.description.split(' ').slice(0, 55).join(' ')}</p>
                      {task.description.split(' ').length > 55 && (
                        <button
                          className="btn btn-show-more"
                          onClick={() => {
                            const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, showDescription: true } : t);
                            setTasks(updatedTasks);
                          }}
                        >
                          Show More
                        </button>
                      )}
                    </div>
                  )}

                  <p className="task-label">Status:</p>
                  <p className={`task-status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </p>
                </div>
                <div className="task-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (task.editing) {
                        handleEdit(task);
                      } else {
                        setEditedTask(task);
                        setShowEditPopup(true);
                      }
                    }}
                    className={`btn ${task.editing ? 'btn-success' : 'btn-primary'}`}
                  >
                    {task.editing ? 'Save' : 'Edit'}
                  </button>
                  {!task.editing && (
                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {showEditPopup && (
        <EditTaskPopup
          task={editedTask}
          onUpdate={(updatedTask) => {
            handleEditCancel();
            onUpdate(updatedTask);
          }}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default TaskForm;
