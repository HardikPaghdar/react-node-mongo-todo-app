// api.js
import axios from "./axios";

export const login = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email: email,
    password: password,
  });
  const token = response.data.token;
  return token;
};

export const register = async (email, password, username) => {
  const response = await axios.post("/auth/signup", {
    email: email,
    password: password,
    username: username
  });
  return response;
}

export const getAllTodos = async (token) => {
  try {
    const response = await axios.get("/todo/allTodos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id, token) => {
  const response = await axios.delete(`/todo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addTodo = async (title, description, token) => {
  const response = await axios.post(
    "/todo/addTodo",
    {
      title: title,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return token;
};

export const editTodo = async (title, description, token, todo) => {
  const response = await axios.put(`/todo/${todo._id}`, 
  {
    title: title,
    description: description
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};
