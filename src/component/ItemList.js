import React, { Component } from 'react';
import Item from './Item.js'

class ItemList extends Component {
  render() {
    const todos = this.props.todos
    //console.log(todos);
    let ItemListDom = []
    for (let key in todos) {
      ItemListDom.push(<Item key={key}
        item={todos[key]}
        deleteItem={this.props.deleteItem}
        updateItem={this.props.updateItem}
        checkItem={this.props.checkItem} />)
    }
    console.log(ItemListDom);
    return (
      <ul className="todo-list">
        {ItemListDom}
      </ul>
    );
  }
}

export default ItemList;
