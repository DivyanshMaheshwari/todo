import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentTodo) {
      return alert("Please enter any todo");
    }

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
    <div className="todo-app">
      <h2>Hello Guys,Kuch likh lo</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          placeholder="Add Todo"
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          {editingIndex === null ? "Add Todo" : "Update Todo"}
        </button>
      </form>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <span onClick className="todo-text">
              {todo.text}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => handleEditClick(index)}
                disabled={editingIndex === index}
                className="todo-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(index)}
                disabled={editingIndex === index}
                className="todo-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
