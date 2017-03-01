import axios from 'axios'

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}
const escapeHtml = string => String(string).replace(/[&<>"'`=/]/g, s => entityMap[s])

function returnTodo(self) {
  axios.get('http://localhost:3008/read/')
    .then((response) => {
      let todo = {}
      const todoObjects = response.data
      todoObjects.forEach(function (item) {
        todo[item.id] = item
      })
      self.setState({ todos: todo })
    })
    .catch(function (error) {
      console.log(error);
    });
}
function checkAllApiCall(self, newTodos, checkValue) {
  axios({
    method: 'PUT',
    url: 'http://localhost:3008/update/',
    data: {
      checkAll: checkValue
    }
  })
    .then(({data}) => {
      for (let key in newTodos) {
        if (newTodos[key])
          newTodos[key].status = checkValue
      }
      self.setState({ todos: newTodos })
    })
    .catch((err) => {
      console.log(err)
    })
}
function addItemApiCall(self, newTodos, newValue) {
  axios.post(`http://localhost:3008/write/${escapeHtml(newValue)}`)
    .then(({data}) => {
      newTodos[data] = { 'description': escapeHtml(newValue), 'status': false }
      self.setState({ todos: newTodos })
    })
    .catch((error) => {
      console.log(error);
    })
}
function deleteItemApiCall(self, newTodos, key) {
  axios({
    method: 'DELETE',
    url: `http://localhost:3008/delete/${key}`,
  }).then((data) => {
    delete (newTodos[key])
    self.setState({ todos: newTodos })
  })
}
function updateItemApiCall(self, newTodos, key, description, oldDescription) {
  axios({
    method: 'PUT',
    url: `http://localhost:3008/update/${key}`,
    data: {
      description: escapeHtml(description),
      status: ''
    }
  }).then((data) => {
    newTodos[key].description = description
    self.setState({ todos: newTodos })
  })
    .catch((data) => {
      newTodos[key].description = oldDescription
      self.setState({ todos: newTodos })
    })
}
function checkItemApiCall(self, newTodos, key) {
  axios({
    method: 'PUT',
    url: `http://localhost:3008/update/${key}`,
    data: {
      description: '',
      status: !newTodos[key].status
    }
  }).then((data) => {
    newTodos[key].status = !newTodos[key].status
    self.setState({ todos: newTodos })
  })
}
function deleteCompletedApiCall(self, newTodos) {
  axios({
    method: 'DELETE',
    url: 'http://localhost:3008/delete/',
    data: {
      status: true
    }
  }).then(({todos}) => {
    for (let key in newTodos) {
      if (newTodos[key].status === true) {
        delete (newTodos[key])
      }
    }
    self.setState({ todos: newTodos })
  })
    .catch((err) => {
      console.log(err)
    })
}
function filterTodo(todos, status) {
  let filteredList = {}
  for (let key in todos) {
    if (todos[key].status === status) {
      filteredList[key] = todos[key]
    }
  }
  return filteredList
}
function filterListOnRoute(category, todos) {
  let filteredTodos = {}
  switch (category) {
    case 'active': filteredTodos = filterTodo(todos, false)
      break
    case 'completed': filteredTodos = filterTodo(todos, true)
      break
    default: filteredTodos = todos
  }
  return filteredTodos
}

module.exports = {
  returnTodo,
  checkAllApiCall,
  addItemApiCall,
  deleteCompletedApiCall,
  checkItemApiCall,
  updateItemApiCall,
  deleteItemApiCall,
  filterListOnRoute
}