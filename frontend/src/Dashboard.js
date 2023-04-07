import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
import "./App.css";
import AddEdit from './components/AddEdit';
import { getAllTodos } from './api';
import Loader from "./Loader";
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openPopup = () => {
    setIsOpen(true);
  }

  const closePopus = () => {
    setIsOpen(false);
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    try{
      getAllTodos(token).then((data) => setTodos(data));
    }
    catch(error) {

    }
  }, [showPopup]);

  return (
    <>
    <div className="dashboard">
    <div className="header">
      <h1>Dashboard</h1>
      <button onClick={openPopup}>Add todo</button>
    </div>
    <div className="todo-list">
      <h2>All Todos</h2>
      <ul>
        {todos  && todos.length > 0 ? todos.map((todo) => (
          <Todo key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
        )): <h5>no data available</h5>}
      </ul>
    </div>
    {isOpen ? (
      <div className="popup">
        <AddEdit closePopup={closePopus} setTodos={setTodos} todos={todos}/>
      </div>
    ) : null}
  </div>
    </>
  );
};

export default Dashboard;
