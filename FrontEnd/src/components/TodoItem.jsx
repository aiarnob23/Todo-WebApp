import { useLocation } from "react-router-dom";
import { softDeleteTodo } from "../utils/deleteTodo";
import { updateTodoStatus } from "../utils/updateTodoStatus";
import Swal from "sweetalert2";

const TodoItem = ({ todoItems }) => {
  const location = useLocation();
  const isCompletedPage = location.pathname == "/completed-todos";

  const handleDescriptionVisual = (description) => {
    Swal.fire(description);
  }

  return (
    <div>
      <table className="table">
        {/* table head */}
        <thead>
          <tr>
            <td className="hidden md:flex">Index</td>
            <th>Date</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {todoItems.map((todo, index) => (
            <tr key={index}>
              <td className="text-gray-600 hidden md:flex">{index + 1}</td>
              <td className="text-gray-600">{todo.date}</td>
              <td
                className="text-gray-600 font-medium text-base "
                title={todo.description}
                onClick={()=>handleDescriptionVisual(todo.description)}
              >
                {todo.title}
              </td>
              <td className="text-gray-600 font-medium text-base">
                {todo.status}
              </td>
              {!isCompletedPage && (
                <td>
                  <button
                    className="text-gray-600 btn  font-medium text-xs  md:text-sm"
                    onClick={() => updateTodoStatus(todo._id)}
                  >
                    Mark complete
                  </button>
                </td>
              )}
              <td>
                <button onClick={() => softDeleteTodo(todo._id)}>
                  <i className="fa-solid text-base text-gray-600 fa-trash"></i>
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
