import React from "react";
import { MdDelete } from "react-icons/md";
import "../ChatsLists/css/ChatListDetails.css";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
export const ChatListDetails = ({ chat, allUsers, setDeleteChat }) => {
  return (

    <Grid
      
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      px={2}
     
      mb={1}
      borderBottom="1px solid"
      rounded={6}
      transition="all 0.3s ease"
      flexWrap="nowrap"
      // justifyContent="center"  
      alignItems="center"
      _hover={{
        bg: 'gray.600',
       
      }}

    >
      <GridItem colSpan={4}>
      
        <Flex justify="center">
          <Text as="p">
          {chat?._id}
          </Text>
        </Flex>
      </GridItem>

      <GridItem colSpan={6}>
        <Flex
          id="scrollbar-container"
       
          overflowX="auto" 
          align="center"  
          h="100%"
          style={{
            flexWrap: "nowrap",
          }}     

        >
        {chat?.members?.map((member, index) => {
           const user = allUsers.find((el) => el._id === member);
           if (user) {
             return (
               <Flex key={index} gap={2}>
                 <Text  style={{ whiteSpace: "nowrap" }}>{user?.fullname}</Text>
                {index + 1 !== chat.members.length ? (
                
                <Text pr={2}>|</Text>
                ) : (
                  ""
                 )} 
               </Flex>
             );
           }
           return null;
         })}
        </Flex>
      </GridItem>

      <GridItem colSpan={2}>
      <Flex align="center" justify="center">
        <Button 
          onClick={() => {
            setDeleteChat(chat._id);
          }}
          fontSize="18px"
          color="red.500"
          _hover={{
            color: "red.400"
          }}
          bg="none"
       >
        <MdDelete />
       </Button>
      </Flex>
       
          
      </GridItem>
    </Grid>
  );
};
