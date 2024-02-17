export const TodoList = ({ todoList, removeTodo }) => {
  return (
    <>
      <div>List of items:</div>
      {todoList.map((todo, index) => (
        <div key={index}>
          {todo} 
          <span onClick={() => removeTodo(index)} > ---- Remove --- </span>
        </div>
      ))}
    </>
  );
};
