import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ProfileDetails } from "./Profile/ProfileDetails";
import { EmployeeForm } from "./Employee/CrudEmployee/EmployeeForm";
import { retrieveUserDB } from "../../Api/UserAccountsApi";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
export const Profile = ({}) => {
  const user = localStorage.getItem("user");
  const [userDetails, setUserDetails] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const fetchData = async () => {
    try {
      const data = await retrieveUserDB({ _id: user });
      setUserDetails(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <Box className="font-poppins">
      <Flex align="center" h="10vh" borderBottom="2px solid" borderColor="gray.700" boxShadow={10} mb={5}>
        <Heading as="h1" fontSize="24px" fontWeight="semibold" pl={5} >Admin Dashboard</Heading>

      </Flex>
      
      {/* PROFILE COMPONENT */}
      <Box h="65vh">
        {!isEditMode ? (
          <Box id="scrollbar-container" overflow="auto" h="65vh"  pt={5}>
            <ProfileDetails userDetails={userDetails} />

          </Box>

        ) : (
          <Box id="scrollbar-container" overflow="auto" h="75vh">
            
            <EmployeeForm
              userDetails={userDetails}
              setUpdateEmployee={setIsEditMode}
              isOwnProfile={true}
              
              setUserDetails={setUserDetails}
              setIsEditMode={setIsEditMode}
            />
          </Box>
        )}
      </Box>
      <Flex h="10vh" align="center" justify="end" pr={10}>
        {!isEditMode && (
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
            onClick={()=> setIsEditMode(true)}
            _hover={{    
              color: "blue.500",
              borderColor: 'blue.500',
              boxShadow: 'xl',
            }}>
            <Flex align="center" gap={2}>
              <Text>Edit Profile</Text>
              <FaEdit />
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};
