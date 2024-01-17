import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo-removebg-preview.png";
import { useEffect, useState } from "react";
import { User } from "../partial/User";
import DarkMode from "../../DarkMode/DarkMode";

// css
import "../css/header.css";

export const Header = (userDetails) => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("/");
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);
  const [dropdownProvinces, setDropdownProvinces] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropDown = () => {
    setDropdownProvinces(!dropdownProvinces);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setDropdownProvinces(false);
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  // console.log(userDetails)
  if (currentLocation === "/conference") {
    return (
      <>
        <nav className="fixed w-full z-40 bg-gray-800 flex">
          <Link to={"https://www.bicol1community.com/"}>
            <div className="h-[50px] flex justify-start items-center px-3 text-white hover:border hover:border-gray-600 hover:rounded-xl m-3">
              <i className="fa-solid fa-chevron-left pr-1"></i>Back
            </div>
          </Link>
        </nav>
      </>
    );
  }
  return (
    <nav className="fixed w-full z-40 bg-white border-gray-200 boder-b dark:bg-darkModeGray">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <div className="flex dark:text-white">
            <img src={Logo} alt="bicol-community" className="h-16 " />
            <p className="font-bold leading-none flex flex-col justify-center items-center">
              BICOL 1<span className="block">COMMUNITY</span>
              <span className="block font-semibold text-[10px]">
                BE ONE OF US
              </span>
            </p>
          </div>
        </Link>

        <div className="flex justify-center items-center lg:order-2">
          <div>
            {userDetails.userDetails === false ? (
              ""
            ) : (
              <User userDetails={userDetails.userDetails} />
            )}
          </div>
          <DarkMode />

          <div className="flex justify-center items-center lg:hidden">
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              className="inline-flex items-center  ms-3 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          }  w-full lg:block lg:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="font-poppins flex flex-col p-4 lg:p-0 mt-4 font-medium border rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 dark:text-white">
            <li>
              <NavLink
                to="/"
                className="nav-link py-2 rounded hover:text-primary lg:p-0 dark:hover:text-primary"
              >
                <h2 className="text-lg" onClick={closeMenu}>
                  Home
                </h2>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="nav-link py-2 rounded hover:text-primary lg:p-0"
              >
                <h2 className="text-lg" onClick={closeMenu}>
                  About
                </h2>
              </NavLink>
            </li>
            <li>
              <button
                onClick={toggleDropDown}
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center  w-full py-2  text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <h2 className="text-lg">Provinces</h2>{" "}
                <svg
                  className={`w-2.5 h-2.5 ms-3 ${
                    dropdownProvinces ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownNavbar"
                className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  dropdownProvinces ? "absolute" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      to="/bicol/sorsogon"
                      className="block px-4 py-2 bg-primary text-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Sorsogon
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bicol/camarinessur"
                      className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Camarines Sur
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bicol/camarinesnorte"
                      className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Camarines Norte
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bicol/albay"
                      className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Albay
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bicol/catanduanes"
                      className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Catanduanes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bicol/masbate"
                      className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeMenu}
                    >
                      Masbate
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                to="/news"
                className="nav-link py-2 rounded hover:text-primary lg:p-0"
              >
                <h2 className="text-lg" onClick={closeMenu}>
                  What's New
                </h2>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
