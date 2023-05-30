import React from 'react'
import Task, { TaskProps } from '../Task/task'

interface TaskListProps {
  tasks: Array<TaskProps>;
  onDelete: (id: string) => void;
  onUpdate: (id: string, description: string) => void;
}

const TaskList = ({ tasks, onDelete, onUpdate }: TaskListProps) => {

  return (
    <ul className='todo-list'>
      {tasks.map((task, index) => (
        <Task key={index}
              description={task.description}
              created={task.created}
              completed={task.completed}
              id={task.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onAddTask={task.onAddTask}

        />
      ))}
    </ul>
  )
}

export default TaskList
