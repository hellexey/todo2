import React, { useState } from 'react'

interface NewTaskFormProps {
  onAddTask: (task: string, time: { minutes: number; seconds: number }) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('')
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim() !== '') {
      const totalSeconds = time.minutes * 60 + time.seconds
      const validatedMinutes = Math.floor(totalSeconds / 60)
      const validatedSeconds = totalSeconds % 60
      onAddTask(task, { minutes: validatedMinutes, seconds: validatedSeconds })
      setTask('')
      setTime({ minutes: 0, seconds: 0 })
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
          placeholder="Min"
          value={time.minutes}
          onChange={(e) => setTime({ ...time, minutes: parseInt(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={time.seconds}
          onChange={(e) => setTime({ ...time, seconds: parseInt(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        {/*<button type="submit">Add Task</button>*/}
      </form>
    </>
  )
}

export default NewTaskForm
