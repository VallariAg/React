import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  getTitle = () => {
    if (this.props.numTodos == 0) return "No work, yay!"
    else return "You have " + this.props.numTodos + " Todos"
  }
  render() {
    return (
      <div className='card-header' >
        <h1 className='card-header-title'>
          {this.getTitle()}
        </h1>
      </div>
    )
  }
}

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return <Task content={todo} key={index} id={index} onDelete={props.onDelete} />
  })
  return (
    <div className='list-group'>
      {todos}
    </div>
  )
}

const Task = (props) => {
  return (
    <div className='list-group-item'>
      {props.content}
      <button className='btn btn-outline-danger' style={{ float: "right" }} onClick={() => { props.onDelete(props.id) }}>Done!</button>
    </div>
  )
}

class AddTaskForm extends React.Component {
  state = {
    newTask: "",
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTask === '') return;
    // if(this.state.newTask === '') return;
    this.props.onFormSubmit(this.state.newTask);
    this.setState({ newTask: '' })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={(e) => { this.setState({ newTask: e.target.value }) }} />
          <button className="btn btn-dark">Add Task</button>
        </form>
      </div >
    )
  }
}

class Todo extends React.Component {
  state = {
    tasks: ["pet cat", "do work"]
  }
  handleDelete = (index) => {
    const newArr = [...this.state.tasks]
    newArr.splice(index, 1)
    this.setState({ tasks: newArr })
  }
  onFormSubmit = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] })
  }
  render() {
    return (
      <div className='wrapper' >
        <div className='card frame'>
          <Header numTodos={this.state.tasks.length} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
          <AddTaskForm onFormSubmit={this.onFormSubmit} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Todo />, document.getElementById('root')
);
