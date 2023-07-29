import React, { useState } from 'react'

interface NewTaskFormProps {
  onAddTask: (task: string, time: { hours: number; minutes: number; seconds: number }) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('')
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim() !== '') {
      const totalSeconds = time.hours * 3600 + time.minutes * 60
      const validatedHours = Math.floor(totalSeconds / 3600)
      const validatedMinutes = Math.floor((totalSeconds % 3600) / 60)
      const validatedSeconds = totalSeconds % 60
      onAddTask(task, { hours: validatedHours, minutes: validatedMinutes, seconds: validatedSeconds })
      setTask('')
      setTime({ hours: 0, minutes: 0, seconds: 0 })
    }
  }

  return (
    <>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder={time.minutes === 0 ? 'Min' : ''}
          value={time.minutes === 0 ? '' : time.minutes}
          onChange={(e) => setTime({ ...time, minutes: parseInt(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder={time.hours === 0 ? 'Hrs' : ''}
          value={time.hours === 0 ? '' : time.hours}
          onChange={(e) => setTime({ ...time, hours: parseInt(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
      </form>
    </>
  )
}

export default NewTaskForm
