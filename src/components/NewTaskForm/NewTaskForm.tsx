import React, { useState } from 'react'

interface NewTaskFormProps {
  onAddTask: (task: string) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim() !== '') {
      onAddTask(task)
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required={true}
      />
    </form>
  )
}

export default NewTaskForm
