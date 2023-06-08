import React from 'react'
import Task from '../Task'
import { FilterType } from '../TaskFilter/TaskFilter'

interface TaskListProps {
  tasks: {
    id: number;
    task: string;
    completed: boolean;
  }[];
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (taskId: number, newTask: string) => void;
  filter: FilterType;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onEditTask, filter }) => {

  return (
    <ul className='todo-list'>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task.task}
          completed={task.completed}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={(newTask: string) => onEditTask(task.id, newTask)}
          filter={filter}
        />
      ))}
    </ul>
  )
}

export default TaskList
