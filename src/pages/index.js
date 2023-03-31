import { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = (id) => {
    setEditing(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditInput(todo.text);
  };

  const saveEditedTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editing ? { ...todo, text: editInput } : todo
      )
    );
    setEditing(null);
    setEditInput("");
  };

  return (
    <div className="main">
      <h1 className="heading">Todo App</h1>
      <div className="container">
        <form onSubmit={addTodo} className="form_container">
          <input
            type="text"
            className="input"
            value={input}
            placeholder="Task to be done..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit_btn">
            Add Todo
          </button>
        </form>
        {todos.map((todo) => (
          <div className="task_container" key={todo.id}>
            <input
              type="checkbox"
              className="check_box"
              checked={todo.done}
              onChange={() => markTodo(todo.id)}
            />
            {editing === todo.id ? (
              <input
                type="text"
                className="edit_input"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              <p
                className={
                  todo.done ? "task_text" + " " + "line_through" : "task_text"
                }
              >
                {todo.text}
              </p>
            )}

            {editing === todo.id ? (
              <button onClick={saveEditedTodo} className="edit_task">
                Save
              </button>
            ) : (
              <button onClick={() => editTodo(todo.id)} className="edit_task">
                 &#9998;
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="remove_task"
            >
              &#10006;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
