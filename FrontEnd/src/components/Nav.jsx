import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import "../components/Nav.css";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);


 //nav links
  const NavLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/incomplete-todos">Incomplete todos</NavLink>
      </li>
      <li>
        <NavLink to="/completed-todos">Completed todos</NavLink>
      </li>
      <li>
        <NavLink to="/trash">Trash</NavLink>
      </li>
    </>
  );


  //handle log out
  const handleLogOut = async () => {
    logOut()
      .then(() => {
      console.log('logged out successfully');
      })
      .catch((error) => {
      console.log(error);
    })
  }

  //return navbar 
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              id="navs"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
             {NavLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">{user && user.displayName}</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul id="navs" className="menu space-x-2 menu-horizontal px-1">
           {NavLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={handleLogOut}>Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
