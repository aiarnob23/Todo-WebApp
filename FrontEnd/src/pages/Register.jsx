import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { createNewUser } from "../utils/create-user";
import { successAlert } from "../utils/sweetAlerts";
import { windowLocChange } from "../utils/windowLocationChange";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setError] = useState("");

  const { GoogleSignIn, manualSignUp } = useContext(AuthContext);

  //google registration handle
  const GRegistration = async () => {
    setError("");
    await GoogleSignIn()
      .then(async (result) => {
        const user = await result.user;
        if (user) {
          console.log(user.email, user.displayName);
          await createNewUser(user.displayName, user.email);
          successAlert("Registration is successful");
          windowLocChange("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //manual registration handle
  const manualRegistration = async (e) => {
    e.preventDefault();
    setError("");
    await manualSignUp(email, password)
      .then(async (result) => {
        const user = await result.user;
        if (user) {
          console.log(name, email);
          await createNewUser(name, email);
          successAlert("Registration is successful");
          windowLocChange("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //return body
  return (
    <div className="flex items-center justify-center w-full h-screen bg-blue-200 p-10 lg:p-0">
      <div>
        <h1 className="text-center my-3 text-3xl font-semibold text-gray-700">
          Register Here
        </h1>
        <form onSubmit={manualRegistration} action="">
          <div className="w-full flex flex-col justify-center items-center">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="input m-2 border-2 border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input m-2 border-2 border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="input m-2 w-[200px] border-2 border-gray-500"
              />
            </div>
          </div>
          <div className="w-full flex justify-center my-2">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="w-full flex items-center justify-center">
          <p>
            Already registered?
            <span className="btn btn-ghost">
              <Link to="/login">Login please</Link>
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <hr className="flex-1" />
          <span className="mx-2">or</span>
          <hr className="flex-1" />
        </div>
        <div className="flex my-4 justify-center">
          <button className="text-xl" onClick={GRegistration}>
            Register with
            <span className="text-3xl">
              <span style={{ color: "#4285F4" }}> G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </span>
          </button>
        </div>
        <div className="text-red-500">{errorMessage}</div>
      </div>
    </div>
  );
};

export default Register;
