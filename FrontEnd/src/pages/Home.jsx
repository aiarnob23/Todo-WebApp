import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useEffect, useState } from "react";
import { getDate } from "../utils/getDate";
import { getTodos } from "../utils/getTodos";
import TodoItem from "../components/TodoItem";
import { addNewTodo } from "../utils/addTodo";
import { AuthContext } from "../authProvider/AuthProvider";

const Home = () => {
  const [date, setDate] = useState(getDate(new Date()));
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      const todos = await getTodos(user?.email, date);
      console.log(todos);
      setTodos(todos);
      setLoading(false);
    };
    fetchTodos();
  }, [date]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const email = user?.email || "";
    const res = await addNewTodo(email, title, description, newTodoDate);
    if (res) {
      setTitle("");
      setDescription("");
      const updatedTodos = await getTodos(email, date);
      setTodos(updatedTodos);
    }
  };

  //------------return body--------------//
  return (
    <div className=" rounded-lg container min-h-[700px] md:min-h-[800px] mt-2 mb-4 mx-0 md:mx-auto p-2 md:p-4 lg:p-6 bg-blue-200">
      <div className="lg:flex lg:flex-row lg:justify-between">
        {/* Todos div */}
        <div>
          {/*---------add new todo------- */}
          <div className="my-20 text-gray-700 font-medium">
            <h3 className="font-semibold">Add Todo</h3>
            <form onSubmit={handleAddTodo} className="space-y-2" action="">
              <span>Title:</span>
              <input
                className="md:w-[300px] h-7 rounded-lg mx-2 px-4"
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Enter todo "
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <span>Description:</span>
              <input
                className="md:w-[300px] h-7 rounded-lg mx-2 px-4"
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="If any description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <span>Date:</span>
              <input
                className="w-[120px] h-7 text-gray-300 rounded-lg mx-2 "
                type="date"
                name="date"
                id="date"
                onChange={(e) =>
                  setNewTodoDate(getDate(new Date(e.target.value)))
                }
              />
              <br />
              <button className="btn bg-gray-700 text-white" type="submit">
                Confirm
              </button>
            </form>
          </div>
          {/* ------todos view by date-------*/}
          <div className="">
            <h3 className="mb-3 font-semibold text-gray-500">
              Tasks for : {date}
            </h3>
            {loading ? (
              <div>
                <span className="loading loading-spinner loading-lg "></span>
              </div>
            ) : (
              <div>
                {todos?.length > 0 ? (
                  <TodoItem todoItems={todos} />
                ) : (
                  <h3 className="text-red-400">No Todos for {date}</h3>
                )}
              </div>
            )}
          </div>
        </div>

        {/* calendar div */}
        <div>
          <p className="font-semibold text-gray-600 my-4">Pick a date :</p>
          <Calendar
            className="text-sm h-[300px] rounded-lg text-slate-800 font-semibold"
            onChange={(value) => setDate(getDate(new Date(value)))}
            defaultValue={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
