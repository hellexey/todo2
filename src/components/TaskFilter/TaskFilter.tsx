import React from 'react'

export enum FilterType {
  All,
  Completed,
  Active,
}

export interface TaskFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ activeFilter, onFilterChange }) => {

  return (
    <ul className='filters'>
      <li>
        <button className={activeFilter === FilterType.All ? 'selected' : ''}
                onClick={() => onFilterChange(FilterType.All)}>All
        </button>
      </li>
      <li>
        <button className={activeFilter === FilterType.Active ? 'selected' : ''}
                onClick={() => onFilterChange(FilterType.Active)}>Active
        </button>
      </li>
      <li>
        <button className={activeFilter === FilterType.Completed ? 'selected' : ''}
                onClick={() => onFilterChange(FilterType.Completed)}>Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter