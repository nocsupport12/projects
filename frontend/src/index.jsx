import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// import dotenv from 'dotenv';
import { App } from "./App";
import "./index.css";
import { SocketProvider } from "./components/Context/SocketProvider";
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    {/* <React.StrictMode> */}
    
    <BrowserRouter>
      <SocketProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SocketProvider>
    </BrowserRouter>
    
    {/* </React.StrictMode> */}
  </>
);
