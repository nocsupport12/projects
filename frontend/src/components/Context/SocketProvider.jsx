import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.REACT_APP_GLOBAL_SOCKET;


const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(`${socketUrl}`), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};



