import React, { useState } from "react";
import axios from "axios";
import  {addTodo, editTodo} from "../api";
const AddEdit = ({ closePopup, addOrEdit, setTodos, todos, todo }) => {
  const [formData, setFormData] = useState({
    title: todo?.title ? todo.title : "",
    description: todo?.description ? todo.description : "",
  });

  const [errors, setErrors] = useState({});

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    const errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (addOrEdit !== "Edit") {
        await addTodo(title, description, token);
        const data = {
          title: title,
          description: description,
        };
        closePopup();
        setTodos([...todos, data]);
      } else {
        const response = await editTodo(title, description, token, todo);
        console.log(response.title);
        const data = {
          title: response.title,
          description: response.description,
        };
        closePopup();
      }
    }
  };
  return (
    <div className="login-container">
      <h2>{addOrEdit === "Edit" ? "Edit Todo" : "Add Todo"}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            className={errors.description ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <button type="submit" className="btn-primary">
          {addOrEdit === "Edit" ? "Edit Todo" : "Add Todo"}
        </button>
        <button onClick={closePopup} className="btn-primary">
          cancle
        </button>
      </form>
    </div>
  );
};

export default AddEdit;
