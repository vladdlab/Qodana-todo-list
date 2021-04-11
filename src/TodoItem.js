import './TodoItem.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardFooter, Button, ButtonGroup } from "shards-react";

function TodoItem(props) {
  return (
    <Card small className="TodoItem">
      <CardBody>
        <CardTitle>{props.todo.title}</CardTitle>
        <CardSubtitle>{props.todo.date}</CardSubtitle>
        {props.todo.text}
      </CardBody>
      <CardFooter className="TodoButtons">
          <ButtonGroup>
            <Button theme="success" onClick={() => { props.changeTodoState(props.todo.id) }}>Done</Button>
            <Button theme="danger" onClick={() => { props.deleteTodo(props.todo.id) }}>Delete</Button>
          </ButtonGroup>
        </CardFooter>
    </Card>
  );
}

export default TodoItem;
