import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { retrieveAllChatDB } from "../../../../Api/Chats";
import { ChatListDetails } from "./ChatListDetails";
import { CreateChatModal } from "../CrudChatLists/CreateChatModal";
import { DeleteChatModal } from "../CrudChatLists/DeleteChatModal";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
export const ChatList = ({ allUsers, setAllUsers }) => {
  const [allChats, setAllChats] = useState([]);
  const [createChat, setCreateChat] = useState(false);
  const [deleteChat, setDeleteChat] = useState(null);
  useEffect(() => {
    fetchAllChats();
  }, []);
  const fetchAllChats = async () => {
    try {
      const response = await retrieveAllChatDB();
      if (response) {
        setAllChats(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {createChat && (
        <CreateChatModal
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setCreateChat={setCreateChat}
          allChats={allChats}
          setAllChats={setAllChats}

        />
      )}
      {deleteChat && (
        <DeleteChatModal
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          deleteChat={deleteChat}
          setDeleteChat={setDeleteChat}
          allChats={allChats}
          setAllChats={setAllChats}
        />
      )}
      <Box w="100%"  className="lg:min-w-[800px] font-poppins">
        {/* List of Employees */}
        <Grid
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
          py={2}
          px={2}
          mb={2}
          rounded="lg"
          bg="green.800"
          flexWrap="nowrap"
        >
          <GridItem colSpan={4}>
          <Flex justify="center">
            <Text as="p" fontWeight="semibold">Chat ID</Text>

          </Flex>
          </GridItem>

          <GridItem colSpan={6}>
          <Flex justify="center">
            <Text as="p" fontWeight="semibold">Members</Text>
          </Flex>
          </GridItem>
          
          <GridItem colSpan={2}>
            <Flex justify="center">
              <Text as="p" fontWeight="semibold">Actions</Text>
            </Flex>
          
         </GridItem>
        </Grid>

        <Flex 
          id="scrollbar-container"
          flexDir="column"
          gap={1}
          overflowX="auto"
          maxH="585px"
          minH="530px"
          w="full"
        >
          {allChats?.map((chat, index) => (
            <ChatListDetails
              chat={chat}
              key={index}
              allUsers={allUsers}
              setCreateChat={setCreateChat}
              allChats={allChats}
              setAllChats={setAllChats}
              // setEmployeeProfile={setEmployeeProfile}
              // setUpdateEmployee={setUpdateEmployee}
              setDeleteChat={setDeleteChat}
            />
          ))}
        </Flex>

        {/* Create Employee Button */}
        <Flex 
          justify="end"
          align="end"
          mt={4}
        
        
        // className="flex justify-end items-end mt-4"
        
        
        >   
          <Button
            colorScheme="lime"
            size="md"
            fontWeight="semibold"
            px={6}
            py={3}
            borderRadius="md"
            borderWidth={2}
            borderColor="blue.600"
            transition="all 0.3s"
            color="white"
            onClick={()=> setCreateChat(true)}
            _hover={{    
              color: "blue.500",
              borderColor: 'blue.300',
              boxShadow: 'xl',
            }}>
            <Flex align="center" gap={2}>
              <Text>Create Chat</Text>
              <FaPlus />
            </Flex>
          </Button>
        </Flex>
      </Box>
    </>
  );
};
