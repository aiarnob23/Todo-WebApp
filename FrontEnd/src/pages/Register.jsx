import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { createNewUser } from "../utils/create-user";
import { successAlert } from "../utils/sweetAlerts";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setError] = useState("");

  const navigate = useNavigate();
  const { GoogleSignIn, manualSignUp } = useContext(AuthContext);

  const GRegistration = async () => {
    setError("");
    await GoogleSignIn()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          console.log(user.email, user.displayName);
          await createNewUser(user.displayName, user.email);
          successAlert("Registration is successful");
          setTimeout(() => {
            navigate("/");
          }, 600);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const manualRegistration = async (e) => {
    e.preventDefault();
    setError("");
    await manualSignUp(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log(name, email);

          await updateProfile(user, {
            displayName: name,
          });

          await createNewUser(name, email);

          successAlert("Registration is successful");
          setTimeout(() => {
            navigate("/login");
          }, 600);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to split text into characters for animation, including spaces
  const renderAnimatedText = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block ${
          index % 2 === 0 ? "animate-pulse-up" : "animate-pulse-down"
        }`}
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-[#f7f7f7] p-5 ">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 animate-fade-in">
        {renderAnimatedText("Empower Your Goals")}
      </h1>
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-lg shadow-gray-500 p-8 animate-fade-in">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Create Your Account
        </h1>
        <form onSubmit={manualRegistration} className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Already registered?</span>
          <Link to="/login" className="text-teal-500 hover:underline">
            Login please
          </Link>
        </div>

        <div className="flex items-center justify-center my-4">
          <span className="border-t border-gray-300 flex-1"></span>
          <span className="mx-2 text-gray-500">or</span>
          <span className="border-t border-gray-300 flex-1"></span>
        </div>

        <button
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
          onClick={GRegistration}
        >
          <FaGoogle className="mr-2 text-2xl" />
          Register with
          <span className="ml-1 text-xl" style={{ color: "#4285F4" }}>
            G
          </span>
          <span className="text-xl" style={{ color: "#EA4335" }}>
            o
          </span>
          <span className="text-xl" style={{ color: "#FBBC05" }}>
            o
          </span>
          <span className="text-xl" style={{ color: "#4285F4" }}>
            g
          </span>
          <span className="text-xl" style={{ color: "#34A853" }}>
            l
          </span>
          <span className="text-xl" style={{ color: "#EA4335" }}>
            e
          </span>
        </button>
      </div>
    </div>
  );
};

export default Register;
