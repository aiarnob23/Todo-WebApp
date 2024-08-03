import { useContext, useEffect, useState } from "react";
import { getCompletedTodos } from "../utils/getTodos";
import TodoItem from "../components/TodoItem";
import { AuthContext } from "../authProvider/AuthProvider";

const CompletedTodo = () => {
  const { user } = useContext(AuthContext) ;
  const [loading, setLoading] = useState(true);

  const [completedTodos, setCompletedTodos] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getCompletedTodos(user?.email);
      setCompletedTodos(data);
      setLoading(false);
    };
    getData();
  }, [user]);

  return (
    <div className="container bg-blue-200 mx-auto mt-2 mb-4 rounded-lg p-6 min-h-[700px]">
      {loading ? (
        <div>
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : (
        <div>
          {completedTodos?.length > 0 ? (
            <TodoItem todoItems={completedTodos} />
          ) : (
            <h3>No record found!</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletedTodo;
