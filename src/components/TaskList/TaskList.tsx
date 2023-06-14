import React from 'react'

import Task from '../Task'
import { FilterType } from '../TaskFilter/TaskFilter'

interface TaskListProps {
  tasks: {
    id: string
    task: string
    completed: boolean
    created: string
  }[]
  onToggleTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (taskId: string, newTask: string) => void
  filter: FilterType
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onEditTask, filter }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task.task}
          completed={task.completed}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={(newTask: string) => onEditTask(task.id, newTask)}
          filter={filter}
          created={task.created}
        />
      ))}
    </ul>
  )
}

export default TaskList
