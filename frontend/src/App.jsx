import { Header, Footer } from "./components/HeaderFooter/compiler";
import React, { useEffect, useState } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useSocket } from "./components/Context/SocketProvider";
// import { Chats } from "../src/components/Chats/Chats";

// const globalUrl = "http://localhost:8000"

export const App = () => {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme);
  let user = localStorage.getItem("user");
  let token = localStorage.getItem("//////");
  const [userDetails, setUserDetails] = useState(false);

  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  const socket = useSocket();
  useEffect(() => {
    if (user) {
      socket.emit("new-user-add", user);      
    }       
  }, [userDetails]);
  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("//////");
    localStorage.removeItem("receiver");
    // localStorage.clear()
    setUserDetails(false);
  };

  // WHEN SOMEONE CHANGE THE LOCAL IT WILL AUTOMATICALLY LOGOUT
  useEffect(() => {
    const userChecking = () => {
      const user = localStorage.getItem("user");
      if (user) {
        if (user !== userDetails._id) {
          fetchData();
          setTimeout(() => {
            if (user && userDetails._id !== undefined) {
              removeUser();
              window.location.reload(false);
            }
          }, 1000);
        }
      }
    };
    window.addEventListener("storage", userChecking);
    return () => {
      window.removeEventListener("storage", userChecking);
    };
  }, []);

  
  useEffect(() => {
    // Update the class on the root HTML element whenever the theme changes
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the current theme preference to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const fetchData = async () => {
    const url = `${globalUrl}/useraccounts/retrieve/` + user;
    const method = "GET";
    const header = {
      "Content-Type": "application/json",
      "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
    };
    try {
      const response = await fetch(url, {
        method,
        headers: header,
      });
      const data = await response.json();
      if (data.message) {
        removeUser();
      } else {
        setUserDetails(data);
      }
      setTimeout(() => {
        if (token !== data.token) {
          removeUser();
        }
        if (Date.now() > Number(data.expiration)) {
          removeUser();
        }
      }, 2000);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  // console.log(user);

  // console.log(userDetails)
  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      {/* {user ? <Chats /> : ""} */}
      <Header userDetails={userDetails} />
      <AllRoutes userDetails={userDetails} />
      <ScrollToTop />
      {/* <BarangayBagacayRoutes />
        <BarangayBaludRoutes /> */}
      <div className="mt-auto">
        <Footer userDetails={userDetails} />
      </div>
    </div>
  );
};
