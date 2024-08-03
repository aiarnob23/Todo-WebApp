import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <span>
        <span className="loading loading-bars loading-lg"></span>
      </span>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default PrivateRoute;
