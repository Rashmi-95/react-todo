import React, { Component } from 'react';

class Head extends Component {
  checkAll() {
    this.props.checkAll(this.refs.toogleAll.checked)
  }
  addItem(e) {
    const content = this.refs.newTodo.value
    if (e.keyCode === 13 && content !== '') {
      this.props.addItem(content)
      this.refs.newTodo.value = ''
    }
  }
  render() {
    const todos = this.props.todos
    const showToggle = (Object.keys(todos).length !== 0) ? true : false
    let checkToogle = true;
    for (let key in todos) {
      if (todos[key].status === false) {
        checkToogle = false
      }
    }
    return (
      <div className="header">
        <h1>todos</h1>
        {showToggle ? <input className="toggle-all" ref="toogleAll" type="checkbox" checked={checkToogle} onChange={this.checkAll.bind(this)} /> : null}
        <label htmlFor="toggle-all">Mark all as complete</label>
        <input className="new-todo" ref="newTodo" placeholder="What needs to be done?" autoFocus="" onKeyUp={this.addItem.bind(this)} />
      </div>
    );
  }
}

export default Head;
