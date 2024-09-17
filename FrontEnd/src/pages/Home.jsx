import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useEffect, useState } from "react";
import { getDate } from "../utils/getDate";
import { getTodos } from "../utils/getTodos";
import { addNewTodo } from "../utils/addTodo";
import { AuthContext } from "../authProvider/AuthProvider";
import { softDeleteTodo } from "../utils/deleteTodo";
import { updateTodoStatus } from "../utils/updateTodoStatus";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    if (user?.email && date instanceof Date && !isNaN(date)) {
      setLoading(true);
      const fetchTodos = async () => {
        const todos = await getTodos(user.email, date);
        setTodos(todos);
        setLoading(false);
      };
      fetchTodos();
    }
  }, [date, user]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setMessage("");
    const email = user?.email || "";
    const res = await addNewTodo(email, title, description, newTodoDate);
    if (res) {
      setMessage("Task added successfully");
      setTitle("");
      setDescription("");
      if (date instanceof Date && !isNaN(date)) {
        const updatedTodos = await getTodos(email, date);
        setTodos(updatedTodos);
      }
    }
    else {
      setMessage("Task added failed.");
    }
  };

  // Ensure valid date for Calendar
  const handleDateChange = (value) => {
    if (value instanceof Date && !isNaN(value)) {
      setDate(value);
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4 bg-blue-50">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Add Todo Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:w-1/3">
          {" "}
          {/* Adjust width here */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add Todo
          </h2>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-600">
                Title:
              </label>
              <input
                className="p-2 border border-gray-300 rounded-md"
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter todo title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-gray-600">
                Description:
              </label>
              <input
                className="p-2 border border-gray-300 rounded-md"
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="Enter todo description (optional)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-gray-600">
                Date:
              </label>
              <input
                className="p-2 border border-gray-300 rounded-md"
                type="date"
                name="date"
                id="date"
                onChange={(e) =>
                  setNewTodoDate(getDate(new Date(e.target.value)))
                }
                required
              />
            </div>
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              type="submit"
            >
              Add Todo
            </button>
          </form>
          <div className="text-start">
            {message && (
              <p className="text-xl text-gray-600 font-semibold my-2">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Todos Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Tasks for: {date.toDateString()}
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="space-y-4">
              {todos?.length > 0 ? (
                todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border-2 shadow-slate-100 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {todo.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {todo.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateTodoStatus(todo._id)}
                        className="text-green-500 hover:text-green-600 text-xl font-bold"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => softDeleteTodo(todo._id)}
                        className="text-red-500 text-xl font-bold hover:text-red-600"
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/no-todos.png" 
                    alt="No tasks"
                    className="h-32 w-32 mb-4"
                  />
                  <p className="text-gray-500 text-lg">
                    No tasks for {date.toDateString()}
                  </p>
                  <p className="text-gray-400 mt-2">Why not add one?</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Pick a Date:
        </h2>
        <Calendar
          className="text-sm rounded-lg border border-gray-300"
          onChange={handleDateChange}
          value={date}
        />
      </div>
    </div>
  );
};

export default Home;
