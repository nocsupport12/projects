import React from "react";
import { IoMdClose } from "react-icons/io";
import { ProfileDetails } from "../../Profile/ProfileDetails";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import "../../../../../index.css"
export const EmployeeProfileModal = ({
  setEmployeeProfile,
  employeeProfile,
}) => {
  const userDetails = employeeProfile;
  return (
    <Box
      id="scrollbar-container"
      inset={0}
      pos="fixed"
      backdropBlur="xl"
      overflow="auto"
      style={{ zIndex: 10000000 }}
    >
      <Box 
        inset={0} 
        pos="fixed" 
        bg="gray.900" 
        color="white" 
        boxShadow="xl"
      >
       {/* className="inset-0 fixed bg-gray-800 text-white shadow-2xl  overflow-auto   py-1"> */}
        
        {/* CLOSE BUTTON */}
        <Flex justify="end" h="5%" w="100%">
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
            onClick={() => setEmployeeProfile(null)}>
            <IoMdClose/>
          </Button>
        </Flex>
        {/* EMPLOYEE PROFILE */}
        <Box className="w-full h-[95%]">
          <Box id="scrollbar-container" overflow="auto">
            <Flex align="center" h="10vh" borderBottom="2px solid" borderColor="gray.700" boxShadow={10} mb={5}>
              <Heading as="h1" fontSize="24px" fontWeight="semibold" pl={5} >Employee Profile</Heading>

            </Flex>
            {/* PROFILE COMPONENT */}
            <ProfileDetails userDetails={userDetails} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
