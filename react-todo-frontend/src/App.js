import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoList as TodoListComponent } from './TodoList'; // Your component
import { AddTodo } from './AddTodo';
import wasmInit, { TodoList as TodoListWasm } from 'rust-wasm-pkg';

function App() {
  const [todoList, setTodoList] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const initWasm = async () => {
      await wasmInit(); // Initialize the WASM module
      const todoList = new TodoListWasm(); // Instantiate TodoList from WASM
      setTodoList(todoList);
      updateTodoList(todoList);
    };
    initWasm();
  }, []);

  const updateTodoList = (todoList) => {
    if (!todoList) {
      console.log("WASM module is not initialized yet.");
      return;
    }
    // Assuming get_item returns a Promise or an array directly.
    const itemsArray = todoList.get_item(); // Use correct function name
    setItems(itemsArray);
  };

  // Function to add a new todo to the todoList
  const addNewTodo = (newTodo) => {
    if (newTodo.trim() !== "" && todoList) {
      todoList.add(newTodo); // Call Rust function to add the todo
      updateTodoList(todoList); // Update local state from Rust
    }
  };

  const removeTodo = (index) => {
    if(todoList) {
      todoList.remove(index);
      updateTodoList(todoList);
    }
  }



  // Ensure your components like AddTodo and TodoListComponent are correctly using these props and state
  return (
    <div>
      <h1>Todo list</h1>
      <AddTodo addNewTodo={addNewTodo}></AddTodo>
      <br />
      <TodoListComponent todoList={items} removeTodo={removeTodo} ></TodoListComponent>
    </div>
  );
}

export default App;
