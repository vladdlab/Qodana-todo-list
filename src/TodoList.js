import React from 'react';
import './TodoList.css';
import { Nav, NavItem, NavLink } from "shards-react";
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import {ChartComponent} from 'bar-chart-simple'
// import 'test-head/dist/index.css'

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      showDoneTodos: false
    }
  }

  renderTodos() {
    return this.state.todos
      .filter(todo =>  todo.done === this.state.showDoneTodos )
      .map(todo => <TodoItem todo={todo} key={todo.id} showDoneTodos={this.state.showDoneTodos} changeTodoState={(id) => { this.changeTodoState(id) }} deleteTodo={(id) => { this.deleteTodo(id) }}/>)
  }

  changeTodoState(id) {
    const todos = this.state.todos.slice();
    const currentTodo = todos.find(todo => todo.id === id)
    currentTodo.done = !currentTodo.done
    this.setState({todos: todos});
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  deleteTodo(id) {
    const todos = this.state.todos.slice();
    const todoIndex = todos.findIndex(todo => todo.id === id)
    todos.splice(todoIndex, 1)
    this.setState({todos: todos});
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  addTodo(todo) {
    const todos = this.state.todos.concat([todo])
    this.setState({todos: todos});
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  getStatistics() {
    const statsMap = new Map()
    this.state.todos.forEach(todo => {
      if (statsMap.has(todo.date)) {
        statsMap.get(todo.date).data_value += 1
      } else {
        statsMap.set(todo.date, {
          data_category: todo.date,
          data_value: 1
        })
      }
    });
    return Array.from(statsMap.values())
  }

  renderRightColumn() {
    if (this.state.showDoneTodos) {
      return <ChartComponent data={this.getStatistics()} chart_type="bar_chart"/>;
    }
    return <AddTodo addTodo={(todo) => { this.addTodo(todo) }}></AddTodo>;
  }

  render () {
    return (
      <div className="TodoList">
        <header>
          <Nav className="TodoNav" pills>
            <NavItem>
              <NavLink active={!this.state.showDoneTodos} href="#" onClick={() => this.setState({showDoneTodos: false})}>
                Active
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.showDoneTodos} href="#" onClick={() => this.setState({showDoneTodos: true})}>
                Done
              </NavLink>
            </NavItem>
          </Nav>
        </header>

        <main>
          <section className="Todos_state_done">
            {this.renderTodos()}
          </section>
          <article className="Todos_state_undone">
            {this.renderRightColumn()}
          </article>
        </main>
      </div>
    );
  }
}

export default TodoList;
