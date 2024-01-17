import React, { useEffect, useState } from "react";
import { ChatList } from "../Windows/Chats/ChatsLists/ChatList";
import { retrieveAllUserDB } from "../../Api/UserAccountsApi";
export const Chats = ({ userDetails }) => {
  const user = userDetails;
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const data = await retrieveAllUserDB();
      // NO FILTERING TO INCLUDE IN THE CHAT CHOICES
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="p-5">
      <ChatList allUsers={allUsers} setAllUsers={setAllUsers} />
    </div>
  );
};
