import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Icon, Text, VStack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaUsers,
  FaHeadset,
  FaShoppingCart,
  FaUserFriends,
} from "react-icons/fa";
import {FiClipboard,  FiMessageSquare } from 'react-icons/fi';
import { Link } from "react-router-dom";

export const SideBar = ({ userDetails, setTab, tab, isOpen, onClose }) => {
  


  const menu = 
    <>
      <Link onClick={(e) => {setTab("profile"); onClose()}} >
        <Flex 
          align="center"
          gap={2}
          backgroundColor={tab === "profile" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}       
          _hover={{
            bg : "blue.500",
            borderRadius : "5"
          }}>
            <Icon  as={FaUser}/>
              <Text as="p">Profile</Text>
        </Flex>  
      </Link>

      <Link onClick={(e) => {setTab("analytics") ; ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "analytics" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FaChartBar}/>
          <Text as="p">Business Analytics</Text>
        </Flex>  
      </Link>

      <Link onClick={(e) => {setTab("inventory") ; ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "inventory" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FaBox} />
          <Text> Inventory Management</Text>
        </Flex>
      </Link>

      <Link onClick={(e) => {setTab("employee") ; ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "employee" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FaUsers} />
          <Text>Employee Management</Text>
        </Flex>
      </Link>

     <Link onClick={(e) => {setTab("support") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "support" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FaHeadset} />
          <Text>Customer Support</Text>
        </Flex>
      </Link>

      <Link onClick={(e) => {setTab("clients") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "clients" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>

          <Icon as={FaUserFriends} />
          <Text>Clients</Text>
        </Flex>       
      </Link>

      <Link onClick={(e) => {setTab("sales") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "sales" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FaShoppingCart} />
          <Text>Sales</Text>
        </Flex> 
      </Link>   

      <Link onClick={(e) => {setTab("chats") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "chats" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FiMessageSquare} />
          <Text>Chats</Text>
        </Flex> 
      </Link> 

      <Link onClick={(e) => {setTab("joborder") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "joborder" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FiClipboard} />
          <Text>Job Order</Text>
        </Flex> 
      </Link>    
      <Link onClick={(e) => {setTab("fundrequest") ; onClose()}}>
        <Flex 
          align="center" 
          gap={2}
          backgroundColor={tab === "fundrequest" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
          bg : "blue.500",
          borderRadius : "5"
          }}>
          <Icon as={FiClipboard} />
          <Text>Fund Request</Text>
        </Flex> 
      </Link>  
      
       
    </> 

  // SIDE BAR
  return (
    <div className="px-3 sticky top-0 ">
        
      {/* SIDEBAR */}
      <VStack  mt={10} display={{ base: 'none' , md: 'none', lg: "block"  }} >
        {menu}
      </VStack>
      
      {/* DRAWER SIDEBAR */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay >
          <DrawerContent>
            <DrawerCloseButton color="white"/> 
           
            <DrawerBody p={0} className="bg-gray-800 text-white">
            <VStack  mt={14} align="left" px={3} >
              {menu}
            </VStack>
              
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};
