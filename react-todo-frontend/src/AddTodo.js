import { useState } from 'react';

export const AddTodo = ({ addNewTodo }) => {
  const [newTodo, setnewTodo] = useState('');

  return (
    <>
      <label htmlFor="addTodoInput">Add todo: </label>
      <input
        id="addTodoInput"
        placeholder="Add todo"
        value={newTodo}
        onChange={(e) => setnewTodo(e.target.value)}
      />
      <button onClick={() => {
        addNewTodo(newTodo);
        setnewTodo(''); // Optionally reset the input field after adding a new todo
      }}>Add</button>
    </>
  );
};
