import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import UpdateTodo from "../todoUpdate";
const {
  createNewTodo,
  getUserTodos,
  deleteTodo,
  toggleCompletion,
} = require("../../apis/todoApi");

const Todos = () => {
  const [pageState, setPageState] = useState({
    todoName: "",
    todosCount: 0,
    todosList: [],
    editingTodo: false,
    todoDetails: {},
  });

  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    fetchTodosCount();
  }, []);

  const fetchTodosCount = async () => {
    try {
      const todos = await getUserTodos(loggedInUser);
      setPageState((prevPageState) => ({
        ...prevPageState,
        todosCount: todos?.todos?.length || 0,
        todosList: todos?.todos,
      }));
    } catch (error) {
      console.error("Error fetching todos count:", error);
    }
  };

  const handleTodo = (e) => {
    e.preventDefault();
    setPageState((prevPageState) => ({
      ...prevPageState,
      [e.target.name]: e.target.value,
    }));
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (pageState.todoName !== "") {
      const todoData = { username: loggedInUser, todoName: pageState.todoName };
      const result = await createNewTodo(todoData);
      if (result?.message) {
        alert(result?.message);
        setPageState((prevPageState) => ({
          ...prevPageState,
          todoName: "",
        }));
        fetchTodosCount();
      }
    } else {
      alert("Enter todo name");
    }
  };

  const deleteUserTodo = async (id) => {
    const response = await deleteTodo(id);
    if (response?.message) {
      alert(response?.message);
      fetchTodosCount();
    }
  };

  const editTodo = (todoDetails) => {
    setPageState((prevPageState) => ({
      ...prevPageState,
      todoDetails,
      editingTodo: true,
    }));
  };

  const completeTodo = async (details, checked) => {
    if (checked) {
      const checkedDetails = { ...details, checked };
      const response = await toggleCompletion(checkedDetails);
      if (response?.message) {
        alert(response?.message);
        fetchTodosCount();
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <section className="bg-color-1 min-h-screen">
      <div className="container">
        <div className="mb-10 pt-10">
          <button
            onClick={signOut}
            className=" bg-color-4 border-none rounded-xl text-white text-[1rem] font-normal w-fit py-2 px-6"
          >
            Sign out
          </button>
          <h1 className="text-black font-medium text-[2.5rem] leading-none mb-3 text-center">
            MANAGE YOUR TODOS AS YOU LIKE!
          </h1>
          <p className="text-color-2 text-[1.2rem] font-normal leading-none text-center">
            You can create, edit, and delete your Todos whenever you want.
          </p>
          <div className="mt-10">
            <form onSubmit={createTodo}>
              <div className="flex justify-between">
                <div className="flex flex-col w-3/4">
                  <label className="text-black font-semibold text-[1rem] mb-2">
                    Todo Name
                  </label>
                  <input
                    value={pageState.todoName}
                    name="todoName"
                    onChange={handleTodo}
                    className="border-2 border-color-3 rounded-xl bg-color-1 p-2 text-color-2 placeholder:text-color-2 outline-none"
                    type="text"
                    placeholder="Enter your todo name"
                  />
                </div>
                <button
                  className="bg-color-4 border-none rounded-xl text-white text-[1rem] font-normal w-1/5 py-3 self-end"
                  type="submit"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
        {pageState.todosCount !== 0 ? (
          <ul>
            {pageState.todosList.map((each, index) => {
              return (
                each?.completed === false && (
                  <li
                    key={each._id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="text-black font-medium text-[1.5rem]">
                      {each.todoName}
                    </h1>
                    <button
                      onClick={() => editTodo(each)}
                      className="h-[40px] w-[40px] hover:border-2 border-color-5 rounded-full flex items-center justify-center"
                    >
                      <MdEdit size={25} />
                    </button>
                    <button
                      className="h-[2.5rem] w-[2.5rem] hover:border-2 border-color-5 rounded-full flex items-center justify-center"
                      onClick={() => deleteUserTodo(each._id)}
                    >
                      <MdDelete size={25} />
                    </button>
                    <input
                      onChange={(e) => completeTodo(each, e.target.checked)}
                      type="checkbox"
                    />
                  </li>
                )
              );
            })}
          </ul>
        ) : (
          <h1 className="text-black font-medium text-[2.5rem] leading-none mb-3">
            Oops No Todos created yet, create it now
          </h1>
        )}

        {pageState.todosCount !== 0 && (
          <h1 className="text-color-5 font-medium text-[2.5rem] text-center mt-20 mb-10">
            Your Completed Tasks
          </h1>
        )}

        {pageState.todosCount !== 0 && (
          <ul>
            {pageState.todosList.map((each, index) => {
              return (
                each?.completed && (
                  <li
                    key={each._id}
                    className="flex items-center justify-between"
                  >
                    <h1 className="text-black font-medium text-[1.5rem]">
                      {each.todoName}
                    </h1>
                    <button
                      className="h-[2.5rem] w-[2.5rem] hover:border-2 border-color-5 rounded-full flex items-center justify-center"
                      onClick={() => deleteUserTodo(each._id)}
                    >
                      <MdDelete size={25} />
                    </button>
                    <h1>Completed</h1>
                  </li>
                )
              );
            })}
          </ul>
        )}
      </div>
      {pageState.editingTodo && (
        <UpdateTodo
          details={pageState.todoDetails}
          update={fetchTodosCount}
          onClose={() =>
            setPageState((prev) => ({ ...prev, editingTodo: false }))
          }
        />
      )}
    </section>
  );
};

export default Todos;
