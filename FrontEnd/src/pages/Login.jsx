import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { userDetails } from "../utils/getUserDetails";
import { createNewUser } from "../utils/create-user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { successAlert } from "../utils/sweetAlerts";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { manualLogIn, GoogleSignIn } = useContext(AuthContext) ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  //manual login handle
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
  //google login handle with isUserExists checking
  const googleSignIn = async () => {
    setError("");
    await GoogleSignIn()
      .then(async (result) => {
        const data = await userDetails(result.user.email);
        console.log(data);
        if (data.data.length) {
          successAlert("Login is Successful");
           setTimeout(() => {
              navigate('/');
            }, 600);
        } else {
          createNewUser(result.user.displayName, result.user.email);
          successAlert("Registration is successful");
           setTimeout(() => {
              navigate('/');
            }, 600);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    navigate(location?.state ? location.state : "/");
  };
  //return body
  return (
    <div className=" flex bg-blue-200 justify-center items-center h-screen w-full">
      <div className=" p-2">
        <h1 className="text-center font-semibold text-3xl text-gray-700 my-4">
          Login Please
        </h1>
        <div>
          <form onSubmit={manualSignIn} action="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input m-2 border-2 border-gray-500"
            />
            <br />
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input m-2 border-2 border-gray-500"
            />
            <br />
            <div className="w-full flex justify-center">
              <button className=" my-3 btn btn-primary text-xl" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="w-full flex items-center justify-center">
          <p>
            new here?{" "}
            <span className="btn btn-ghost">
              <Link to="/register">Register first</Link>
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <hr className="flex-1" />
          <span className="mx-2 my-2">or</span>
          <hr className="flex-1" />
        </div>
        <button
          className="text-center text-xl w-full my-2"
          onClick={googleSignIn}
        >
          Sign In with
          <span className="text-3xl">
            <span style={{ color: "#4285F4" }}> G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
        </button>
        <div className="text-red-500">{errorMessage}</div>
      </div>
    </div>
  );
};

export default Login;
