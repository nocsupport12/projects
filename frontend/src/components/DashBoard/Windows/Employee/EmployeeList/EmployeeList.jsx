import React from "react";
import { FaPlus } from "react-icons/fa";
import { EmployeeListDetails } from "./EmployeeListDetails";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
export const EmployeeList = ({
  allUsers,
  setCreateEmployee,
  setEmployeeProfile,
  setUpdateEmployee,
  setDeleteEmployee,
}) => {
  return (
    <>
      <Box className="w-full overflow-x-auto min-w-[850px] font-poppins"
      
      >
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
          // className="grid grid-cols-12 gap-2 py-2 px-2 mb-2 bg-green-800 rounded-lg "
        style={{flexWrap: "nowrap"}}
        >
          {/* <p className="col-span-2" >Name</p> */}
          <GridItem colSpan={2}><Text as="p" fontWeight="bold">Name</Text></GridItem>
          <GridItem colSpan={2}><Text as="p" fontWeight="bold">Position</Text></GridItem>
          <GridItem colSpan={3}><Text as="p" fontWeight="bold">E-mail</Text></GridItem>
          <GridItem colSpan={2}><Text as="p" fontWeight="bold">Contact</Text></GridItem>
          <GridItem colSpan={2}><Text as="p" fontWeight="bold">Remarks</Text></GridItem>
          <GridItem colSpan={1}><Text as="p" fontWeight="bold">Actions</Text></GridItem>
        </Grid>
        {allUsers.length > 0 ? 
        (
          <Flex flexDir="column" gap={1} w="100%" maxH="700px" minH="530px" >
        
            {allUsers?.map((user, index) => (
              <EmployeeListDetails
                user={user}
                key={index}
                setCreateEmployee={setCreateEmployee}
                setEmployeeProfile={setEmployeeProfile}
                setUpdateEmployee={setUpdateEmployee}
                setDeleteEmployee={setDeleteEmployee}
              />
            ))}
          </Flex>
        ) : (
          <Flex justify="center" align="center" h="70vh">
            <Text fontSize="50px" fontWeight="bold">There is no Employee</Text>
          </Flex>
        )}
        

        {/* Create Employee Button */}
        <Flex justify="end" align="end" mt={4} >
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
            onClick={()=> setCreateEmployee(true)}
            _hover={{    
              color: "blue.500",
              borderColor: 'blue.500',
              boxShadow: 'xl',
            }}>
            <Flex align="center" gap={2}>
              <Text as="p">Create Employee</Text>
              <FaPlus />
            </Flex>
          </Button>
        
        </Flex>
      </Box>
    </>
  );
};
