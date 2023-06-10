import React, {  useState } from 'react'
import TaskList from '../TaskList'
import { FilterType } from '../TaskFilter/TaskFilter'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import { v4 as uuidv4 } from 'uuid'


interface Task {
  id: string;
  task: string;
  completed: boolean;
  created: string
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>(FilterType.All)

  App.defaultProps = {
    tasks: [],
    filter: FilterType.All
  }

  const addTask = (task: string) => {
    const newTask: Task = {
      id: uuidv4(),
      task,
      completed: false,
      created: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
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
        task.id === taskId ? { ...task, task: newTask, completed: task.completed } : task
      )
    )
  }


  const filteredTasks = (tasks: Task[], filter: FilterType) => {
    return tasks.filter((task) => {
      if (filter === FilterType.Completed) {
        return task.completed
      } else if (filter === FilterType.Active) {
        return !task.completed
      } else {
        return true
      }
    })
  }

  return (
    <div className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className='main'>
        <TaskList tasks={filteredTasks(tasks, filter)}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onEditTask={editTask}
                  filter={filter}
        />
      </section>
      <Footer
        totalTasks={tasks.length}
        completedTasks={tasks.filter((task) => task.completed).length}
        onClearCompleted={clearCompletedTasks}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
    </div>
  )
}

export default App
