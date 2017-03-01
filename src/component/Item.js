import React, { Component } from 'react';
let lastKeyCode

class Item extends Component {
  deleteItem() {
    this.props.deleteItem(this.props.item.id)
  }
  checkItem() {
    this.props.checkItem(this.props.item.id)
  }
  updateItem(shouldChange) {
    this.refs.label.style.display = 'block'
    this.refs.edit.style.display = 'none'
    this.refs.checkbox.style.display = 'block'
    this.refs.delete.style.opacity = 1
    const newDescription = this.refs.edit.value
    const oldDescription = this.props.item.description
    if (oldDescription !== newDescription) {
      const description = (shouldChange) ? newDescription : oldDescription
      this.refs.label.innerHTML = description
      this.props.updateItem(this.props.item.id, description, oldDescription)
    }
  }
  editItem() {
    this.refs.label.style.display = 'none'
    this.refs.edit.style.display = 'block'
    this.refs.edit.value = this.refs.label.innerHTML
    this.refs.edit.focus()
    this.refs.checkbox.style.display = 'none'
    this.refs.delete.style.opacity = 0
  }
  updateOnblur() {
    if (lastKeyCode !== 27 && lastKeyCode !== 13) {
      lastKeyCode = null
      this.updateItem(true)
    }
  }
  updateItemOnEnter(e) {
    lastKeyCode = e.keyCode
    if (e.keyCode === 13) {
      this.updateItem(true)
    } else if (e.keyCode === 27) {
      this.updateItem(false)
    }
  }
  render() {
    const todoItem = this.props.item
    const classNameLi = (todoItem.status === false) ? 'active' : 'completed'
    return (
      <li id={todoItem.id} className={classNameLi}>
        <div className="view">
          <input className="toggle"
            type="checkbox"
            ref="checkbox"
            id={"todo-checkbox-" + todoItem.id}
            onChange={this.checkItem.bind(this)}
            checked={todoItem.status} />

          <label id={"todo-label-" + todoItem.id}
            ref="label"
            onDoubleClick={this.editItem.bind(this)}>
            {todoItem.description}</label>

          <input id={"todo-edit-textbox-" + todoItem.id}
            ref="edit"
            className="edit"
            type="text"
            name="editableText"
            onKeyUp={this.updateItemOnEnter.bind(this)}
            onBlur={this.updateOnblur.bind(this)}
          />

          <button id={"todo-button-" + todoItem.id}
            className="destroy"
            ref="delete"
            onClick={this.deleteItem.bind(this)}></button>
        </div>
      </li>
    );
  }
}

export default Item;
