import { useContext, useEffect, useState } from "react";
import { getIncompletedTodos } from "../utils/getTodos";
import TodoItem from "../components/TodoItem";
import { AuthContext } from "../authProvider/AuthProvider";

const IncompleteTodo = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [inCompleteTodos, setInCompleteTodos] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getIncompletedTodos(user?.email);
      setInCompleteTodos(data);
      setLoading(false);
    };
    getData();
  }, [user]);

  return (
    <div className="container min-h-screen mx-auto mt-4 mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-6">
          {inCompleteTodos?.length > 0 ? (
            <TodoItem todoItems={inCompleteTodos} />
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-600">
              <svg
                className="w-16 h-16 mb-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 1.5M4 4h16M4 10h16M4 16h16M4 20h16"
                />
              </svg>
              <h3 className="text-lg font-semibold">No Incomplete Todos</h3>
              <p className="text-gray-500">
                It looks like you have no incomplete tasks at the moment. Check
                back later!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncompleteTodo;
