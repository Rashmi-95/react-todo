import React, { Component } from 'react';
import { Link } from 'react-router';

class Foot extends Component {
  deleteCompleted() {
    this.props.deleteCompleted()
  }
  render() {
    const todos = this.props.todos
    let activeListCount = 0
    for (let key in todos) {
      if (todos[key].status === false) {
        activeListCount++
      }
    }
    let showDelete = false;
    for (let key in todos) {
      if (todos[key].status === true) {
        showDelete = true
        break
      }
    }
    const showFooter = (Object.keys(todos).length !== 0) ? true : false
    const activeTodo = (activeListCount === 1) ? 'item' : 'items'
    return (
      showFooter ? (<div className="footer" style={{ display: 'block' }}>
        <span className="todo-count">{activeListCount} {activeTodo}</span>
        <ul className="filters">
          <li> <Link to={'/'} activeClassName="active">all</Link></li>
          <li> <Link to={'/active'} activeClassName="active">active</Link></li>
          <li><Link to={'/completed'} activeClassName="active">completed</Link></li>
        </ul>
        {showDelete ? <button className="clear-completed" onClick={this.deleteCompleted.bind(this)}>Clear completed</button> : null}
      </div>) : null
    );
  }
}

export default Foot;
