// Main Object

const todoList = {
  todos: [],
  addTodo(todoText) {
      this.todos.push({
          todoText: todoText,
          completed: false
      });
  },
  changeTodo(position, todoText) {
      let todo = this.todos[position];
      todo.todoText = todoText;
  },
  deleteTodo(position) {
      this.todos.splice(position,1);
  },
  toggleCompleted(position) {
      let todo = this.todos[position];
      todo.completed = !todo.completed;
  },
  toggleAll() {
      let totalTodos = this.todos.length;
      let completedTodos = 0;
      
      this.todos.forEach(function(item) {
        if (item.completed === true) completedTodos++;
      });
    
      this.todos.forEach(function( todo ) {
        if (completedTodos === totalTodos) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      });
  }
};

// User Inputs

const handlers = {
  addTodo() {
      let addTodoInputText = document.getElementById("addTodoInputText");
      todoList.addTodo(addTodoInputText.value);
      addTodoInputText.value = "";
      view.displayTodos();
  },
  changeTodo() {
      let changeTodoInputPosition = document.getElementById("changeTodoInputPosition");
      let changeTodoInputText = document.getElementById("changeTodoInputText");
      
      todoList.changeTodo(changeTodoInputPosition.valueAsNumber, changeTodoInputText.value);
      
      changeTodoInputPosition.value = "";
      changeTodoInputText.value = "";
      
      view.displayTodos();
  },
  deleteTodo(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
  },
  toggleCompleted() {
      let toggleCompletedInputPosition = document.getElementById("toggleCompletedInputPosition");
      todoList.toggleCompleted(toggleCompletedInputPosition.valueAsNumber);
      toggleCompletedInputPosition.value = "";
      view.displayTodos();
  },
  toggleAll() {
      todoList.toggleAll();
      view.displayTodos();
  }
};

// User Views

const view = {
  displayTodos() {
      let todosUl = document.querySelector("ul");
      todosUl.innerHTML = "";
    
      todoList.todos.forEach(function( todo, index ) {
        let todosLi = document.createElement("li");
        let todoTextWithCompletion = "";
          
        if (todo.completed === true) {
          todoTextWithCompletion = "[X] " + todo.todoText;
        } else {
          todoTextWithCompletion = "[  ] " + todo.todoText;
        }
          
        todosLi.id = index;
        todosLi.textContent = todoTextWithCompletion;
        todosLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todosLi);
      }, this);
  },
  createDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners() {
    let todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function (event) {
    let elementClicked = event.target;
    if (elementClicked.className === 'deleteButton') {
      let position = parseInt(elementClicked.parentNode.id);
      handlers.deleteTodo(position);
      }
    });  
  },
};

view.setupEventListeners();