import { Avatar, Box, Flex, FormLabel, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiDollar, BiChat, BiPackage, BiUser, BiCart } from "react-icons/bi";

export const ProfileDetails = ({ userDetails }) => {

  
  const getPrivilegeIcon = (privilege) => {
    switch (privilege) {
      case "analytics":
        return <BiDollar />;
      case "customerService":
        return <BiChat />;
      case "inventory":
        return <BiPackage />;
      case "employee":
        return <BiUser />;
      case "sales":
        return <BiCart />;
      case "clients":
        return <BiCart />;
      default:
        return null;
    }
  }
 
 

  // OWN PROFILE DETAILS
  return (
    <>
      <Flex id="scrollbar-container"  flexDir="column" className="font-poppins"   h="80vh" >
        <Flex flexDir="column" gap={2} pb={10} ml={5}>
          <Wrap>
            <WrapItem>
              <Avatar size='xl' src={`${userDetails?.picture ? `${userDetails?.picture}` : "" }`} name={userDetails?.fullname} />
            </WrapItem>
          </Wrap>
          <Text as="p" fontSize="xl">{userDetails?.fullname}</Text>
        </Flex>

        <Flex gap={{base: "5", lg: "0"}} flexDir={{base: "column", lg:"row"}}  pt={4} pb={{base: "0", lg: "4"}} borderTop="2px solid" borderBottom={{base: "none",lg:"2px solid"}} borderColor="gray.800" boxShadow={10}>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px" >
            <Box align="center" fontWeight="semibold" ml={5}>Full Name:</Box>
            {userDetails?.fullname}
          </Flex>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>E-mail:</Box>
            {userDetails?.email}
          </Flex>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>Contact Number:</Box>
            {userDetails?.contact}
          </Flex>
        </Flex>
        
        <Flex  gap={{base: "5", lg: "0"}} flexDir={{base: "column", lg:"row"}} pt={4} pb={{base: "0", lg: "4"}} borderBottom={{base: "none",lg:"2px solid"}} borderColor="gray.800" boxShadow={10}>
          
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={5}>Gender:</Box>
            {userDetails?.gender}
          </Flex>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>Birthday:</Box>
            {userDetails?.birthday}
          </Flex>

          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>Age:</Box>
            {userDetails?.age}
          </Flex>
        </Flex>

        

        <Flex gap={{base: "5", lg: "0"}} flexDir={{base: "column", lg:"row"}} pt={4} pb={{base: "0", lg: "4"}} borderBottom={{base: "none",lg:"2px solid"}} borderColor="gray.800" boxShadow={10}>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px" >
            <Box align="center" fontWeight="semibold" ml={5}>Employed Date:</Box>
            {userDetails?.employeddate}
          </Flex>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px">
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>Address:</Box>
            {userDetails?.address}
          </Flex>
          <Flex w={{base: "100%" ,lg:"50%"}} align="center" gap={2} fontSize="17px" >
            <Box align="center" fontWeight="semibold" ml={{base: "5", lg: "0"}}>Office:</Box>
            {userDetails?.office}
          </Flex>
        </Flex>
          
        <Flex  borderBottom={{base: "none",lg:"2px solid"}} pt={4} pb={{base: "0", lg: "4"}} borderColor="gray.800" boxShadow={10}>
          
          <Flex w="50%" align="center" gap={2} fontSize="17px" >
            <Box align="center" fontWeight="semibold" ml={5}>Department:</Box>
            {userDetails?.department}
          </Flex>
          <Flex w="100%" gap={2}  py={2} fontSize="17px">
          <Box align="center" fontWeight="semibold" >Position:</Box>
          {userDetails?.position}
        </Flex>
        </Flex>
        
        
        

        <Flex align="center"  borderBottom={{base: "none",lg:"2px solid"}} pt={4} pb={{base: "0", lg: "4"}} borderColor="gray.800" boxShadow={10}>
          <Text fontSize="17px" ml={5} pr={5}>
            PRIVILEGE:
          </Text>
          <Flex>
          {userDetails?.privilegeaccess.length > 0 ? 
          (
            userDetails?.privilegeaccess?.map((access, index) => (
              <Flex key={index} align="center" gap={1}>
                <Box border="1px solid" rounded="full" py={1} px={1}>
                  {getPrivilegeIcon(access)}

                </Box>
                <Text pr={5}>
                  {access}
                </Text>
              </Flex>
            ))
          ) : 
          (
          <Text>
            No Privilege to access
          </Text>)
          }
            
          </Flex>
        </Flex>
        <Flex w="100%"  pt={4} pb={{base: "", lg: "2"}} gap={2} align="center" >
          <Box ml={5} fontWeight="semibold">Remarks:</Box>
          {userDetails?.remarks}
        </Flex>
      </Flex>
    </>
  );
};
