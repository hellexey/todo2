import React, { Component } from 'react'
import TasksFilter from '../TaskFilter'

interface FooterProps {
    count: number;
}

export default class Footer extends Component<FooterProps> {
    constructor(props: FooterProps) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        return (
          <footer className='footer'>
              <span className='todo-count'>{this.props.count} items left</span>
              <TasksFilter />
              <button className='clear-completed'>Clear completed</button>
          </footer>
        )
    }
}

