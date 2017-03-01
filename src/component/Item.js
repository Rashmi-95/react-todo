import React, { Component } from 'react';

class Item extends Component {
  deleteItem(key) {
   this.props.deleteItem(key)
  }
  checkItem(key) {
     this.props.checkItem(key)
  }
  updateItem(key){
    this.refs.label.style.display = 'block'
    this.refs.edit.style.display = 'none'
    this.refs.label.innerHTML =  this.refs.edit.value
    this.refs.checkbox.style.display ='block'
    this.refs.delete.style.opacity = 1
    this.props.updateItem(key, this.refs.edit.value)
  }
  editItem(){
    this.refs.label.style.display = 'none'
    this.refs.edit.style.display = 'block'
    this.refs.edit.value = this.refs.label.innerHTML
    this.refs.edit.focus()
    this.refs.checkbox.style.display ='none'
    this.refs.delete.style.opacity = 0
  }
  render() {
    console.log(this.props);
    const todoItem = this.props.item
    console.log('sgdsfg',todoItem);
    const classNameLi = (todoItem.status === false) ? 'active' : 'completed'
    return (
      <li id={todoItem.id} className={classNameLi}>
        <div className="view">
          <input className="toggle" type="checkbox" ref="checkbox" id={"todo-checkbox-" + todoItem.id} onChange={this.checkItem.bind(this,todoItem.id)} checked={todoItem.status}/>
          <label id={"todo-label-" + todoItem.id} ref="label" onDoubleClick={this.editItem.bind(this)}>{todoItem.description}</label>
          <input id={"todo-edit-textbox-" + todoItem.id} ref="edit" className="edit" type="text" name="editableText" onBlur={this.updateItem.bind(this, todoItem.id)}/>
          <button id={"todo-button-" + todoItem.id} className="destroy" ref="delete" onClick={this.deleteItem.bind(this,todoItem.id)}></button>
        </div>
      </li>
    );
  }
}

export default Item;
