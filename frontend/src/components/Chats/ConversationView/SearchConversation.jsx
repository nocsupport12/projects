import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import Notepad from "../../../assets/Notepad.png";

export const SearchConversation = ({ setOpenConversationModal, imgVideos, allUsers, userId , setMorePicture}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(null);

  
  
 

 

  const handleSearch = () => {
    if (searchQuery.length > 1) {
      const filtered = imgVideos.filter((el) =>
        el.text.toLowerCase().includes(searchQuery.toLowerCase())        
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(null);
    }
  };
  
  const handleButtonClick = () => {
    handleSearch();
    
  };

 
  return (
    <div className="fixed inset-0 bg-gray-400 rounded-md z-50 flex flex-col  w-full">
      <div className="flex justify-end text-3xl px-4 h-[5vh]">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setOpenConversationModal(false)}
        >
          &times;
        </button>
      </div>
      <div className="h-[10vh] w-full flex justify-center items-center">
        <div className="w-[50%]">
          <Flex gap={2}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Button onClick={handleButtonClick}>Search</Button>
          </Flex>
        </div>
      </div>

            
      <div className="h-[85vh] overflow-y-auto ">
        <div className="flex flex-col justify-center items-center max-w-[400px] mx-auto">
          
            {filteredConversations && filteredConversations.length > 0 ? (
            filteredConversations.map((message) => {
              const senderInfo = allUsers.find((user) => user._id === message.senderId);
              if (!message?.deleted?.includes(userId)) {
                return (
                  <div
                    key={message._id}
                    className="flex justify-center"
                  >
                    <div className="flex items-center gap-5">
                      <>
                        <div
                          key={
                            message._id
                              ? message._id
                              : Math.floor(Math.random() * 10000000000)
                          }
                          className={`my-3 rounded-lg  ${
                            message.senderId === userId
                              ? "flex flex-col min-w-[400px]  gap-2 bg-primary text-white px-5  py-2 "
                              : " flex items-center min-w-[400px] gap-2 bg-white text-black px-5  py-2 "
                          }`}
                          style={{ marginBottom: "8px" }}
                        >
                          {/* profile or image */}
                          <div>
                            {message.senderId !== userId ? (
                              senderInfo ? (
                                
                                  <Flex  className="flex shrink-0 w-[30px] h-[30px]">
                                    <Wrap>
                                      <WrapItem>
                                        <Avatar src={senderInfo?.picture ? `${senderInfo?.picture}` : "" } name={senderInfo?.fullname}/>
                                      </WrapItem>
                                    </Wrap>
                                    <Text>{senderInfo?.fullname}</Text>

                                  </Flex>
                                
                              ) : (
                                "Loading..."
                              )
                            ) : (
                              ""
                            )}

                            {message.senderId === userId ? (
                              senderInfo ? (
                                <>
                                <Flex mb={1} gap={2} align="center">
                                    <Wrap>
                                      <WrapItem>
                                        <Avatar src={senderInfo?.picture ? `${senderInfo?.picture}` : "" } name={senderInfo?.fullname}/>
                                      </WrapItem>
                                    </Wrap>
                                    <Text>{senderInfo?.fullname}</Text>

                                  </Flex>
                                </>
                              ) : (
                                "Loading..."
                              )
                            ) : (
                              ""
                            )}
                          </div>

                          {/* MESSAGES */}
                          <div
                            className={`${
                              message.senderId !== userId &&
                              message?.urls?.length !== 0
                                ? "w-[90%]"
                                : "w-full"
                            } ${
                              message.senderId === userId ? "" : ""
                            }`}
                          >
                            <div>
                              {/* IF THERES A TEXT MESSAGE */}
                              {message.text && (
                                <>
                                  {message.senderId !== userId ? (
                                    senderInfo ? (
                                      <div>
                                        <p>{senderInfo.fullname}</p>
                                      </div>
                                    ) : (
                                      "Loading..."
                                    )
                                  ) : (
                                    ""
                                  )}
                                  {/* {message.senderId === userId ? (
                                    senderInfo ? (
                                      <div>
                                        <p>{senderInfo.fullname}</p>
                                      </div>
                                    ) : (
                                      "Loading..."
                                    )
                                  ) : (
                                    ""
                                  )} */}
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
                          <div onClick={() => setMorePicture(message.urls)}>
                            {/* IMAGE VIDEO MAPPING */}
                            <div
                              className={`flex flex-wrap justify-start gap-2  w-full cursor-pointer`}
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
                                            ? "w-[55%]"
                                            : ""
                                        } ${
                                          message.urls.length === 2
                                            ? "w-[47%] lg:w-[40%] "
                                            : ""
                                        } ${
                                          message.urls.length > 2
                                            ? "w-[30%] lg:w-[31.8%]"
                                            : ""
                                        }`}
                                      >
                                        <img
                                          className="h-full object-cover "
                                          src={`${url.url}`}
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
                                          <source src={url.url} type="video/mp4" />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      </div>
                                    );
                                  } else if (url.category === "documents") {
                                    let fileExtension;
                                    const isExcelFile = url.url.endsWith(".xlsx");
                                    const isCsv = url.url.endsWith(".csv");
                                    const isWordFile = url.url.endsWith(".docx");
                                    const isPowerPointFile = url.url.endsWith(".pptx");
                                    const isTextFile = url.url.endsWith(".txt");
                                    const isMp3 = url.url.endsWith(".mp3");
                                    const endsWith = url.url.split(".").pop()
                                    console.log(endsWith)
                                    switch (endsWith) {
                                      case "xlsx":
                                        fileExtension = "documents/excel"
                                        break;
                                      case "csv":
                                        fileExtension = "documents/excel"
                                        break;
                                       
                                      case "docx":
                                        fileExtension = "documents/msword"
                                        break;
                                      case "pptx":
                                        fileExtension = "documents/ppt"
                                        break;
                                      case "txt":
                                        fileExtension = "documents/text-plain"
                                        break;
                                    
                                      default:
                                        fileExtension = "misc"
                                        break;
                                    }

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
                                          <span className="text-[10rem] ">
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
                                        ) : isMp3 ? (
                                        <span className="text-[10rem]">
                                        <svg width="100%" height="100%" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 6.5L2.85355 6.14645C2.71055 6.00345 2.4955 5.96067 2.30866 6.03806C2.12182 6.11545 2 6.29777 2 6.5H2.5ZM3.5 7.5L3.14645 7.85355L3.5 8.20711L3.85355 7.85355L3.5 7.5ZM4.5 6.5H5C5 6.29777 4.87818 6.11545 4.69134 6.03806C4.5045 5.96067 4.28945 6.00345 4.14645 6.14645L4.5 6.5ZM6.5 6.5V6H6V6.5H6.5ZM12.5 6.5L12.9 6.8C13.0136 6.64849 13.0319 6.44579 12.9472 6.27639C12.8625 6.107 12.6894 6 12.5 6V6.5ZM11 8.5L10.6 8.2C10.4864 8.35151 10.4681 8.55421 10.5528 8.72361C10.6375 8.893 10.8106 9 11 9V8.5ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1ZM3 11V6.5H2V11H3ZM2.14645 6.85355L3.14645 7.85355L3.85355 7.14645L2.85355 6.14645L2.14645 6.85355ZM3.85355 7.85355L4.85355 6.85355L4.14645 6.14645L3.14645 7.14645L3.85355 7.85355ZM4 6.5V11H5V6.5H4ZM6.5 7H7.5V6H6.5V7ZM7 11V8.5H6V11H7ZM7 8.5V6.5H6V8.5H7ZM7.5 8H6.5V9H7.5V8ZM8 7.5C8 7.77614 7.77614 8 7.5 8V9C8.32843 9 9 8.32843 9 7.5H8ZM7.5 7C7.77614 7 8 7.22386 8 7.5H9C9 6.67157 8.32843 6 7.5 6V7ZM10 7H12.5V6H10V7ZM12.1 6.2L10.6 8.2L11.4 8.8L12.9 6.8L12.1 6.2ZM11 9H11.5V8H11V9ZM11.5 10H10V11H11.5V10ZM12 9.5C12 9.77614 11.7761 10 11.5 10V11C12.3284 11 13 10.3284 13 9.5H12ZM11.5 9C11.7761 9 12 9.22386 12 9.5H13C13 8.67157 12.3284 8 11.5 8V9Z" fill="#000000"/>
                                        </svg>
                                      </span>) : (
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
                                      className="h-full object-cover "
                                      src={message?.urls[2].url}
                                      alt={message?.urls[2].url}
                                    />
                                  ) : message?.urls[2].category === "video" ? (
                                    <video controls className="h-full w-full">
                                      
                                      <source src={message?.urls[2].url} type="video/mp4" />
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
                                            ".csv"
                                          ) && (
                                            // Handle Excel file of csv
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
            })
          ) : (
            <p>No Results Found</p>
          )}
          

          
        </div>

      </div>
    </div>
  );
};   
