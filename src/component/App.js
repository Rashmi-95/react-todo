import React, { Component } from 'react';
import Head from './Head.js'
import ItemList from './ItemList.js'
import Foot from './Foot.js'
import axios from 'axios'
class App extends Component {
  constructor(props) {
    super(props);
    const data = [
      { "id": 1223, "description": "asdasd", "status": false },
      { "id": 1224, "description": "asdasd", "status": true },
      { "id": 1225, "description": "asdasd", "status": true },
      { "id": 1226, "description": ",mnaksjnd", "status": true }]
    let todo = {}
    data.forEach((item) => {
      todo[item.id] = item
    })
    this.state = {
      todos: todo
    }
  }
  componentWillMount() {
    axios.get('http://localhost:3007/read/')
      .then((response) => {
        let todoObjects = response.data;
        todoObjects.forEach(function (item) {
          todoObjects[item.id] = item
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  checkAll(checkValue) {
    let newTodos = this.state.todos
    for (let key in newTodos) {
      newTodos[key].status = checkValue
    }
    this.setState({ todos: newTodos })
  }
  addItem(newValue) {
    console.log('addItem', newValue);
    let newTodos = this.state.todos
    newTodos[700] = { "id": 700, "description": newValue, "status": false }
    this.setState({ todos: newTodos })
  }

  deleteItem(key) {
    console.log('delete item');
    let newTodos = this.state.todos
    delete (newTodos[key])
    this.setState({ todos: newTodos })
  }
  updateItem(key, content) {
    console.log('update item');
    let newTodos = this.state.todos
    newTodos[key].description = content
    this.setState({ todos: newTodos })
  }

  checkItem(key) {
    console.log('check item', key);
    let newTodos = this.state.todos
    newTodos[key].status = !newTodos[key].status
    this.setState({ todos: newTodos })
  }

  deleteCompleted() {
    console.log('delete completed');
    let newTodos = this.state.todos
    for (let key in newTodos) {
      if (newTodos[key].status === true) {
        delete (newTodos[key])
      }
    }
    this.setState({ todos: newTodos })
    console.log(this.state.todos)
  }
  filterList(todos, status) {
    let filteredList = {}
    for (let key in todos) {
      if (todos[key].status === status) {
        filteredList[key] = todos[key]
      }
    }
    return filteredList
  }
  render() {
    let filteredTodos
    console.log(this.props.params.category);
    switch (this.props.params.category) {
      case 'active': filteredTodos = this.filterList(this.state.todos, false)
        break
      case 'completed': filteredTodos = this.filterList(this.state.todos, true)
        break
      default: filteredTodos = this.state.todos
    }
    console.log(filteredTodos);
    return (
      <div>
        <div className="todoapp" >
          <Head todos={this.state.todos}
            checkAll={this.checkAll.bind(this)}
            addItem={this.addItem.bind(this)} />

          <ItemList todos={filteredTodos}
            checkItem={this.checkItem.bind(this)}
            updateItem={this.updateItem.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
          />

          <Foot todos={this.state.todos}
            deleteCompleted={this.deleteCompleted.bind(this)}
          />
        </div >

        < div className="info">
          <p>Double-click to edit a todo</p>
          <p>Created by Rashmi</p>
        </div>
        <button id="scrollUp" style={{ display: 'none' }}>Scroll to top</button>
      </div>
    );
  }
}

export default App;
