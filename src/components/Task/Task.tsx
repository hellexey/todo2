import React, { useState } from 'react'
import { FilterType } from '../TaskFilter/TaskFilter'

interface TaskProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newTask: string) => void;
  filter: FilterType;

}

const Task: React.FC<TaskProps> = ({ task, completed, onToggle, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    if (editedTask.trim() !== '') {
      onEdit(editedTask)
    }
    setEditMode(false)
    setEditedTask(editedTask)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && editedTask) {
      handleSave()
    }
  }

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
          <input className='toggle' type='checkbox' onClick={onToggle} />
          <label>
            <span className='description'>{editedTask}</span>
          </label>
          <button className='icon icon-edit' onClick={handleEdit}></button>
          <button className='icon icon-destroy' onClick={onDelete}></button>
        </div>
      </li>
    )
  )
}

export default Task
