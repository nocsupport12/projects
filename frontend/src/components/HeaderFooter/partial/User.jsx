import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import UserLogo from "../../../assets/User.png";

export const User = (userDetails) => {
  const [dropdownProfileVisible, setDropdownProfileVisible] = useState(false);
  const navigate = useNavigate();
  const toggleDropdownProfile = () => {
    setDropdownProfileVisible(!dropdownProfileVisible);
  };
  const closeDropdowns = () => {
    setDropdownProfileVisible(false);
  };
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("//////");
    localStorage.removeItem("receiver");
    navigate("/");
    closeDropdowns();
    window.location.reload(false);
  };
  return (
    <>
      {!userDetails.userDetails ? (
        ""
      ) : (
        <div className="h-1 p-0 w-12 relative bottom-3">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            onClick={toggleDropdownProfile}
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={UserLogo}
              alt="user photo"
            />
          </button>

          <div
            id="user-dropdown"
            className={`z-10 ${
              dropdownProfileVisible
                ? "visible opacity-100 relative right-20 md:right-40"
                : "invisible opacity-0"
            } transition-opacity duration-300 ease-in-out font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hov
     
      er:text-white"
                  onClick={closeDropdowns}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={closeDropdowns}
                >
                  Publish
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/conference"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={closeDropdowns}
                >
                  Meeting
                </NavLink>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={logOut}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
