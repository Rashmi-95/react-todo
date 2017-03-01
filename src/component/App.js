import React, { Component } from 'react';
import Head from './Head.js'
import ItemList from './ItemList.js'
import Foot from './Foot.js'
import api from './api.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {}
    }
  }
  componentDidMount() {
    api.returnTodo(this)
  }
  checkAll(checkValue) {
    api.checkAllApiCall(this, this.state.todos, checkValue)
  }
  addItem(newValue) {
    api.addItemApiCall(this, this.state.todos, newValue)
  }

  deleteItem(key) {
    api.deleteItemApiCall(this, this.state.todos, key)
  }
  updateItem(key, content, oldContent) {
    if (content.trim() === '')
      api.deleteItemApiCall(this, this.state.todos, key)
    else
      api.updateItemApiCall(this, this.state.todos, key, content, oldContent)
  }

  checkItem(key) {
    api.checkItemApiCall(this, this.state.todos, key)
  }

  deleteCompleted() {
    api.deleteCompletedApiCall(this, this.state.todos)
  }

  render() {
    let filteredTodos = api.filterListOnRoute(this.props.params.category, this.state.todos)
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

export default App
