import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Wrap,
  WrapItem,
  
} from "@chakra-ui/react";


export const ChatViews = ({
  userId,
  chatId,
  functions,
  back,
  onlineUsers,
  isSelected,
  lastMessages,
  receiveMessage,
  lastMessageText,
  lastMessageSender,
  allUsers
}) => {
  const [user, setUser] = useState({});
  const [online, setOnline] = useState(false);
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  // const globalUrl = "http://localhost:8000"
  ////////////////////////////////////////////////////USER HERE IS THE 1ST OTHER USER IN THE CONVERSATION... NOT EQUAL TO LOCAL USER!!!!!
  // //////////////////OWN USER!!!!!!!!!!!
  const ownUser = localStorage.getItem("user");

  const fetchUser = async () => {
    const url = `${globalUrl}/useraccounts/retrieve/` + userId[0];
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
      setUser(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  
  useEffect(() => {
    if (Array.isArray(onlineUsers)) {
      setOnline(onlineUsers.some((el) => el.userId === userId[0]));
    }
  }, [onlineUsers]);

  return (
    <>
      <li
        onClick={() => {
          functions(chatId, userId);
          back(true);
        }}
        className={`hover:bg-gray-300 transition duration-1000 px-2 cursor-pointer ${
          isSelected ? "bg-gray-300" : ""
        }`}
      >
        <Flex gap="10px" className=" py-5">
          {userId.length === 1 ? (
            <>
            <Flex gap={2} py={3}>
                <Flex className="relative ">
                  <Wrap>
                    <WrapItem>
                      <Avatar
                        size='md' 
                        src={`${user?.picture ? `${user?.picture}` : "" }`} 
                        name={user?.fullname} 

                      />
                    </WrapItem>
                  </Wrap>
                  {online ? (
                    <div>
                      <span className={`absolute  right-0 text-[12px] ${lastMessageText  ? "bottom-3" : "bottom-0"}`}>
                        <i className="fa-solid fa-circle text-lime-600 "></i>
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className={`absolute  right-0 text-[12px] ${lastMessageText  ? "bottom-3" : "bottom-0"}`}>
                        <i className="fa-solid fa-circle text-gray-400 "></i>
                      </span>
                    </div>
                  )}
                </Flex>

                {/* USERNAME AND LAST MESSAGE  */}
                <Flex flexDir="column">
                
                  <h2 className="font-poppins text-[16px]">{user.fullname} </h2>
                  <p className="font-poppins text-[12px]">
                  {lastMessageText ? (
                    <>
                      {lastMessageSender === ownUser ? "You: " : ``}
                      {lastMessageText.slice(0, 14)}
                      {lastMessageText.length > 14 ? "..." : ""}
                    </>
                  ) : (
                    <></>
                  )}
                  
                </p>
                {" "}
                <p className="text-[14px]">{`${new Date(lastMessages)
                  .toString()
                  .split(" ")
                  .slice(
                    1,
                    new Date(lastMessages).toString().split(" ").length - 4
                  )
                  .join(" ")}`}</p>

                </Flex>
              </Flex>
            </>
          ) : (
            <>
              {/* FOR GROUPCHAT */}
              <Flex gap={2} py={3}>
                <Flex className="relative ">
                  <Wrap>
                    <WrapItem>
                      <Avatar size='md'  name="Group Chat" />
 
                    </WrapItem>
                  </Wrap>
                  {online ? (
                    <Box>
                      <span className={`absolute  right-0 text-[12px] ${lastMessageText  ? "bottom-3" : "bottom-0"}`}>
                        <i className="fa-solid fa-circle text-lime-600 "></i>
                      </span>
                    </Box>
                  ) : (
                    <Box>
                      <span className={`absolute  right-0 text-[12px] ${lastMessageText  ? "bottom-3" : "bottom-0"}`}>
                        <i className="fa-solid fa-circle text-gray-400 "></i>
                      </span>
                    </Box>
                  )}
                </Flex>

                {/* USERNAME AND LAST MESSAGE  */}
                <Flex flexDir="column">
                
                  <p> {`Group Chat with ${user.fullname} `}</p>
                  <p className="font-poppins text-[12px]">
                  {lastMessageText ? (
                    <>
                      {lastMessageSender === ownUser ? "You: " : ``}
                      {lastMessageText.slice(0, 14)}
                      {lastMessageText.length > 14 ? "..." : ""}
                    </>
                  ) : (
                    <></>
                  )}
                  
                </p>
                {" "}
                <p className="text-[14px]">{`${new Date(lastMessages)
                  .toString()
                  .split(" ")
                  .slice(
                    1,
                    new Date(lastMessages).toString().split(" ").length - 4
                  )
                  .join(" ")}`}</p>

                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </li>
    </>
  );
};
