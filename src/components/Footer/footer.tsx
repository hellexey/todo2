import React from 'react'
import TaskFilter from '../TaskFilter'
import { FilterType } from '../TaskFilter/TaskFilter'

interface FooterProps {
  totalTasks: number;
  completedTasks: number;
  onClearCompleted: () => void;
  activeFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
}

const Footer: React.FC<FooterProps> = ({
                                         totalTasks,
                                         completedTasks,
                                         activeFilter,
                                         setCurrentFilter,
                                         onClearCompleted
                                       }) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{totalTasks - completedTasks} items left</span>
      <TaskFilter activeFilter={activeFilter} onFilterChange={setCurrentFilter} />
      <button className='clear-completed' onClick={onClearCompleted}>
        Clear Completed
      </button>
    </footer>
  )
}

export default Footer