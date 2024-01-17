import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { deleteChatDB } from "../../../../Api/Chats";
import { Button, Flex, Text } from "@chakra-ui/react";
export const DeleteChatModal = ({
  setDeleteChat,
  deleteChat,
  allChats,
  setAllChats,
  setAllUsers,
  allUsers,
  userDetails,
}) => {
  //   CREATE CHATS DATABASE
  const deleteChatData = async () => {
    try {
      const response = await deleteChatDB({ _id: deleteChat });
      if (response) {
        // REALTIME
        // Assuming allChats is your state array
        let newAllChats = [...allChats.filter((el) => el._id !== deleteChat)]; // Copying the state array
        setAllChats([...newAllChats]);
        setDeleteChat(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validate = () => {
    deleteChatData();
  };

  return (
    <div
      className="inset-0 fixed backdrop-blur-xl flex justify-center items-center overflow-auto "
      style={{ zIndex: 10000000 }}
    >
      <div className="bg-gray-800 text-white shadow-2xl min-w-[300px] min-h-[200px]  h-[30vh] w-[30vw] rounded-2xl overflow-auto flex flex-col items-center justify-center  py-1">
        {/* CLOSE BUTTON */}
        <Flex justify="end" h="10%" w="100%">
          <Button
            colorScheme="lime"
            color="red.500"
            fontSize="24px"
            fontWeight="semibold"
            borderWidth={0}
            borderRadius="md"
            transition="all 0.3s"
            _hover={{
              boxShadow: 'xl',
              color: "red.400",

              }}
           onClick={() => setDeleteChat(null)}>
            <IoMdClose/>
          </Button>
        </Flex>
        
        <Flex justify="center" w="100%" h="90%" >
          <div className="p-5 flex flex-col justify-center items-center">
            <h2 className="text-center text-xl mb-8 font-semibold">
              Are you sure you want to delete?
            </h2>
            <div className="col-span-12 flex w-full justify-center gap-4 items-end">
              <Button
                colorScheme="lime"
                size="md"
                fontWeight="semibold"
                px={6}
                py={3}
                borderRadius="md"
                borderWidth={2}
                borderColor="green.600"
                transition="all 0.3s"
                
                onClick={()=> setDeleteChat(null)}
                _hover={{    
                  borderColor: 'green.500',
                  boxShadow: 'xl',
                  color: "green.500"
                }}>
                <Flex align="center" gap={2}>
                  <Text>Cancel</Text>
                  <IoMdClose />
                </Flex>
              </Button>
              <Button
                colorScheme="lime"
                size="md"
                fontWeight="semibold"
                px={6}
                py={3}
                borderRadius="md"
                borderWidth={2}
                borderColor="red.600"
                transition="all 0.3s"
                
                onClick={()=> validate()}
                _hover={{    
                  borderColor: 'red.500',
                  boxShadow: 'xl',
                  color: "red.500"
                }}>
                <Flex align="center" gap={2}>
                  <Text>Delete</Text>
                  <MdDelete />
                </Flex>
              </Button>

            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};
