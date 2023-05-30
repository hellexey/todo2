import React, { useState, ChangeEvent, FormEvent } from 'react'

export interface NewTaskFormProps {
  onAddTask: (description: string) => void;
}

const NewTaskForm = ({ onAddTask }: NewTaskFormProps) => {
  const [description, setDescription] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (description) {
      onAddTask(description)
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        value={description}
        onChange={handleChange}
      />
    </form>
  )
}


export default NewTaskForm
