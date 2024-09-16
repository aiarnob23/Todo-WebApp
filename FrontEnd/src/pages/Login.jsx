import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { userDetails } from "../utils/getUserDetails";
import { createNewUser } from "../utils/create-user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { successAlert } from "../utils/sweetAlerts";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { manualLogIn, GoogleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  // Manual login handle
  const manualSignIn = async (e) => {
    e.preventDefault();
    setError("");
    await manualLogIn(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        successAlert("Login is successful");
        setTimeout(() => {
          navigate("/");
        }, 600);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Google login handle with isUserExists checking
  const googleSignIn = async () => {
    setError("");
    await GoogleSignIn()
      .then(async (result) => {
        const data = await userDetails(result.user.email);
        console.log(data);
        if (data.data.length) {
          successAlert("Login is Successful");
          setTimeout(() => {
            navigate("/");
          }, 600);
        } else {
          createNewUser(result.user.displayName, result.user.email);
          successAlert("Registration is successful");
          setTimeout(() => {
            navigate("/");
          }, 600);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    navigate(location?.state ? location.state : "/");
  };

  // Return body
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-300 to-blue-500">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Todo Web App
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={manualSignIn} className="space-y-4">
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">New here?</span>
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register first
          </Link>
        </div>

        <div className="flex items-center justify-center my-4">
          <span className="border-t border-gray-300 flex-1"></span>
          <span className="mx-2 text-gray-500">or</span>
          <span className="border-t border-gray-300 flex-1"></span>
        </div>

        <button
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
          onClick={googleSignIn}
        >
          <FaGoogle className="mr-2 text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
