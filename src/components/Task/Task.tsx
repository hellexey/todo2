import React, { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { FilterType } from '../TaskFilter/TaskFilter'

interface TaskProps {
  task: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
  onEdit: (task: string) => void
  filter: FilterType
  created: string
  timer: { hours: number; minutes: number; seconds: number }
}

const Task: React.FC<TaskProps> = ({ task, completed, onToggle, onDelete, onEdit, created, timer }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timer)

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(interval)
            setTimerRunning(false)
            return prevTime
          }
          if (prevTime.seconds > 0) {
            return {
              ...prevTime,
              seconds: prevTime.seconds - 1,
            }
          } else if (prevTime.minutes > 0) {
            return {
              ...prevTime,
              minutes: prevTime.minutes - 1,
              seconds: 59,
            }
          } else {
            return {
              ...prevTime,
              hours: prevTime.hours - 1,
              minutes: 59,
              seconds: 59,
            }
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

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

  const handlePlay = () => {
    setTimerRunning(true)
  }

  const handlePause = () => {
    setTimerRunning(false)
  }

  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    const hours = time.hours < 10 ? `0${time.hours}` : time.hours
    const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes
    const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds
    return `${hours}:${minutes}:${seconds}`
  }

  return editMode ? (
    <form>
      <input
        className="edit"
        type="text"
        value={editedTask}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        autoFocus
        required={true}
      />
    </form>
  ) : (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onToggle} />
        <label>
          <span className="created">{editedTask}</span>
          <span className="description">
            <button className="icon icon-play" onClick={handlePlay} />
            <button className="icon icon-pause" onClick={handlePause} />
            {formatTime(timeRemaining)}
          </span>
          <span className="description">
            {' '}
            created{' '}
            {formatDistanceToNow(new Date(created), {
              includeSeconds: true,
              addSuffix: true,
            })}{' '}
          </span>
        </label>

        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    </li>
  )
}

export default Task
