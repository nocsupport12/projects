// App.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const Testing = () => {
  const globalUrl = "http://localhost:8000";
  const chatId = "654ef80c706ec967452e629b";
  const urlWithLimit = `${globalUrl}/message/retrieveAllWithLimit/${chatId}?limit=10`;
  const url = `${globalUrl}/message/retrieveAll/${chatId}`;



  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.599l9L-gK2m8W2l2TJwtDPF_W8ZzHH8iO2GvGuEYQvM"; // Palitan mo ito ng tamang auth token

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    retrieveMessagesWithLimit(); // Ito ang mangyayari sa unang pag-render
    handleScroll()
  }, []);

  const retrieveMessagesWithLimit = async () => {
    try {
      const response = await axios.get(urlWithLimit, {
        headers: {
          'x-auth-token': `${token}`,
        },
      });
      setMessages(response.data);
      console.log(response.data)
      scrollChatToBottom();
    } catch (error) {
      console.error("Error retrieving messages with limit:", error);
    }
  };

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = async () => {
    console.log("Scroll Top:", chatContainerRef.current.scrollTop);
    console.log("Scroll Height:", chatContainerRef.current.scrollHeight);

    // Check if the user has scrolled to the top (with a buffer)
    if (chatContainerRef.current.scrollTop < 50 && !loadingMore && !reachedEnd) {
      setLoadingMore(true);
      try {
        const response = await axios.get(`${url}&page=${page}`, {
          headers: {
            'x-auth-token': `${token}`,
          },
        });

        if (response.data.length === 0) {
          // Wala nang mas lumang mensahe, itigil na ang pag-load
          console.log("Wala nang mas lumang mensahe.");
          setReachedEnd(true);  // I-set ang flag na nag-i-indicate na na-reach na ang end
          return;
        }

        // Assuming response.data contains an array of older messages
        // Reverse the order before concatenating to maintain the correct order
        const newMessages = response.data.reverse();
        console.log(newMessage)
        
        // Set the new messages at the beginning of the existing messages
        setMessages((prevMessages) => [...newMessages, ...prevMessages]);

        // Increment the page number for the next request
        setPage(page + 1);
      } catch (error) {
        console.error("Error fetching older messages:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return (
    <section className='py-40'>
      <div className="h-[70vh] overflow-y-scroll" onScroll={handleScroll}>
        <div
          ref={chatContainerRef}
          className="flex-grow p-4  border flex flex-col justify-end"
          style={{ minHeight: '0' }}
        >
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testing;
