import React, { useEffect,  } from "react";
import { createChatDB } from "../../../../Api/Chats";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
export const ChatForm = ({
  setCreateChat,
  setAllUsers,
  allUsers,
  allChats,
  setAllChats,
  reset,
}) => {
  //   FORM STATES

  // const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  // const [type, setType] = useState("create");
  const toast = useToast();
  const userId = localStorage.getItem("user");
  useEffect(() => {}, []);

  //   CREATE/UPDATE USERACCOUNTS DATABASE

  const createChat = async () => {
    const success = (response) => {
      const newAllChats = [...allChats, response.data]
      setAllChats(newAllChats)
      toast({
        title: "Chat Created Successfully",
        status: "success",
        duration: "2000",
        isClosable: true,
        position: "top",
      });
      reset();
    };

    let usersInNewChat = [];
    allUsers.map((user) => {
      if (user.added) {
        usersInNewChat.push(user._id);
      }
    });

    if (usersInNewChat.length < 2) {
      // DIDNT THE MINIMUM REQUIRED MEMBERS
      toast({
        title: "Group chat should consist of atleast 2 members",
        status: "warning",
        duration: "2000",
        isClosable: true,
        position: "top",
      });
    } else {
      const body = { members: [...usersInNewChat] };
      // CONDITIONAL FOR A CHAT WITH 2 MEMBERS ONLY
      if (usersInNewChat.length < 3) {
        const existingConversations = allChats.filter(
          (el) => el.members.length < 3
        );
        const userExisted = existingConversations.map((conversation) => {
          let exists;
          conversation.members.map((member) => {
            if (member !== userId) {
              exists = member;
            }
          });
          return exists;
        });

        if (
          !userExisted.includes(usersInNewChat.filter((el) => el !== userId)[0])
        ) {
          try {
            const response = await createChatDB({ body: body });
            if (response) {
              ;
              success(response);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          // DUPLICATE CHATS IN 2 MEMBERS IS ALREADY EXISTING
          toast({
            title: "Can not create existing chat",
            status: "warning",
            duration: "2000",
            isClosable: true,
            position: "top",
          });
        }
      } else {
        // GROUPCHAT EVENT -- GROUPCHAT IS ALLOWED TO BE CREATED WITH SAME MEMBERS OF EXISTING CHATS
        try {
          const response = await createChatDB({ body: body });
          if (response) {
            success(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      
      <Flex as="section" flexDir="column" justify="center" align="center" bg="gray.200" boxShadow="md" borderColor="gray.300" border={1} w="100%" minH="550px" h="90%" rounded={6}>
     
        <Flex flexDir="column" h="90%" w="100%">
          <Box
            id="create-chat"
            borderBottom={1}
            borderColor="gray.300"
            boxShadow="md"
            h="10vh"
            overflowX="auto"
          >
            {/* USERS ADDED */}
            <Flex align="center" gap={4} px={3} h="100%">
              {allUsers
                ?.filter((el) => {
                  return el.added;
                })
                .map((user, index) => {
                  return (
                    <Flex
                      key={index}
                      justify='start'
                      align="center"
                      shrink={0}
                      gap={2}
                      bg="gray.300"
                      rounded={6}
                      px={3}
                      py={1}
                    > 
                      <Text as="p">{user.fullname}</Text>
                      
                      <Flex
                        fontSize={20}
                        color="red.500"
                        _hover={{
                          color: "red.400",
                          cursor: "pointer"
                        }}
                        // className="fa-icon fa-solid fa-close text-xl hover:cursor-pointer text-gray-500 hover:text-red-900"
                        onClick={() => {
                          ///DELETING USER ON CHAT ARRAY
                          const updatedUser = {
                            ...user,
                            added: false,
                          };
                          const updatedUsers = [
                            ...allUsers.filter((el) => {
                              return el._id !== user._id;
                            }),
                            updatedUser,
                          ];
                          setAllUsers(updatedUsers);
                        }}
                      > 
                        <FaTimes />
                      </Flex>
                    </Flex>
                  );
                })}
            </Flex>
          </Box>

          {/* LIST OF USERS */}
          <Flex
            id="create-chat"
            justify="center"
            w="100%"
            overflowY="auto"
            h="50vh"
            pt={5}
            
          >
            <Flex flexDir="column" justify="start" gap={3} w="35%">
              {allUsers
                ?.filter((el) => {
                  return !el.added;
                })
                .map((user, index) => {
                  return (
                    <Flex
                      key={index}
                      justify="start"
                      align="center"
                      gap={2}
                      bg="gray.400"
                      rounded={7}
                      cursor="pointer"
                      _hover={{
                        bg: "gray.300"
                      }}
                      onClick={() => {

                        ///ADDING USER ON CHAT ARRAY
                        const updatedUser = { ...user, added: true };
                        const updatedUsers = [
                          ...allUsers.filter((el) => {
                            return el._id !== user._id;
                          }),
                          updatedUser,
                        ];
                        setAllUsers(updatedUsers);
                      }}
                      
                    >
                      <Wrap>
                        <WrapItem>
                          <Avatar size='md' src={user.picture} alt={user.fullname} />
                        </WrapItem>
                      </Wrap>
                      <Text as="p">{user.fullname}</Text>
                    </Flex>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>

        {/* BUTTON FOR CREATE CHAT */}
        <Flex h="10%" justify="end" w="100%"  px={3} pb={2}>
        
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
            color="black"
            onClick={createChat}
            _hover={{
            
              color: "blue.500",
              borderColor: 'blue.300',
              boxShadow: 'xl',
            }}
          >
          <Flex align="center" gap={2}>
          
            <Text as="p">Create Chat</Text>
            <FaPlus />
          </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
