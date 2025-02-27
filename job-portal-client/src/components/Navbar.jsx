import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // No need for user and logout here

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-3xl text-black">
          <img src="/images/Group 3.png" alt="Logo" /> <span>Job Portal</span>
        </a>

        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-xl">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-blue font-bold" : "text-black hover:text-blue"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="text-lg space-x-5 hidden lg:block">
          {isAuthenticated ? (
            <ProfileMenu /> // Using ProfileMenu when user is authenticated
          ) : (
            <button
              className="py-2 px-5 border rounded bg-blue text-white hover:bg-blue"
              onClick={loginWithRedirect}
            >
              Login
            </button>
          )}
        </div>

        {/* Menu Toggler for Mobile */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-black" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Nav Items for Mobile */}
      <div className={`px-4 bg-white py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base py-1">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-blue font-bold" : "text-black hover:text-blue"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="py-1">
            {isAuthenticated ? (
              <ProfileMenu /> // ProfileMenu in mobile view
            ) : (
              <button
                className="text-blue hover:text-blue"
                onClick={loginWithRedirect}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
