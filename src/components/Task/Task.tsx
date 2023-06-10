import React, { useState } from 'react';
import { FilterType } from '../TaskFilter/TaskFilter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface TaskProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newTask: string) => void;
  filter: FilterType;
  created: string
}

const Task: React.FC<TaskProps> = ({ task, completed, onToggle, onDelete, onEdit, created }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  Task.defaultProps = {
    completed: false,
    created: ''
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    if (editedTask.trim() !== '') {
      onEdit(editedTask);
    }
    setEditMode(false);
    setEditedTask(editedTask);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && editedTask) {
      handleSave();
    }
  };

  return (
    editMode ? (
      <form>
        <input
          className='edit'
          type='text'
          value={editedTask}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
        />
      </form>
    ) : (
      <li className={completed ? 'completed' : ''}>
        <div className='view'>
          <input className='toggle' type='checkbox' defaultChecked={completed} onClick={onToggle} />
          <label>
            <span className='description'>{editedTask}</span>
            <span className='created'> created {formatDistanceToNow(new Date(created), {includeSeconds: true, addSuffix: true})} </span>
          </label>
          <button className='icon icon-edit' onClick={handleEdit}></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
      </li>
    )
  );
};

export default Task;