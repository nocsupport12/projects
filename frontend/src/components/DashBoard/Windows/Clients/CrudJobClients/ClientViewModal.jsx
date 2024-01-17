import React from "react";
import { IoMdClose } from "react-icons/io";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import "../../../../../index.css";
import { ClientDetails } from "./ClientDetails";
export const ClientViewModal = ({ setClientProfile, clientProfile }) => {
  // const userDetails = employeeProfile;
  return (
    <Box inset={0} pos="fixed" backdropBlur="xl" style={{ zIndex: 10000000 }}>
      <Box
        inset={0}
        pos="fixed"
        bg="gray.800"
        color="white"
        boxShadow="xl"
        h="100vh"
        overflow="auto"
        id="scrollbar-container"
      >
        {/* CLOSE BUTTON */}
        {/* <div className="flex justify-end pr-3 h-[5%] w-full">
          <IoMdClose
            className="text-2xl hover:cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setClientProfile(null)}
          />
        </div> */}
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
              boxShadow: "xl",
              color: "red.400",
            }}
            onClick={() => setClientProfile(null)}
          >
            <IoMdClose />
          </Button>
        </Flex>
        {/* JOBORDER PROFILE */}
        <Box className="w-full h-[95%]">
          <Box className="p-5">
            <Heading
              as="h1"
              fontSize="24px"
              textAlign="center"
              fontWeight="semibold"
            >
              CLIENT DETAILS
            </Heading>
            {/* PROFILE COMPONENT */}
            <ClientDetails clientProfile={clientProfile} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
