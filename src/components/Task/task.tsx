import React, { Component, ChangeEvent } from 'react'

export interface TaskProps {
    id: string;
    description: string;
    created: string;
    completed: boolean;
    onDelete: (id: string) => void;
    onUpdate: (id: string, description: string, completed: boolean) => void;
    onAddTask: (description: string) => void;
}

interface TaskState {
    completed: boolean;
    editMode: boolean;
    description: string;
}

export default class Task extends Component<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props)
        this.state = {
            completed: false,
            editMode: false,
            description: this.props.description
        }
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && this.state.description) {
            this.props.onUpdate(this.props.id, this.state.description, this.state.completed)
            this.setState({ editMode: false })
        }
    }

    handleEdit = () => {
        this.setState((prevState) => ({ editMode: !prevState.editMode }))
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: e.target.value })
    }

    handleComplete = () => {
        const { completed } = this.state
        this.setState({ completed: !completed})
        this.props.onUpdate(this.props.id, this.state.description, this.state.completed)
    }

    handleDelete = () => {
        const { id, onDelete } = this.props
        onDelete(id)
    }

    render() {
        const { description, created } = this.props
        const { completed, editMode } = this.state

        return (
          editMode ? (
            <form>
                <input
                  className='edit'
                  type='text'
                  value={this.state.description}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />
            </form>
          ) : (
            <li className={completed ? 'completed' : ''}>
                <div className='view'>
                    <input className='toggle' type='checkbox' onClick={this.handleComplete} />
                    <label>
                        <span className='description'>{description}</span>
                        <span className='created'>{created}</span>
                    </label>
                    <button className='icon icon-edit' onClick={this.handleEdit}></button>
                    <button className='icon icon-destroy' onClick={this.handleDelete}></button>
                </div>
            </li>
          )
        )
    }
}
