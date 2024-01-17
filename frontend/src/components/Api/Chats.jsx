import axios from "axios";
import React from "react";
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;

// CREATE CHAT
export const createChatDB = async ({ body }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.post(
    `${globalUrl}/chat/create`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
// RETRIEVE ALL CHATS
export const retrieveAllChatDB = async () => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/chat/retrieveAllChats`, {
    headers: header,
  });
  return response.data;
};
// DELETE CHATS
export const deleteChatDB = async ({ _id }) => {
  
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.delete(`${globalUrl}/chat/delete/${_id}`, {
    headers: header,
  });
  return response;
};
