import { IoMdClose } from "react-icons/io";
import { ChatForm } from "../CrudChatLists/ChatForm";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
export const CreateChatModal = ({
  setCreateChat,
  setAllUsers,
  allUsers,
  allChats,
  setAllChats
}) => {
  const reset = () => {
    let resetAllUsers = [];
    allUsers.map((user) => {
      if (user.added) {
        user.added = false;
        resetAllUsers.push(user);
      } else {
        resetAllUsers.push(user);
      }
    });
    setAllUsers(resetAllUsers);
    setCreateChat(false);
  };
  return (
    <div
      className="inset-0 fixed backdrop-blur-xl flex justify-center items-center overflow-auto text-gray-800 font-poppins"
      style={{ zIndex: 10000000 }}
    >
      <div className="bg-gray-200 shadow-2xl min-w-[800px] min-h-[700px] w-[85vw] h-[70vh] rounded-2xl overflow-auto flex flex-col items-center  py-1">
        {/* CLOSE BUTTON */}
        <Flex justify="end" pr={3} h="5%" w="full">
          <Button
            onClick={reset}
            fontSize="24px"
            color="red.500"
            bg="gray.200"
            _hover={{
              cursor: "pointer",
              color: "red.400"
            }}
          >
            <IoMdClose />
          </Button>
        </Flex>
        <Box w="100%" h="90%">
          <Box p={5}>
            <Heading 
              as="h2"  
              textAlign="center"
              fontSize="24px"
              mb={8}
              fontWeight="semibold"
            >
              <Text as="p">Chat Form</Text>
            </Heading>
            {/* FORM FOR CREATE EMPLOYEE */}
            <ChatForm
              setCreateChat={setCreateChat}
              setAllUsers={setAllUsers}
              allUsers={allUsers}
              allChats={allChats}
              setAllChats={setAllChats}
              reset={reset}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};
