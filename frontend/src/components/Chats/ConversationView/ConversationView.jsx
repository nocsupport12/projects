// ConversationView.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notepad from "../../../assets/Notepad.png";

// import { emojify } from "react-emoji-picker";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";


import {  useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { ModalRemove } from "./ModalRemove";
import { Oval } from "react-loader-spinner";
import {
  Avatar,
  Button,
  Flex,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MediaDrawer from "./MediaDrawer";
import { InfoIcon } from "@chakra-ui/icons";

import { SearchConversation } from "./SearchConversation";
import SideDrawerOther from "./SideDrawerOther";

export const ConversationView = ({
  backVar,
  chatId,
  userId,
  setSendMessage,
  receiveMessage,
  setReceiveMessage,
  setDeleteMessage,
  deletedMessage,
  setDeletedMessage,
  allUsers,
  setSendCall,
  setReceiveCall,
  setIncomingCall,
  call,
  back, // Receive the users as a prop
  
}) => {
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const globalUrl = "http://localhost:8000"
  const [offset, setOffset] = useState(0);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receivers, setReceivers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [groupChat, setGroupChat] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videos, setVideos] = useState([]);
  const [display, setDisplay] = useState(null);
  const [displayImgVideo, setDisplayImgVideo] = useState(null);
  const [imgVideos, setImgVideos] = useState([]);
  const [err, setErr] = useState("");
  const [morePicture, setMorePicture] = useState(false);
  const [morePictureIndex, setMorePictureIndex] = useState(0);
  const containerRef = useRef(null);
  const [textLoading, setTextLoading] = useState(false);
  const [noMoreMessages, setNoMoreMessages] = useState(false);
  const [modalRemove, setModalRemove] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isSenderRemove, setIsSenderRemove] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaDrawer, setMediaDrawer] = useState("");
  const [sideDrawerOther, setSideDrawerOther] = useState(false)
  const [openConversationModal, setOpenConversationModal] = useState(false)
  

  const toast = useToast();
  const scroll = useRef();
  const navigate = useNavigate();

  const handleMorePicture = () => {
    setMorePicture(true);
  };

  const handleMediaDrawer = (media) => {
    setMediaDrawer(media);
    setOpenDrawer(true);
  };

  const [newFilesArray, setNewFilesArray] = useState([]);
  const fileInputRef = useRef(null);

  // RESPONSIBLE FOR CHOOSING OF EMOJI
  const addEmoji = (e) => {
    const sym = e.unified.split("_");

    const codeArray = sym.map((el) => parseInt(el, 16));

    // Check if all values in codeArray are valid numbers
    if (codeArray.some(isNaN)) {
      console.error("Invalid Unicode code point:", sym);
      return;
    }

    const emoji = String.fromCodePoint(...codeArray);

    // Update the state or do whatever you need with the emoji
    setMessage(message + emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Prevent the default behavior (submitting the form)
        e.preventDefault();

        // Insert a line break instead
        setMessage((prevMessage) => prevMessage + "\n");

        // Stop event propagation
        e.stopPropagation();
      } else {
        // Send message when Enter is pressed without Shift
        SendMessageDB();
      }
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const openModalRemove = (messageId) => {
    setModalRemove(messageId);
  };

  const closeModalRemove = () => {
    setModalRemove(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedReceivers = JSON.parse(localStorage.getItem("receiver"));
    if (storedReceivers) {
      setReceivers(storedReceivers);
    }
  }, []);
  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    if (scrollTop === 0) {
      if (!noMoreMessages) {
        setTextLoading(true);
        setTimeout(() => {
          fetchMessages(offset);
        }, 2000);
      }
      // You can also set a state or perform other actions here
    }
  };
  const fetchMessages = async (offset) => {
    // set loading true
    if (chatId) {
      if (!offset) {
        offset = 0;
      }
      try {
        const url = `${globalUrl}/message/retrieveAllWithLimit/${chatId}/${offset}`;
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

        const newMessages = [...data, ...messages];

        setMessages(newMessages);
        setOffset(offset + 20);
        if (data.filter((el) => !el.deleted.includes(userId)).length === 0) {
          setNoMoreMessages(true);
        }
        // setloading false

        setTextLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  const fetchImgVideo = async (offset) => {
    // set loading true
    if (chatId) {
      if (!offset) {
        offset = 0;
      }

      try {
        const url = `${globalUrl}/message/retrieveAll/${chatId}`;
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

        setImgVideos(data);

        setOffset(offset + 20);
        if (data.length === 0) {
          setNoMoreMessages(true);
        }
        // setloading false

        setTextLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  const fetchChat = async () => {
    if (chatId) {
      try {
        const url = `${globalUrl}/chat/findconversation/${chatId}`;
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

        if (data.members.length > 2) {
          setGroupChat(true);
        }
        setProfile(
          allUsers.find(
            (user) =>
              user._id ===
              data.members.filter((user) => {
                return user !== userId;
              })[0]
          )
        );
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  const uploadImageFiles = async (file) => {
    //
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "barangay_ariman_image");
      const api = `https://api.cloudinary.com/v1_1/${cloudinaryUrl}/image/upload`;

      const res = await axios.post(api, data);
      const secure_url = res.data.secure_url;

      return secure_url;
    } catch (error) {
      console.error( "Upload failed:", error);
    }
  };

  const uploadVideoFiles = async (file) => {
    try {
      // const uploadAll = async (file) => {
      // let uploadVideosUrl = [];
      // for (const video of videos) {
      if (file.size > 40 * 1024 * 1024) {
        setErr("File size exceeds the 40mb limit.");
        return;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "barangay_ariman_video");
      const api = `https://api.cloudinary.com/v1_1/${cloudinaryUrl}/video/upload`;

      const res = await axios.post(api, data);
      const secure_url = res.data.secure_url;

      // uploadVideosUrl.push(secure_url);
      // }

      return secure_url;
      // };
      // const urlArr = await uploadAll();
      // messageDB({urlArr, category:"video"});
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const uploadDocumentFiles = async (file) => {
    try {
      if (file.size > 40 * 1024 * 1024) {
        setErr("File size exceeds the 40mb limit.");
        return;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "documents"); // Replace with your Cloudinary upload preset
      const api = `https://api.cloudinary.com/v1_1/${cloudinaryUrl}/upload`;

      const res = await axios.post(api, data);
      const secure_url = res.data.secure_url;

      return secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error; // Rethrow the error to handle it in the calling function if needed
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchChat();
    fetchImgVideo();
    setDisplay(renderMessages());
    setDisplayImgVideo(renderImgVideo());
  }, [chatId, allUsers]);

  useEffect(() => {
    setDisplayImgVideo(renderImgVideo());
  }, [openDrawer, currentPage, mediaDrawer]);

  useEffect(() => {
    setDisplay(renderMessages());
    setDisplayImgVideo(renderImgVideo());
  }, [messages]);

  // RECEIVE MESSAGE REALTIME
  useEffect(() => {
    if (receiveMessage !== null) {
      // setMessages([...messages, receiveMessage]);
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
      setImgVideos((prevMessages) => [...prevMessages, receiveMessage]);
      setReceiveMessage(null);
    }
  }, [receiveMessage]);
  useEffect(() => {
    if (deletedMessage !== null) {
      const filteredMessages = messages.filter((message) => {
        return message._id !== deletedMessage.messageId;
      });
      setMessages(filteredMessages);
      setImgVideos(filteredMessages);
      setDeletedMessage(null);
    }
  }, [deletedMessage]);

  const messageDB = async (fileUrls) => {
    // let category = "";
    const url = `${globalUrl}/message/create`;
    const method = "POST";
    const header = {
      "Content-Type": "application/json",
      "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
    };

    const body = {
      chatId: chatId,
      senderId: userId,
      text: message,
      urls: fileUrls ? fileUrls : null,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: header,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data) {
        setMessage("");
        setMessages((prevMessages) => [...prevMessages, data.result]);
        setImgVideos((prevMessages) => [...prevMessages, data.result]);
        // REFERS TO SEND MESSAGE REALTIME
        updateChatLastMessageDB(message);
        // SOCKET REALTIME
        setSendMessage({
          _id: data.result._id,
          text: message,
          receivers,
          chatId,
          senderId: userId,
          urls: fileUrls ? fileUrls : null,
          category: "",
          lastmessages: Date.now(),
          lastmessagetext: message,
          lastmessagesender: userId,
        });

        // Reset the message input after sending
        setMessage("");

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setNewFilesArray([]);
        // Ensure that the file display is cleared
        setImages([]);
        setVideoUrl(null);
        setVideos([]);
        setDocuments([])

      }
      setLoading(false)
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };
  const updateChatLastMessageDB = async (message) => {
    const url1 = `${globalUrl}/chat/update/` + chatId;
    const method1 = "PATCH";
    const header1 = {
      "Content-Type": "application/json",
      "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
    };
    const body1 = {
      lastmessages: Date.now(),
      lastmessagetext: message,
      lastmessagesender: userId,
    };

    try {
      const response = await fetch(url1, {
        method: method1,
        headers: header1,
        body: JSON.stringify(body1),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const SendMessageDB = async () => {
    setShowEmojiPicker(false);
    const limitExceeded = await Promise.all(newFilesArray.map(async (file) => {
      if (file.size > 40 * 1024 * 1024) {
        toast({

          title: "File size exceeds the 40MB limit! File removed. Please replace the file that exceeded the limit.",
          status: "warning",
          duration: 7000,
          isClosable: true,
          position: "bottom", 
          
        });
        setNewFilesArray([...newFilesArray.filter(el=>el.name!==file.name)])
        return true;
      } else {
        return false 
      }     
    })); 
    
      if (limitExceeded.filter((el)=>el===true).length===0) {
        if (message.trim() || newFilesArray.length > 0) {
              setLoading(true);    
              
              if (newFilesArray.length > 0) {
                // Only send a message if there's content
                const fileUploading = async () => {
                  let arrayFiles = [];
                  // Use Promise.all to wait for all asynchronous operations to complete
                  await Promise.all(
                    newFilesArray.map(async (file, index) => {
                      if (file.type.startsWith("image/")) {
                        const img = await uploadImageFiles(file);
                        arrayFiles.push({ url: img, category: "image" });
                      } else if (file.type.startsWith("video/")) {
                        const vid = await uploadVideoFiles(file);
                        arrayFiles.push({ url: vid, category: "video" });
                      } else {
                        const docs = await uploadDocumentFiles(file);
                        arrayFiles.push({ url: docs, category: "documents" });
                      }
                    })
                  );
        
                  // All asynchronous operations are now completed
        
                  return arrayFiles;
                };
        
                // Call the function
                fileUploading().then((result) => {
                  messageDB(result); // This will print the arrayFiles after all uploads are finished
                });
              } else {
                messageDB();
              }          
          }  
        }
 
  };

  const UnsendMessage = async (option, messageId) => {
    if (option === "everyone") {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };

        // Handle logic for deleting for everyone
        const response = await axios.delete(
          `${globalUrl}/message/delete/${messageId}`,
          {
            headers: header,
          }
        );
        toast({
          title: "Successfully Unsend Message",
          status: "success",
          duration: "2000",
          isClosable: true,
          position: "top",
        });
        if (messages[messages.length - 1]._id === messageId) {
          updateChatLastMessageDB("Unsent a message");
          setDeleteMessage({
            receivers: receivers,
            messageId: messageId,
            deleterId: userId,
            isLastMessage: true,
            chatId: chatId,
          });
        } else {
          setDeleteMessage({
            receivers: receivers,
            messageId: messageId,
            isLastMessage: false,
            chatId: chatId,
            deleterId: userId,
          });
        }
        setMessages(messages.filter((message) => message._id !== messageId));
        setImgVideos(messages.filter((message) => message._id !== messageId));
      } catch (error) {
        console.error("Awit Error:", error);
        toast({
          title: "Message Not Removed",
          status: "warning",
          duration: "2000",
          isClosable: true,
          position: "top",
        });
      }
    } else if (option === "you") {
      // Handle logic for deleting for the sender only
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };
        const response = await axios.patch(
          `${globalUrl}/message/deleteForMe/${messageId}/${userId}`,
          { data: "blank" },
          {
            headers: header,
          }
        );
        toast({
          title: "Successfully remove message",
          status: "success",
          duration: "2000",
          isClosable: true,
          position: "top",
        });
        if (response) {
          setMessages(messages.filter((message) => message._id !== messageId));
          setImgVideos(messages.filter((message) => message._id !== messageId));
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Message Not Removed",
          status: "warning",
          duration: "2000",
          isClosable: true,
          position: "top",
        });
      }
    }
    // Update the UI by setting the state without the deleted message
  };
  const renderMessages = () => {
    return messages.map((message) => {
      const senderInfo = allUsers.find((user) => user._id === message.senderId);
      if (!message?.deleted?.includes(userId)) {
        return (
          <div
            key={message._id}
            className={`flex  ${
              message.senderId === userId ? " self-end" : "self-start "
            }`}
          >
            <div className="flex items-center gap-5">
              <>
                <span
                  className={`cursor-pointer ${
                    message.senderId !== userId ? "order-last" : ""
                  }`}
                    
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </span>
                <div
                  key={
                    message._id
                      ? message._id
                      : Math.floor(Math.random() * 10000000000)
                  }
                  ref={scroll}
                  className={`my-3 rounded-lg  ${
                    message.senderId === userId
                      ? "flex flex-wrap max-w-[90%] sm:max-w-[350px] bg-primary text-white px-5  py-2 self-end"
                      : "self-start flex   max-w-[400px] gap-2"
                  }`}
                  style={{ marginBottom: "8px" }}
                >
                  <div>
                    {message.senderId !== userId ? (
                      senderInfo ? (
                        
                        <Wrap>
                          <WrapItem>
                            <Avatar src={senderInfo.picture} name={senderInfo.fullname} alt="Receiver Profile"/>
                          </WrapItem>
                        </Wrap>
                      ) : (
                        "Loading..."
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`${
                      message.senderId !== userId && message?.urls?.length !== 0
                        ? "w-[90%]"
                        : "w-full"
                    }  ${
                      message.senderId === userId
                        ? ""
                        : "bg-white  rounded-2xl px-5 py-2"
                    }`}
                  >
                    <div>
                      {/* IF THERES A TEXT MESSAGE */}
                      {message.text && (
                        <>
                          <p
                            style={{
                              wordWrap: "break-word",
                              wordBreak: "break-word",
                            }}
                          >
                            {message.text}
                          </p>
                        </>
                      )}

                      {/* IF THERES A IMAGE/VIDEOS/DOCUMENTS */}
                      {message.urls && (
                        <>
                          <div>
                            {/* IMAGE VIDEO MAPPING */}
                            <div
                              onClick={(e) => setMorePicture(message?.urls)}
                              className={`flex flex-wrap justify-around  w-full cursor-pointer`}
                            >
                              {/* IMAGE, VIDEO, AND DOCUMENT PARENT */}
                              {message.urls.map((url, index) => {
                                if (index < 2) {
                                  if (url.category === "image") {
                                    return (
                                      <div
                                        key={index}
                                        className={` ${
                                          message.urls.length === 1
                                            ? "w-[100%]"
                                            : ""
                                        } ${
                                          message.urls.length === 2
                                            ? "w-[47%] lg:w-[48.8%] "
                                            : ""
                                        } ${
                                          message.urls.length > 2
                                            ? "w-[30%] lg:w-[31.8%]"
                                            : ""
                                        }`}
                                      >
                                        <img
                                          className="h-full  object-cover "
                                          src={url.url}
                                          alt={url.url}
                                        />
                                      </div>
                                    );
                                  } else if (url.category === "video") {
                                    return (
                                      <div
                                        key={index}
                                        className={`${
                                          message.urls.length === 1
                                            ? "w-[100%] "
                                            : ""
                                        } ${
                                          message.urls.length === 2
                                            ? "w-[47%] lg:w-[48.8%] "
                                            : ""
                                        } ${
                                          message.urls.length > 2
                                            ? "w-[30%] lg:w-[31.8%] "
                                            : ""
                                        }`}
                                      >
                                        <video
                                          controls
                                          className=" h-full w-full "
                                        >
                                          <source
                                            src={url.url}
                                            type="video/mp4"
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      </div>
                                    );
                                  } else if (url.category === "documents") {
                                    const isExcelFile =
                                      url.url.endsWith(".xlsx");
                                      const isCsv =
                                      url.url.endsWith(".csv");
                                    const isWordFile =
                                      url.url.endsWith(".docx");
                                    const isPowerPointFile =
                                      url.url.endsWith(".pptx");
                                    const isTextFile = url.url.endsWith(".txt");

                                    return (
                                      <div
                                        key={index}
                                        className={`${
                                          message.urls.length === 1
                                            ? "w-[100%]"
                                            : ""
                                        } ${
                                          message.urls.length === 2
                                            ? "w-[47%] lg:w-[48.8%] "
                                            : ""
                                        } ${
                                          message.urls.length > 2
                                            ? "w-[30%] lg:w-[31.8%]"
                                            : ""
                                        }`}
                                      >
                                        {isExcelFile ? (
                                          <span className="text-[10rem]">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 48 48"
                                              width="100%"
                                              height="100%"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="G7C1BuhajJQaEWHVlNUzHa"
                                                  x1="6"
                                                  x2="27"
                                                  y1="24"
                                                  y2="24"
                                                  data-name="Безымянный градиент 10"
                                                  gradientUnits="userSpaceOnUse"
                                                >
                                                  <stop
                                                    offset="0"
                                                    stopColor="#21ad64"
                                                  />
                                                  <stop
                                                    offset="1"
                                                    stopColor="#088242"
                                                  />
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="#31c447"
                                                d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m32,15h7v3h-7v-3Zm0,10h7v3h-7v-3Zm0,5h7v3h-7v-3Zm0-10h7v3h-7v-3Zm-7-5h5v3h-5v-3Zm0,10h5v3h-5v-3Zm0,5h5v3h-5v-3Zm0-10h5v3h-5v-3Z"
                                              />
                                              <path
                                                fill="url(#G7C1BuhajJQaEWHVlNUzHa)"
                                                d="m27,42l-21-4V10l21-4v36Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m19.13,31l-2.41-4.56c-.09-.17-.19-.48-.28-.94h-.04c-.05.22-.15.54-.32.98l-2.42,4.52h-3.76l4.46-7-4.08-7h3.84l2,4.2c.16.33.3.73.42,1.18h.04c.08-.27.22-.68.44-1.22l2.23-4.16h3.51l-4.2,6.94,4.32,7.06h-3.74Z"
                                              />
                                            </svg>
                                          </span>
                                        ) : isCsv ? 
                                        (
                                          <span className="text-[10rem]">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 48 48"
                                              width="100%"
                                              height="100%"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="G7C1BuhajJQaEWHVlNUzHa"
                                                  x1="6"
                                                  x2="27"
                                                  y1="24"
                                                  y2="24"
                                                  data-name="Безымянный градиент 10"
                                                  gradientUnits="userSpaceOnUse"
                                                >
                                                  <stop
                                                    offset="0"
                                                    stopColor="#21ad64"
                                                  />
                                                  <stop
                                                    offset="1"
                                                    stopColor="#088242"
                                                  />
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="#31c447"
                                                d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m32,15h7v3h-7v-3Zm0,10h7v3h-7v-3Zm0,5h7v3h-7v-3Zm0-10h7v3h-7v-3Zm-7-5h5v3h-5v-3Zm0,10h5v3h-5v-3Zm0,5h5v3h-5v-3Zm0-10h5v3h-5v-3Z"
                                              />
                                              <path
                                                fill="url(#G7C1BuhajJQaEWHVlNUzHa)"
                                                d="m27,42l-21-4V10l21-4v36Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m19.13,31l-2.41-4.56c-.09-.17-.19-.48-.28-.94h-.04c-.05.22-.15.54-.32.98l-2.42,4.52h-3.76l4.46-7-4.08-7h3.84l2,4.2c.16.33.3.73.42,1.18h.04c.08-.27.22-.68.44-1.22l2.23-4.16h3.51l-4.2,6.94,4.32,7.06h-3.74Z"
                                              />
                                            </svg>
                                          </span>
                                        ) : isWordFile ? (
                                          <span className="text-[10rem]">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 48 48"
                                              width="100%"
                                              height="100%"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="yURKxjsGzuO2sJnz7bo6Na"
                                                  x1="25"
                                                  x2="42"
                                                  y1="24"
                                                  y2="24"
                                                  gradientUnits="userSpaceOnUse"
                                                >
                                                  <stop
                                                    offset="0"
                                                    stopColor="#33bef0"
                                                  />
                                                  <stop
                                                    offset="1"
                                                    stopColor="#22a5e2"
                                                  />
                                                </linearGradient>
                                                <linearGradient
                                                  id="yURKxjsGzuO2sJnz7bo6Nb"
                                                  x1="29.53"
                                                  x2="4.68"
                                                  y1="24"
                                                  y2="24"
                                                  gradientUnits="userSpaceOnUse"
                                                >
                                                  <stop
                                                    offset=".11"
                                                    stopColor="#0d62ab"
                                                  />
                                                  <stop
                                                    offset="1"
                                                    stopColor="#007ad9"
                                                  />
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#yURKxjsGzuO2sJnz7bo6Na)"
                                                d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m25,15h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Z"
                                              />
                                              <path
                                                fill="url(#yURKxjsGzuO2sJnz7bo6Nb)"
                                                d="m27,42l-21-4V10l21-4v36Z"
                                              />
                                              <path
                                                fill="#fff"
                                                d="m21.17,31.01h-2.72l-1.8-8.99c-.1-.48-.16-1-.17-1.58h-.03c-.04.64-.11,1.16-.2,1.58l-1.85,8.99h-2.83l-2.86-14.01h2.68l1.54,9.33c.06.4.11.94.14,1.61h.04c.02-.5.1-1.05.22-1.65l1.97-9.29h2.62l1.78,9.4c.06.35.12.85.17,1.51h.03c.02-.51.07-1.03.16-1.56l1.5-9.35h2.47l-2.87,14.02Z"
                                              />
                                            </svg>
                                          </span>
                                        ) : isTextFile ? (
                                          <div className="my-auto">
                                            <img
                                              src={Notepad}
                                              alt=""
                                              className="h-[119px] my-auto flex justify-center items-center py-5"
                                            />
                                          </div>
                                        ) : isPowerPointFile ? (
                                          <span className="text-[10rem]">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 48 48"
                                              width="100%"
                                              height="100%"
                                            >
                                              <path
                                                fill="#FF8A65"
                                                d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
                                              />
                                              <path
                                                fill="#FBE9E7"
                                                d="M24 29H38V31H24zM24 33H38V35H24zM30 15c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6h-6V15z"
                                              />
                                              <path
                                                fill="#FBE9E7"
                                                d="M32,13v6h6C38,15.687,35.313,13,32,13z"
                                              />
                                              <path
                                                fill="#E64A19"
                                                d="M27 42L6 38 6 10 27 6z"
                                              />
                                              <path
                                                fill="#FFF"
                                                d="M16.828,17H12v14h3v-4.823h1.552c1.655,0,2.976-0.436,3.965-1.304c0.988-0.869,1.484-2.007,1.482-3.412C22,18.487,20.275,17,16.828,17z M16.294,23.785H15v-4.364h1.294c1.641,0,2.461,0.72,2.461,2.158C18.755,23.051,17.935,23.785,16.294,23.785z"
                                              />
                                            </svg>
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    );
                                  } else {
                                    return null;
                                  }
                                }
                              })}

                              {/* FOR THE 3RD IMAGE DISPLAY */}
                              {message?.urls?.length > 2 && (
                                <div
                                  className={`w-[30%] lg:w-[31.5%]  relative bg-gray-800 `}
                                >
                                  {message?.urls[2].category === "image" ? (
                                    <img
                                      className="h-full object-cover w-full"
                                      src={message?.urls[2].url}
                                      alt="See more"
                                    />
                                  ) : message?.urls[2].category === "video" ? (
                                    <video controls className="h-full w-full">
                                      <source
                                        src={message?.urls[2].url}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : message?.urls[2].category ===
                                    "documents" ? (
                                    <>
                                      {message.urls[2].url && (
                                        <>
                                          {message.urls[2].url.endsWith(
                                            ".xlsx"
                                          ) && (
                                            // Handle Excel file
                                            <span className="text-[10rem]">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="100%"
                                                height="100%"
                                              >
                                                <defs>
                                                  <linearGradient
                                                    id="G7C1BuhajJQaEWHVlNUzHa"
                                                    x1="6"
                                                    x2="27"
                                                    y1="24"
                                                    y2="24"
                                                    data-name="Безымянный градиент 10"
                                                    gradientUnits="userSpaceOnUse"
                                                  >
                                                    <stop
                                                      offset="0"
                                                      stopColor="#21ad64"
                                                    />
                                                    <stop
                                                      offset="1"
                                                      stopColor="#088242"
                                                    />
                                                  </linearGradient>
                                                </defs>
                                                <path
                                                  fill="#31c447"
                                                  d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m32,15h7v3h-7v-3Zm0,10h7v3h-7v-3Zm0,5h7v3h-7v-3Zm0-10h7v3h-7v-3Zm-7-5h5v3h-5v-3Zm0,10h5v3h-5v-3Zm0,5h5v3h-5v-3Zm0-10h5v3h-5v-3Z"
                                                />
                                                <path
                                                  fill="url(#G7C1BuhajJQaEWHVlNUzHa)"
                                                  d="m27,42l-21-4V10l21-4v36Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m19.13,31l-2.41-4.56c-.09-.17-.19-.48-.28-.94h-.04c-.05.22-.15.54-.32.98l-2.42,4.52h-3.76l4.46-7-4.08-7h3.84l2,4.2c.16.33.3.73.42,1.18h.04c.08-.27.22-.68.44-1.22l2.23-4.16h3.51l-4.2,6.94,4.32,7.06h-3.74Z"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                          {message.urls[2].url.endsWith(
                                            ".docx"
                                          ) && (
                                            // Handle Word file
                                            <span className="text-[10rem]">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="100%"
                                                height="100%"
                                              >
                                                <defs>
                                                  <linearGradient
                                                    id="yURKxjsGzuO2sJnz7bo6Na"
                                                    x1="25"
                                                    x2="42"
                                                    y1="24"
                                                    y2="24"
                                                    gradientUnits="userSpaceOnUse"
                                                  >
                                                    <stop
                                                      offset="0"
                                                      stopColor="#33bef0"
                                                    />
                                                    <stop
                                                      offset="1"
                                                      stopColor="#22a5e2"
                                                    />
                                                  </linearGradient>
                                                  <linearGradient
                                                    id="yURKxjsGzuO2sJnz7bo6Nb"
                                                    x1="29.53"
                                                    x2="4.68"
                                                    y1="24"
                                                    y2="24"
                                                    gradientUnits="userSpaceOnUse"
                                                  >
                                                    <stop
                                                      offset=".11"
                                                      stopColor="#0d62ab"
                                                    />
                                                    <stop
                                                      offset="1"
                                                      stopColor="#007ad9"
                                                    />
                                                  </linearGradient>
                                                </defs>
                                                <path
                                                  fill="url(#yURKxjsGzuO2sJnz7bo6Na)"
                                                  d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m25,15h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Z"
                                                />
                                                <path
                                                  fill="url(#yURKxjsGzuO2sJnz7bo6Nb)"
                                                  d="m27,42l-21-4V10l21-4v36Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m21.17,31.01h-2.72l-1.8-8.99c-.1-.48-.16-1-.17-1.58h-.03c-.04.64-.11,1.16-.2,1.58l-1.85,8.99h-2.83l-2.86-14.01h2.68l1.54,9.33c.06.4.11.94.14,1.61h.04c.02-.5.1-1.05.22-1.65l1.97-9.29h2.62l1.78,9.4c.06.35.12.85.17,1.51h.03c.02-.51.07-1.03.16-1.56l1.5-9.35h2.47l-2.87,14.02Z"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                          {message.urls[2].url.endsWith(
                                            ".pptx"
                                          ) && (
                                            // Handle PowerPoint file
                                            <span className="text-[10rem]">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="100%"
                                                height="100%"
                                              >
                                                <path
                                                  fill="#FF8A65"
                                                  d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
                                                />
                                                <path
                                                  fill="#FBE9E7"
                                                  d="M24 29H38V31H24zM24 33H38V35H24zM30 15c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6h-6V15z"
                                                />
                                                <path
                                                  fill="#FBE9E7"
                                                  d="M32,13v6h6C38,15.687,35.313,13,32,13z"
                                                />
                                                <path
                                                  fill="#E64A19"
                                                  d="M27 42L6 38 6 10 27 6z"
                                                />
                                                <path
                                                  fill="#FFF"
                                                  d="M16.828,17H12v14h3v-4.823h1.552c1.655,0,2.976-0.436,3.965-1.304c0.988-0.869,1.484-2.007,1.482-3.412C22,18.487,20.275,17,16.828,17z M16.294,23.785H15v-4.364h1.294c1.641,0,2.461,0.72,2.461,2.158C18.755,23.051,17.935,23.785,16.294,23.785z"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                          {message.urls[2].url.endsWith(
                                            ".txt"
                                          ) && (
                                            // Handle Text file
                                            <div className="flex justify-center items-center">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="100%"
                                                height="100%"
                                              >
                                                <defs>
                                                  <linearGradient
                                                    id="yURKxjsGzuO2sJnz7bo6Na"
                                                    x1="25"
                                                    x2="42"
                                                    y1="24"
                                                    y2="24"
                                                    gradientUnits="userSpaceOnUse"
                                                  >
                                                    <stop
                                                      offset="0"
                                                      stopColor="#33bef0"
                                                    />
                                                    <stop
                                                      offset="1"
                                                      stopColor="#22a5e2"
                                                    />
                                                  </linearGradient>
                                                  <linearGradient
                                                    id="yURKxjsGzuO2sJnz7bo6Nb"
                                                    x1="29.53"
                                                    x2="4.68"
                                                    y1="24"
                                                    y2="24"
                                                    gradientUnits="userSpaceOnUse"
                                                  >
                                                    <stop
                                                      offset=".11"
                                                      stopColor="#0d62ab"
                                                    />
                                                    <stop
                                                      offset="1"
                                                      stopColor="#007ad9"
                                                    />
                                                  </linearGradient>
                                                </defs>
                                                <path
                                                  fill="url(#yURKxjsGzuO2sJnz7bo6Na)"
                                                  d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m25,15h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Z"
                                                />
                                                <path
                                                  fill="url(#yURKxjsGzuO2sJnz7bo6Nb)"
                                                  d="m27,42l-21-4V10l21-4v36Z"
                                                />
                                                <path
                                                  fill="#fff"
                                                  d="m21.17,31.01h-2.72l-1.8-8.99c-.1-.48-.16-1-.17-1.58h-.03c-.04.64-.11,1.16-.2,1.58l-1.85,8.99h-2.83l-2.86-14.01h2.68l1.54,9.33c.06.4.11.94.14,1.61h.04c.02-.5.1-1.05.22-1.65l1.97-9.29h2.62l1.78,9.4c.06.35.12.85.17,1.51h.03c.02-.51.07-1.03.16-1.56l1.5-9.35h2.47l-2.87,14.02Z"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : null}

                                  <div className="absolute inset-0 z-20 backdrop-blur-sm h-full w-full flex justify-center items-center">
                                    <p className="text-3xl font-extrabold ">
                                      + {message?.urls?.length - 2}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        );
      }
    });
  };

  const itemsPerPage = 10;

  let arrImgVideos = [];

  imgVideos
    .filter((el) => !el.deleted?.includes(userId))
    .filter((imgVideo) => imgVideo.urls)
    .map((imgVideo) => imgVideo.urls.map((url) => arrImgVideos.push(url)));

  const goToNextPage = () => {
    if (currentPage < Math.ceil(arrImgVideos?.length / itemsPerPage)) {
      const current = currentPage + 1;
      setCurrentPage(current);
      // console.log(current)
      window.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderImgVideo = () => {
    // Calculate the range of items to display based on the current page
    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    // Slice the array to get the items for the current page
    const currentImgVideos = arrImgVideos
      .filter((el) => {
        if (mediaDrawer === "Media") {
          return el.category === "image" || el.category === "video";
        } else if (mediaDrawer === "Documents") {
          return el.category === "documents";
        }
      })
      .slice(indexOfFirstImage, indexOfLastImage);

    const mediaContainer = currentImgVideos?.map((url, index) => {
      if (mediaDrawer === "Media") {
        const key = `pagination_${index}`;
        if (url.category === "image") {
          return (
            <div
              key={key}
              onClick={() => setMorePictureIndex(index)}
              className="flex flex-wrap w-[47%] h-[100px] bg-gray-800 rounded-xl overflow-hidden"
            >
              <img
                className="h-full object-cover w-full "
                src={url.url}
                alt={url.url}
              />
            </div>
          );
        } else if (url.category === "video") {
          return (
            <div
              key={key}
              onClick={() => setMorePictureIndex(index)}
              className="flex flex-wrap w-[47%] h-[100px] bg-gray-800 rounded-xl overflow-hidden"
            >
              <video className="h-full w-full ">
                <source src={url.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else {
          return null;
        }
      } else if (mediaDrawer === "Documents") {
        if (url.category === "documents") {
          return (
            <a
              href={url.url}
              target="_blank"
              rel="noreferrer noopener"
              alt={url.url}
              key={index}
            >
              <div className="flex items-center mx-5 px-5 text-[1rem] gap-5 bg-gray-800 text-white">
                <span className="text-[2rem]">
                  <i className="fa-regular fa-file"></i>
                </span>
                <div className="flex flex-wrap">
                  <p
                    style={{
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {url.url.split("/")[url.url.split("/").length - 1]}
                  </p>
                </div>
              </div>
            </a>
          );
        }
      } else {
        return null;
      }
    });
    return (
      <div className="flex flex-col justify-between h-full pb-5 pt-10">
        {mediaDrawer === "Media" &&
          (arrImgVideos.filter((url) => url.category !== "documents").length >
          0 ? (
            <div
              onClick={() => {
                let arr = [];
                currentImgVideos
                  .filter((url) => url.category !== "documents")
                  .map((url) => arr.push(url));
                setMorePicture(arr);
              }}
              className="flex flex-wrap gap-2 w-full cursor-pointer px-5"
            >
              {mediaContainer}
            </div>
          ) : (
            <p className="text-center">No images or videos available.</p>
          ))}
        {/* FOR DOCUMENTS ONLY */}
        {mediaDrawer === "Documents" &&
          (arrImgVideos.filter((url) => url.category === "documents").length >
          0 ? (
            <div className="flex flex-col gap-2">{mediaContainer}</div>
          ) : (
            <p className="text-center">No Documents available.</p>
          ))}

        {/* PAGINATION */}
        <div className="w-full">
          {arrImgVideos.filter((el) => {
            if (mediaDrawer === "Media") {
              return el.category === "image" || el.category === "video";
            } else if (mediaDrawer === "Documents") {
              return el.category === "documents";
            }
          }).length > itemsPerPage && (
            <div className="flex justify-center items-center w-full">
              {currentPage !== 1 ? (
                <button
                  className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2  rounded-lg flex justify-center items-center hover:bg-transparent border border-primary w-[6rem]"
                  onClick={goToPrevPage}
                >
                  Previous
                </button>
              ) : (
                <button className="text-[.8rem] py-2 bg-gray-500  rounded-lg flex justify-center items-center   hover:cursor-not-allowed sm:text-[1rem] w-[6rem]">
                  Previous
                </button>
              )}

              <div className="flex px-3">
                <p className="font-bold">Page {currentPage}</p>
              </div>

              {currentPage <
              Math.ceil(
                arrImgVideos.filter((el) => {
                  if (mediaDrawer === "Media") {
                    return el.category === "image" || el.category === "video";
                  } else if (mediaDrawer === "Documents") {
                    return el.category === "documents";
                  }
                }).length / itemsPerPage
              ) ? (
                <button
                  className="text-[.8rem] sm:text-[1rem] bg-primary py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary w-[6rem]"
                  onClick={goToNextPage}
                >
                  Next
                </button>
              ) : (
                <button className="text-[.8rem] py-2 bg-gray-500 rounded-lg flex justify-center items-center   hover:cursor-not-allowed sm:text-[1rem] w-[6rem]">
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [messages, backVar]);

  // Refactor file handlin g
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    // console.log(selectedFiles);
    if (selectedFiles.length > 0) {
      // console.log(newFilesArray);
      const newArrayFiles = newFilesArray;      
      for (const file of selectedFiles) {
        if (!newArrayFiles.find((el)=>el.name===file.name)) {
          newArrayFiles.push(file);          
        }
      }
      
      
      
      setImages(newArrayFiles.filter((file) => file.type.startsWith("image/")));
      setVideos(newArrayFiles.filter((file) => file.type.startsWith("video/")));
      setDocuments(newArrayFiles.filter((file) => file.type.startsWith("text/"))
      );

      // if (newFilesArray.some((file) => file.type.startsWith("video/"))) {
      //   setVideoUrl(
      //     URL.createObjectURL(
      //       newFilesArray.find((file) => file.type.startsWith("video/"))
      //     )
      //   );
      // } else {
      //   setVideoUrl(null);
      // }

      setNewFilesArray(newArrayFiles);
    } else {
      setImages([]);
      setVideoUrl(null);
      setDocuments([])
      setVideos([]);
      setNewFilesArray([]);
    }
  };

  return (
    <section className="font-poppins ">
      {/* USER INFO WITH CONTROLS */}
      <div className="border-b py-3 px-3 sm:px-10 grid grid-cols-12 gap-3 h-[10vh]">
        <div className=" flex gap-3 col-span-11 sm:col-span-9">
          <span
            onClick={back}
            className="flex justify-center items-center text-[20px] cursor-pointer lg:hidden"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </span>

          {/* <div className="flex items-center">
            <img
              src={profile?.picture}
              alt=""
              className="h-[45px] w-[45px] object-cover rounded-full"
            />
          </div> */}
          <Flex align="center">
            <Wrap>
              <WrapItem>
                <Avatar  src={`${groupChat ? "Group Chat" : `${profile?.picture ? `${profile?.picture}` : ""} `}`} name={groupChat? "Group Chat" : profile?.fullname}/>
              </WrapItem>
            </Wrap>
          </Flex>

          <div className="flex flex-col">
            <h2 className="text-[18px] font-semibold">{profile?.fullname}</h2>
            <p className="text-[14px]">
              {groupChat ? "Group Chat With " : ""}
              {profile
                ? `${
                    profile?.barangay !== ""
                      ? `${profile?.barangay} Brgy. Captain`
                      : profile?.municipality !== ""
                      ? `${profile?.municipality} Mayor`
                      : profile?.province !== ""
                      ? `${profile?.province} Governor`
                      : "Bicol 1 Community Admin"
                  }`
                : ""}
              {groupChat ? " and others" : ""}
            </p>
          </div>
        </div>

        <div className="flex justify-end col-span-1 sm:col-span-3 text-xl gap-10 items-center text-gray-600">
          {!groupChat && (
            <>
              <span className="cursor-pointer hidden sm:block">
                <i
                  className="fa-solid fa-phone"
                  onClick={() => 
                    {const callType = "Audio";
                    call(receivers, userId, callType);
                    
                  } }
                ></i>
              </span>
              <span className="cursor-pointer hidden sm:block">
                <i
                  className="fa-solid fa-video"
                  onClick={() => {
                    const callType = "Video";
                    call(receivers, userId, callType);
                  }}
                ></i>
              </span>
              
              <span className="cursor-pointer block sm:hidden" onClick={openModal}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </span>
            </>
          )}
          <InfoIcon cursor="pointer" onClick={() => setSideDrawerOther(true)}/>
        </div>

        {sideDrawerOther && (
          <SideDrawerOther setSideDrawerOther={setSideDrawerOther} mediaDrawer={mediaDrawer} handleMediaDrawer={handleMediaDrawer} setOpenConversationModal={setOpenConversationModal}/>
        )}

        {openConversationModal && (
          <SearchConversation setOpenConversationModal={setOpenConversationModal} display={displayImgVideo} imgVideos={imgVideos} allUsers={allUsers} userId={userId}  setMorePicture={setMorePicture}/>
        )}


        {openDrawer && (
          <MediaDrawer
            setOpenDrawer={setOpenDrawer}
            setCurrentPage={setCurrentPage}
            handleMediaDrawer={handleMediaDrawer}
            mediaDrawer={mediaDrawer}
            display={displayImgVideo}
          />
        )}

        {morePicture && (
          <Modal
            message={morePicture}
            setMorePicture={setMorePicture}
            morePictureIndex={morePictureIndex}
          />
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex pt-[7rem] pr-[2rem] justify-end">
            <div className="bg-white max-w-md rounded-md h-[200px] w-[150px]">
              <span className="flex justify-end">
                <i
                  className="fa-solid fa-x text-red-800 p-2 m-2  rounded-lg hover:opacity-80 hover:cursor-pointer"
                  onClick={closeModal}
                ></i>
              </span>

              <div className=" flex justify-around text-gray-600 pb-2 sm:hidden">
                <p>Audio</p>
                <span className="cursor-pointer block ">
                  <i
                    className="fa-solid fa-phone"
                    onClick={() => call(receivers, userId)}
                  ></i>
                </span>
              </div>

              <div className=" flex justify-around text-gray-600 sm:hidden">
                <p>Video</p>
                <span className="cursor-pointer block">
                  <i
                    className="fa-solid fa-video"
                    onClick={() => call(receivers, userId)}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        )}

        {modalRemove && (
          <ModalRemove
            setModalRemove={setModalRemove}
            onRemove={(selectedOption) => {
              // Handle removal logic here if needed
            }}
            unsendMessage={UnsendMessage}
            messageId={modalRemove}
            isSenderRemove={isSenderRemove}
          />
        )}
      </div>

      {/* CHATS  */}
      <div
        ref={containerRef}
        className=" overflow-y-auto px-3 lg:px-10 bg-gray-200 h-[70vh]"
        onScroll={handleScroll}
      >
        <div className="flex flex-col justify-end">
          {textLoading && (
            <div className="flex justify-center pt-50">
              <Oval
                height={50}
                width={50}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          )}
          {chatId ? (
            <>
              {noMoreMessages && (
                <div className="text-center">Start of Conversation</div>
              )}
              {display}
            </>
          ) : (
            <div className="text-center">Please click a chat</div>
          )}

          {/* {displayImgVideo} */}
        </div>
      </div>

      {/* CHAT INPUTS */}
      <div className=" border-t w-full px-3 h-[20vh]">
        <div className="absolute bottom-40 flex overflow-x-auto w-[420px] ">
          {newFilesArray.length > 0 && (
            <div className="flex items-center justify-between gap-3">
              {newFilesArray.map((file, index) => (
                <div key={index} className="flex items-center">
                  {file.type.startsWith("image/") && (
                    <img
                      className="mx-auto max-h-[70px] max-w-[70px]"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  )}
                  {file.type.startsWith("video/") && (
                    <video
                      key={index}
                      controls
                      className="h-[70px] w-[70px] object-contain"
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {!file.type.startsWith("image/") &&
                    !file.type.startsWith("video/") && (
                      <div className="flex flex-col items-center">
                        {file.type.startsWith("text/") ? (
                          <i className="fa-regular fa-file-alt text-gray-500"></i>
                        ) : (
                          <i className="fa-regular fa-file text-gray-500"></i>
                        )}
                        <p className="ml-2">{file.name}</p>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center h-full gap-5 ">
          <label>
            <input
              type="file"
              accept="*/*"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <span className="cursor-pointer">
              <i className="fa-solid fa-paperclip"></i>
            </span>
          </label>

          <span className="cursor-pointer hover:text-yellow-600">
            <i
              className="fa-regular fa-face-smile"
              onClick={toggleEmojiPicker}
            ></i>
          </span>
          <div className="fixed bottom-[7rem] ">
            {showEmojiPicker && <Picker data={data} onEmojiSelect={addEmoji} />}
          </div>

          <form
            action="submit"
            // onSubmit={(e) => {
            //   e.preventDefault();

            // }}
            className="w-full flex gap-3"
          >
            <textarea
              placeholder={
                showEmojiPicker ? "Choose an emoji..." : "Type your message..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                whiteSpace: "pre-wrap",
                resize: "none",
                lineHeight: "1.2",
              }}
              className="w-full p-3"
              ref={scroll}
            />

            {/* <button className="bg-primary px-5 py-2 cursor-pointer">
              <span className="text-xl">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </button> */}
            <Button
              colorScheme="blue"
              style={{ marginTop: 15 }}
              onClick={SendMessageDB}
              isLoading={loading}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
