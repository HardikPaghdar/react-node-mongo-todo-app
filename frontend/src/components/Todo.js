import React, { useState } from 'react';
import AddEdit from './AddEdit';
import { deleteTodo } from '../api';
import "./Todo.css";
const Todo = ({ todo, todos, setTodos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await deleteTodo(id, token, setTodos);
    setTodos(todos.filter(todo => todo._id !== id));
  };
  
  return (
    <>
      <li>
        <div className="todo-item">
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-description">{todo.description}</p>
          <div className="todo-buttons">
            <button className="edit-button" onClick={openPopup}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        </div>
      </li>
      {isOpen && (
        
            <AddEdit closePopup={closePopup} setTodos={setTodos} todos={todos} addOrEdit="Edit" todo={todo}/>
      )}
    </>
  );
};

export default Todo;
