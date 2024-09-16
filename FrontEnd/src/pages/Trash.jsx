import { useContext, useEffect, useState } from "react";
import { getTrashTodos } from "../utils/getTodos";
import { permanetDeleteTodo } from "../utils/deleteTodo";
import { AuthContext } from "../authProvider/AuthProvider";

const Trash = () => {
  const { user } = useContext(AuthContext);
  const [trashData, setTrashData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getTrashTodos(user?.email);
      setTrashData(data);
      setLoading(false);
    };
    getData();
  }, [user]);

  return (
    <div className="container mx-auto mt-4 mb-6 p-6 bg-gray-200 rounded-lg shadow-md min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-4">
          {trashData?.length > 0 ? (
            trashData.map((todo, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-300"
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {todo.title}
                  </h3>
                  <p className="text-sm text-gray-600">{todo.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => permanetDeleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
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
                  d="M6 2L18 2M4 6h16l1 14H3L4 6z"
                />
              </svg>
              <h3 className="text-lg font-semibold">Trash is Empty</h3>
              <p className="text-gray-500">
                There are no items in your trash. Everything looks clean!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trash;
