// Chats.js
import { useState, useEffect, useRef } from "react";
import { ChatViews } from "./ChatView/ChatViews";
import { ConversationView } from "./ConversationView/ConversationView";
import { VideoCall } from "./ConversationView/VideoCall";
import { useSocket } from "../Context/SocketProvider";
import {
 
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// IMPORT RINGTONE
import Ringtone from "../../assets/ringtone/7120-download-iphone-6-original-ringtone-42676.mp3"
import { CreateChat } from "./ChatView/CreateChat";

export const Chats = () => {
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  // const globalUrl = "http://localhost:8000"
  // const socketUrl = process.env.REACT_APP_GLOBAL_SOCKET;
  const [chatView, setChatView] = useState("");
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState({ receivers: [] });
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [sendCall, setSendCall] = useState({ receivers: [] });
  const [receiveCall, setReceiveCall] = useState(null);
  const [callType, setCallType] = useState("Video");
  const [calling,setCalling] = useState(null)
  const [imCalling,setImCalling] = useState(false)
  // const [acceptCall, setAcceptCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const userId = localStorage.getItem("user");
  const [allUsers, setAllUsers] = useState([]); // Added state for all users
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [createChatUsers, setCreateChatUsers] = useState(null);
  const [searchChat, setSearchChat] = useState("");
  const [newChat, setNewChat] = useState(null);
  const [back, setBack] = useState(false);
  const socket = useSocket();
  
  const toast = useToast();
  
  const handleBack = () => {
    setBack(!back);
  };
  useEffect(() => {
    socket.emit("new-user-add", userId);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    
  }, [userId]);
  useEffect(() => {
    socket.on("call:progress", (data) => {

      const user = data.socketId
      
      setCalling(user)
    });
    const timeOut = setTimeout(()=> {  

      if(incomingCall){
        setReceiveCall(null)
      }
    } , 15000)
   
    socket.on("user:disconnect", (data) => {

      if (receiveCall) {
        if (receiveCall.socketId===data.user) {
         
          setReceiveCall(null)
          setIncomingCall(null)
          window.location.reload(false)
        }
      }      
        if (calling===data.user) {
          setReceiveCall(null)
          setIncomingCall(null)
          window.location.reload(false)
        }

      
    

    });

    return (() => {
      clearTimeout(timeOut)
    })
  }, [receiveCall, incomingCall, calling])
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [sendMessage]);
  useEffect(() => {
    if (newChat !== null) {
      socket.emit("new:chat", newChat);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [newChat]);
  useEffect(() => {
    if (deleteMessage !== null) {
      socket.emit("delete-message", deleteMessage);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [deleteMessage]);
  const call = (receivers, userId, callType) => {
    // setSendCall({
    //   receivers,
    //   callerId: userId,
    // });
    setImCalling(true)
    setCallType(callType);
    setIncomingCall(false);
    setReceiveCall(true);
    socket.emit("send:call", {
      room: chatView,
      userId: userId,
      receivers: receivers,
      callType: callType,
    });
    
    socket.emit("room:join", {
      room: chatView,
      userId: userId,
    });
    
  };
  const acceptCall = () => {
    
    socket.emit("room:join", {
      room: incomingCall?.room,
      userId: userId,
    });
  };
  const ignoreCall = (data)=>{
    socket.emit("ignore:call", {data})
  }

  useEffect(() => {
    socket.on("call-request", (data) => {
      setReceiveCall(data);
      setIncomingCall(true);
    });
    socket.on("call-failed", (data) => {});
    if (sendCall !== null) {
      socket.emit("send-call", sendCall);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [sendCall]);

  useEffect(() => {
    if (acceptCall !== null) {
      socket.emit("accept-call", { ...acceptCall, userId });
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [acceptCall]);

  const fetchAllUsers = async () => {
    try {
      const url = `${globalUrl}/useraccounts/retrieveAll`;
      const method = "GET";
      const header = {
        "Content-Type": "application/json",
        "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
      };
      const response = await fetch(url, {
        method,
        headers: header,
      });
      const data = await response.json();
      
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const url = `${globalUrl}/chat/retrieveChats/${userId}`;
      const method = "GET";
      const header = {
        "Content-Type": "application/json",
        "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
      };
      const response = await fetch(url, {
        method: method,
        headers: header,
      });
      const data = await response.json();
      if (data.length>1){

     
      setConversations(data);
      setSelectedChatId(
        data.sort((a, b) => {
          return b.lastmessages - a.lastmessages;
        })[0]._id
      );
      setChatView(
        data.sort((a, b) => {
          return b.lastmessages - a.lastmessages;
        })[0]._id
      );
      localStorage.setItem(
        "receiver",
        JSON.stringify(
          data[0].members.filter((el) => {
            return el !== userId;
          })
        )
      ); 
    }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleChat = (id, receivers) => {
    setReceiver(receivers);
    localStorage.setItem("receiver", JSON.stringify(receivers));
    setChatView(id);
    setSelectedChatId(id);
  };

  // UPDATE THE CHAT VIEWS COMPONENTS OF SENDING AND RECEIVING MESSAGES
  useEffect(() => {
    if (sendMessage !== null) {
      setConversations(
        conversations.map((conversation) => {
          if (conversation._id === sendMessage.chatId) {
            conversation.lastmessages = sendMessage.lastmessages;
            conversation.lastmessagetext = sendMessage.lastmessagetext;
            conversation.lastmessagesender = sendMessage.lastmessagesender;
          }

          return conversation;
        })
      );

      if (receiveMessage !== null) {
        setConversations(
          conversations.map((conversation) => {
            if (conversation._id === receiveMessage.chatId) {
              conversation.lastmessages = receiveMessage.lastmessages;
              conversation.lastmessagetext = receiveMessage.lastmessagetext;
              conversation.lastmessagesender = receiveMessage.lastmessagesender;
            }

            return conversation;
          })
        );
      }
    }
  }, [sendMessage, receiveMessage]);

  useEffect(()=>{

    if (deletedMessage !== null && deletedMessage?.isLastMessage) {
      const newConversations =  conversations.map((conversation) => {
        if (conversation._id === deletedMessage.chatId) {
          
          conversation.lastmessagetext = "Unsent a message";
          conversation.lastmessagesender = deletedMessage.deleterId;
        }

        return conversation;
      })
      setConversations(newConversations);
    }
  },[deletedMessage])

  useEffect(() => {
    const ringtone = new Audio(Ringtone);
    
    


    socket.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
    socket.on("receive-message-delete", (data) => {
      setDeletedMessage(data);
    });
    // NEW CHAT CREATED RECEIVE
    socket.on("new:chat:created", (data) => {
   

      setConversations([data, ...conversations]);
    });

    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    // ///////// /CALL
    socket.on("receive:call", (data) => {
     
      setCallType(data.callType);
      setReceiveCall(data);
      setIncomingCall(data);

      // if (data.receivers !== userId) {
      //   ringtone.play();
      // }
      if (data.userId === userId) {
        // Play the ringtone only after user interaction
        document.addEventListener("click", () => {
          ringtone.play().catch(error => {
            console.error("Failed to play ringtone:", error);
          });
          document.removeEventListener("click", null); // Remove the event listener after playing
        }, { once: true });
      }
    
   
          
    });
    return () => {
      socket.off("receive-message", (data) => {
        setReceiveMessage(data);
      });
      socket.off("receive-message-delete", async (data) => {
        if (data.isLastMessage) {
          // const newConversations
        }
        setDeletedMessage(data);
      });
      // NEW CHAT CREATED RECEIVE
      socket.off("new:chat:created", (data) => {
        

        setConversations([data, ...conversations]);
      });

      socket.off("get-users", (users) => {
        setOnlineUsers(users);
      });

      // ///////// /CALL
      return () => {
        socket.off("receive:call", (data) => {
        
          setCallType(data.callType);
          setReceiveCall(data);
          setIncomingCall(data);
        });

      }
      
    };

   
  }, [socket, conversations]);

  useEffect(() => {
    fetchChats();
    fetchAllUsers(); // Fetch all users when the component mounts
  }, []);

  useEffect(() => {
    // Ensure that the scroll behavior is reverted when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  /////////////////CREATE CHAT
  const createChat = () => {
    const ownUser = allUsers.find((el) => el._id === userId);
    const newCreateChatUsers = allUsers
      .filter((el) => {
        return el._id !== userId;
      })
      .filter((el) => {
        return Number(el.level) < Number(ownUser.level);
      });
    setCreateChatUsers(newCreateChatUsers);
  };
  const createChatDB = async () => {
    let usersInNewChat = [];
    createChatUsers.map((user) => {
      if (user.added) {
        usersInNewChat.push(user._id);
      }
    });
    
    if (usersInNewChat.length + 1 < 3) {
      toast({
          title: "Group chat should consist of atleast 3 members",
          status: "warning",
          duration: "2000",
          isClosable: true,
          position: "top",
        });
    } else {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };
        const body = { members: [userId, ...usersInNewChat] };
        const response = await axios.post(`${globalUrl}/chat/create`, body, {
          headers: header,
        });
        if (response) {
          setNewChat(response);
          setCreateChatUsers(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const handleSearchChat = (query) => {
      const updatedConversations = conversations.map((conversation) => {
        const matchFound = conversation.members
          .filter((member) => member !== userId)
          .some((member) => {
            const memberInfo = allUsers.find((user) => user._id === member);
            if (memberInfo) {
              const memberName = memberInfo.fullname || "";
              return memberName.toLowerCase().includes(query.toLowerCase());
            }
            return false;
          });

        return { ...conversation, search: !matchFound };
      });

      setConversations(updatedConversations);
    };

    if (searchChat.trim() !== "") {
      handleSearchChat(searchChat.trim());
    }
  }, [searchChat]);

  
    
  

  return (
    <>
      <>
        <div className="fixed inset-0 bg-white z-50">
        
          {/* STATE FOR CREATE CHAT USERS */}
          {createChatUsers && (
              <CreateChat setCreateChatUsers={setCreateChatUsers} createChatUsers={createChatUsers} createChatDB={createChatDB}/> 
          )}
          <div className="flex">
            {/* CHAT VIEW */}
            <section
              className={`w-[100%] lg:w-[28%] h-[100vh]  border-r border-gray-200 ${
                back ? "hidden" : ""
              }  lg:block`}
            >
              <div className="flex items-center justify-between h-[10vh] px-3">
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <span>
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                </Link>

                <div>
                  <h2 className="text-2xl">Community</h2>
                </div>
                <div className="px-3"></div>
              </div>

              <div className="px-3 pb-5 h-[10vh]">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                    ml="10px"
                  />
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Search"
                    pl="40px"
                    onChange={(e) => setSearchChat(e.target.value)}
                  />
                </InputGroup>
              </div>

              <ul id="conversations" className="h-[70vh] overflow-auto">
                {conversations.sort((a, b) => {
                  return b.lastmessages - a.lastmessages;
                }).length !== 0 ? (
                  conversations.map((conversation, index) => {
                    if (conversation.members.length === 2) {
                      return conversation.members.map((member) => {
                        if (member !== userId) {
                          return (
                            <div key={index}>
                              {!conversation.search && (
                                <ChatViews
                                  key={index}
                                  userId={[member]}
                                  chatId={conversation._id}
                                  lastMessages={conversation.lastmessages}
                                  lastMessageText={conversation.lastmessagetext}
                                  lastMessageSender={
                                    conversation.lastmessagesender
                                  }
                                  functions={handleChat}
                                  onlineUsers={onlineUsers}
                                  receiveMessage={receiveMessage}
                                  back={setBack}
                                  isSelected={
                                    conversation._id === selectedChatId
                                  }
                                />
                              )}
                            </div>
                          );
                        }
                      });
                    } else {
                      return (
                        <div key={index}>
                          {!conversation.search && (
                            <ChatViews
                              key={index}
                              userId={conversation.members.filter((el) => {
                                return el !== userId;
                              })}
                              chatId={conversation._id}
                              functions={handleChat}
                              back={setBack}
                              onlineUsers={onlineUsers}
                              receiveMessage={receiveMessage}
                              lastMessages={conversation.lastmessages}
                              lastMessageText={conversation.lastmessagetext}
                              lastMessageSender={conversation.lastmessagesender}
                              isSelected={conversation._id === selectedChatId}
                              allUsers={allUsers}
                            />
                          )}
                        </div>
                      );
                    }
                  })
                ) : (
                  <h2 className="text-center font-bold">No Conversations available</h2>
                )}
              </ul>

              {/* <Flex h="10vh" align="center" pl={2}>
                <Button onClick={createChat} >
                <span className="pr-2">
                  <i
                    className="fa-solid fa-plus hover:cursor-pointer"
                    
                  ></i>
                </span>
                <Text as="p">Create Chat</Text>
                </Button>
              </Flex> */}
              
            </section>

            {/* CONVERSATION VIEW */}
            {userId && (
              <div
                className={`  bg-white w-[100%] lg:w-[72%] block ${
                  !back ? "hidden" : ""
                } lg:block`}
              >
                <ConversationView
                  chatId={chatView}
                  userId={userId}
                  key={chatView}
                  back={handleBack}
                  backVar={back}
                  setSendMessage={setSendMessage}
                  receiveMessage={receiveMessage}
                  setIncomingCall={setIncomingCall}
                  setReceiveCall={setReceiveCall}
                  setSendCall={setSendCall}
                  setDeleteMessage={setDeleteMessage}
                  deletedMessage={deletedMessage}
                  setReceiveMessage={setReceiveMessage}
                  setDeletedMessage={setDeletedMessage}
                  call={call}
                  allUsers={allUsers} // Pass the users to ConversationView
                />
              </div>
            )}
          </div>
        </div>
      </>
      {receiveCall && (<>
              
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
        {/* {!receiveCall?.userId && } */}
      
          {incomingCall && (
            <>
            
              
            <div className="bg-white p-8 rounded-md shadow-lg text-center">
              <p className="text-lg font-bold mb-4">
                Incoming Call From {allUsers?.find((el)=>receiveCall?.userId===el._id)?.fullname}
              </p>
                <audio src={Ringtone} autoPlay loop controls={false} preload="auto" />
              
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md focus:outline-none"
                  onClick={() => {
                    acceptCall();
                    setIncomingCall(false);
                  }}
                >
                  Accept Call
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
                  onClick={() => {ignoreCall(receiveCall.socketId);setReceiveCall(null); setIncomingCall(null);}}
                >
                  Ignore
                </button>
              </div>
            </div>
                
            </>
          )}
        

          {!incomingCall && (
            <div className="relative flex justify-center items-center w-full h-full">
              <VideoCall
                socket={socket}
                userId={userId}
                chatId={chatView}
                allUsers={allUsers}
                receivers={receiver}
                callType={callType}
                setCallType={setCallType}
                imCalling={imCalling}
                setImCalling={setImCalling}
              />
            </div>
          )}
        </div>
        </> )}
        
    </>
  );
};
