import axios from "axios";

// Creating a new todo
export const createNewTodo = async (todoInfo) => {
  try {
    const response = await axios.post(
      "https://claw-backend-egtv.onrender.com/todos",
      todoInfo
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserTodos = async (username) => {
  try {
    const response = await axios.get(
      `https://claw-backend-egtv.onrender.com/todos?username=${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await axios.delete(
      `https://claw-backend-egtv.onrender.com/todos?todoId=${todoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const todoUpdation = async (detailsOfTodo) => {
  try {
    const response = await axios.put(
      `https://claw-backend-egtv.onrender.com/todos`,
      detailsOfTodo
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleCompletion = async (details) => {
  try {
    const response = await axios.put(
      `https://claw-backend-egtv.onrender.com/todos/checked`,
      details
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
