import React from 'react';
import './TodoList.css';
import { Nav, NavItem, NavLink } from "shards-react";
import TodoItem from './TodoItem';

import todoData from './data'

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    console.log(todoData)
    this.state = {
      todos: todoData,
      doneTodos: false
    }
  }

  renderTodos() {
    return this.state.todos
      .filter(todo =>  todo.done === this.state.doneTodos )
      .map(todo => <TodoItem todo={todo} key={todo.id} changeTodoState={(id) => { this.changeTodoState(id) }} deleteTodo={(id) => { this.deleteTodo(id) }}/>)
  }

  changeTodoState(id) {
    const todos = this.state.todos.slice();
    const currentTodo = todos.find(todo => todo.id === id)
    currentTodo.done = !currentTodo.done
    this.setState({todos: todos});
  }

  deleteTodo(id) {
    const todos = this.state.todos.slice();
    const todoIndex = todos.findIndex(todo => todo.id === id)
    todos.splice(todoIndex, 1)
    this.setState({todos: todos});
  }

  render () {
    return (
      <div className="TodoList">
        <header>
          <Nav className="TodoNav" pills>
            <NavItem>
              <NavLink active={!this.state.doneTodos} href="#" onClick={() => this.setState({doneTodos: false})}>
                Active
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={this.state.doneTodos} href="#" onClick={() => this.setState({doneTodos: true})}>
                Done
              </NavLink>
            </NavItem>
          </Nav>
        </header>

        <main>
          <section className="Todos_state_done">
            {this.renderTodos()}
          </section>
          <article className="Todos_state_undone"></article>
        </main>
      </div>
    );
  }
}

export default TodoList;
