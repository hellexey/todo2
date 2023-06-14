import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from '../TaskList'
import { FilterType } from '../TaskFilter/TaskFilter'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

interface Task {
  id: string
  task: string
  completed: boolean
  created: string
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentFilter, setCurrentFilter] = useState<FilterType>(FilterType.All)

  const addTask = (task: string) => {
    const newTask: Task = {
      id: uuidv4(),
      task,
      completed: false,
      created: new Date().toISOString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  const editTask = (taskId: string, newTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, task: newTask, created: new Date().toISOString() } : task
      )
    )
  }

  const filteredTasks = (tasks: Task[], filter: FilterType) => {
    return tasks.filter((task) => {
      return (
        filter === FilterType.All ||
        (filter === FilterType.Completed && !task.completed) ||
        (filter === FilterType.Active && task.completed)
      )
    })
  }

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks(tasks, currentFilter)}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          filter={currentFilter}
        />
      </section>
      <Footer
        totalTasks={tasks.length}
        completedTasks={tasks.filter((task) => task.completed).length}
        onClearCompleted={clearCompletedTasks}
        activeFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
    </div>
  )
}

export default App
