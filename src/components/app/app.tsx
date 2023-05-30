import React, { Component } from 'react'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import { TaskProps } from '../Task/task'
import { v4 as uuidv4 } from 'uuid'


interface AppState {
    tasks: TaskProps[];
}

export default class App extends Component<Record<string, never>, AppState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            tasks: [],
        };
    }


    updateTask = (id: string, description: string) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(task =>
              task.id === id ? { ...task, description } : task
            )
        }))
    }

    deleteTask = (id: string) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== id)
        }))
    }

    addTask = (description: string) => {
        const newTask: TaskProps = {
            id: uuidv4(),
            description,
            created: new Date().toLocaleString(),
            completed: false,
            onDelete: this.deleteTask,
            onAddTask: this.addTask,
            onUpdate: this.updateTask,
        }
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask]
        }))
    }

    render() {
        return (
          <div className="todoapp">
              <header className='header'>
                  <h1>todos</h1>
                  <NewTaskForm onAddTask={this.addTask} />
              </header>
              <section className="main">
                  <TaskList
                    tasks={this.state.tasks} // Заменяем массив tasks на результат вызова метода filteredTasks()
                    onDelete={this.deleteTask}
                    onUpdate={this.updateTask}
                  />
              </section>
              <Footer
                count={this.state.tasks.length}

              />
          </div>
        );
    }
}