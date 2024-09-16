import { useLocation } from "react-router-dom";
import { softDeleteTodo } from "../utils/deleteTodo";
import { updateTodoStatus } from "../utils/updateTodoStatus";
import Swal from "sweetalert2";

const TodoItem = ({ todoItems }) => {
  const location = useLocation();
  const isCompletedPage = location.pathname === "/completed-todos";

  const handleDescriptionVisual = (description) => {
    Swal.fire({
      text: `${description}`,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#4F46E5",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        {/* table head */}
        <thead className="bg-blue-500 text-white">
          <tr>
            <td className="hidden md:table-cell px-4 py-2 text-left">Index</td>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            {!isCompletedPage && (
              <th className="px-4 py-2 text-left">Action</th>
            )}
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {todoItems.map((todo, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="hidden md:table-cell px-4 py-2 text-gray-600 align-middle">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-gray-600 align-middle">
                {todo.date}
              </td>
              <td
                className="px-4 py-2 text-gray-600 font-medium cursor-pointer align-middle"
                title={todo.description}
                onClick={() => handleDescriptionVisual(todo.description)}
              >
                {todo.title}
              </td>
              <td className="px-4 py-2 text-gray-600 font-medium align-middle">
                {todo.status}
              </td>
              {!isCompletedPage && (
                <td className="px-4 py-2 align-middle">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={() => updateTodoStatus(todo._id)}
                  >
                    Mark Complete
                  </button>
                </td>
              )}
              <td className="px-4 py-2 align-middle">
                <button
                  onClick={() => softDeleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-600 text-lg"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoItem;
