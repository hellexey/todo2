import React from 'react'
import TaskFilter from '../TaskFilter'
import { FilterType } from '../TaskFilter/TaskFilter'

interface FooterProps {
  totalTasks: number;
  completedTasks: number;
  onClearCompleted: () => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Footer: React.FC<FooterProps> = ({
                                         totalTasks,
                                         completedTasks,
                                         activeFilter,
                                         onFilterChange,
                                         onClearCompleted
                                       }) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{totalTasks - completedTasks} items left</span>
      <TaskFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <button className='clear-completed' onClick={onClearCompleted}>
        Clear Completed
      </button>
    </footer>
  )
}

export default Footer