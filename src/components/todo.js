import React, { useState } from "react";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === null) {
      setTodos([...todos, { text: currentTodo }]);
      setCurrentTodo("");
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex].text = currentTodo;
      setTodos(newTodos);
      setEditingIndex(null);
      setCurrentTodo("");
    }
  };
  const handleTodoClick = (index) => {
    const newTodos = [...todos];
    setTodos(newTodos);
  };
  const handleDeleteClick = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setCurrentTodo(todos[index].text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
        <button type="submit">
          {editingIndex === null ? "Add Todo" : "Update Todo"}
        </button>
      </form>
      {todos.map((todo, index) => (
        <div key={index}>
          <span onClick={() => handleTodoClick(index)}>{todo.text}</span>
          <button onClick={() => handleEditClick(index)}>Edit</button>
          <button onClick={() => handleDeleteClick(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
