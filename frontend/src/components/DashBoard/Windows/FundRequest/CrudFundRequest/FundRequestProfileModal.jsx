import React from "react";
import { IoMdClose } from "react-icons/io";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FundRequestDetails } from "./FundRequestDetails";
export const FundRequestProfileModal = ({
  setFundRequestProfile,
  fundRequestProfile,
}) => {
  return (
    <Box
      inset={0}
      pos="fixed"
      backdropBlur="xl"
      overflow="auto"
      style={{ zIndex: 10000000 }}
    >
      <Box inset={0} pos="fixed" bg="gray.800" color="white" boxShadow="xl">
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
              boxShadow: "xl",
              color: "red.400",
            }}
            onClick={() => setFundRequestProfile(null)}
          >
            <IoMdClose />
          </Button>
        </Flex>
        {/* EMPLOYEE PROFILE */}
        <Box className="w-full h-[95%]">
          <Box className="p-5">
            <Heading
              as="h1"
              fontSize="24px"
              textAlign="center"
              fontWeight="semibold"
            >
              FUND REQUEST DETAILS
            </Heading>
            {/* PROFILE COMPONENT */}
            <FundRequestDetails fundRequestProfile={fundRequestProfile} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
