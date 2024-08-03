import { useContext, useEffect, useState } from "react";
import { getTrashTodos } from "../utils/getTodos";
import { permanetDeleteTodo } from "../utils/deleteTodo";
import { AuthContext } from "../authProvider/AuthProvider";

const Trash = () => {
  const { user } = useContext(AuthContext) ;
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
    <div className="container bg-blue-200 mx-auto mt-2 mb-4 rounded-lg p-6 min-h-[700px]">
      {loading ? (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          {trashData?.length > 0 ? (
            trashData.map((todo, index) => (
              <div key={index}>
                <div className="flex items-center justify-start my-2 space-x-12">
                  <button
                    className="btn bg-red-400 text-white"
                    onClick={() => permanetDeleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                  <div>{todo.title}</div>
                  <div> {todo.date}</div>
                </div>
              </div>
            ))
          ) : (
            <h3>Empty</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Trash;
