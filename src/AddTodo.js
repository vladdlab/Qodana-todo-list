import './AddTodo.css';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import { Card, CardBody, Form, FormInput, FormTextarea,  FormGroup, Button, CardTitle } from "shards-react";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    let formatter = new Intl.DateTimeFormat("ru");

    this.state = {
      id: uuidv4(),
      title: '',
      text: '',
      date: formatter.format(new Date()),
      done: false
    };


    this.addTodo = props.addTodo
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  reset() {
    this.setState({title: '', text: ''});
  }


  render() {
    return (
      <Card small className="TodoItem">
        <CardBody>
        <CardTitle>Create new task</CardTitle>
          <Form>
            <FormGroup>
              <label htmlFor="#title">Title</label>
              <FormInput id="#title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#text">Text</label>
              <FormTextarea type="text" id="#text" placeholder="text" value={this.state.text} onChange={this.handleTextChange} />
            </FormGroup>
            <Button disabled={!(this.state.title && this.state.text)} onClick={() => {this.addTodo(this.state); this.reset()}}>Add Task</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default AddTodo;
