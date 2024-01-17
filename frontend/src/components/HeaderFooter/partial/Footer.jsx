import { NavLink, Link } from "react-router-dom";

export const Footer = (userDetails) => {
  const transition = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };
  return (
    <footer className="font-poppins bg-darkModeBlack dark:bg-darkModeGray text-white">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 py-4 gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          <div className="col-span-1">
            <div className="text-center">
              <h2 className="text-xl pb-5 text-primary font-semibold md:text-2xl">
                Contact Details
              </h2>
              <p className="text-sm">Mobile Number: (+63) 988 123 4567</p>
              <p className="text-sm">Telephone Number: (02) 846 9564</p>
              <p className="text-sm">Email: bicol1community@gmail.com</p>
              <h1 className="text-sm">
                Address: Summerfield Villas Taytay, Rizal
              </h1>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl pb-2 text-primary font-semibold">
                Legal
              </h2>
              <div className="pb-1">
                <Link to="licensing">
                  <p className="hover:text-primary text-sm">Licensing</p>
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link
                  exact="true"
                  to="termsofservice"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <p className="hover:text-primary text-sm">Term of Service</p>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-primary font-semibold text-xl md:text-2xl pb-2 ">
                Services
              </h2>
              <div className="pb-1 px-10">
                <Link exact="true" to="/faq" onClick={transition}>
                  <p className="hover:text-primary text-sm">FAQs</p>
                </Link>
                <Link exact="true" to="/donation" onClick={transition}>
                  <p className="hover:text-primary text-sm pt-3">Donate</p>
                </Link>
                {userDetails.userDetails !== false ? (
                  ""
                ) : (
                  <Link exact="true" to="/signin" onClick={transition}>
                    <p className="hover:text-primary text-sm pt-3">Sign In</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-center">
              <h2 className="text-3xl pb-2 text-primary font-semibold">
                Be One Of Us
              </h2>
              <p className="  py-1">
                Join us and contribute to our foundation's initiatives.
              </p>
              <div className="pt-2">
                <div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeiSuHMChJpsfELaE7hUwMQ1E-182pJL64t7ICfBSG8KP86UA/viewform?vc=0&c=0&w=1&flr=0"
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn text-xl">Register</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-2 border-t border-gray-400">
        <p className="text-xs">
          Copyright © 2023 All rights reserved | Made by BicolOneCommunity
        </p>
      </div>
    </footer>
  );
};
