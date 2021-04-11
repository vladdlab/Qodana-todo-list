import React from 'react';
import './TodoList.css';
import { Nav, NavItem, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }

  render () {
    return (
      <div className="TodoList">
        <header>
          <Nav className="TodoNav" pills>
            <NavItem>
              <NavLink active href="#">
                Активные
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                Выполненные
              </NavLink>
            </NavItem>
          </Nav>
        </header>

        <main>
          <section className="Todos_state_done"></section>
          <section className="Todos_state_undone"></section>
        </main>
      </div>
    );
  }
}

export default TodoList;
