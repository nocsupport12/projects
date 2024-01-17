import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
export const ClientDetails = ({ clientProfile }) => {
  // OWN PROFILE DETAILS
  console.log(clientProfile);
  return (
    <>
      <Flex
        flexDir="column"
        className="font-poppins"
        py={10}
        my={5}
        border="1px solid #E2E8F0"
        borderRadius={5}
        px={5}
      >
        <Flex py={4}>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Account Number:
            </Text>
            {clientProfile?.accountnumber}
          </Flex>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Client Name:
            </Text>
            {clientProfile?.fullname}
          </Flex>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              E-mail:
            </Text>
            {clientProfile?.email}
          </Flex>
        </Flex>

        <Flex py={4}>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Contact:
            </Text>
            {clientProfile?.contactnumber
              ?.split("")
              .filter((char) => !isNaN(char)).length < 11
              ? `0${clientProfile?.contactnumber
                  ?.split("")
                  .filter((char) => !isNaN(char))
                  .join("")}`
              : clientProfile?.contactnumber
                  ?.split("")
                  .filter((char) => !isNaN(char))
                  .join("")}
          </Flex>

          <Flex w="50%" align="center" gap={2}>
            <Text as="p" color="blue.300" fontWeight="semibold">
              Monthly Plan:
            </Text>
            {clientProfile?.monthlyplan}
          </Flex>
          <Flex w="50%" align="center" gap={2}>
            <Text as="p" color="blue.300" fontWeight="semibold">
              Area:
            </Text>
            {clientProfile?.area}
          </Flex>
        </Flex>

        <Flex py={4}>
          <Flex w="33.3%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Type:
            </Text>
            {clientProfile?.type}
          </Flex>

          <Flex w="33.3%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              MBPS:
            </Text>
            {clientProfile?.mbps ? `${clientProfile?.mbps} Mbps` : ""}
          </Flex>

          <Flex w="33.3%" gap={2}>
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Microbiz Plan:
            </Text>

            <Text as="p" align="center" fontWeight="semibold">
              {clientProfile.microbizplan}
            </Text>
          </Flex>
        </Flex>
        <Flex py={4} justify="space-between" mr={10}>
          <Flex align="center" mt={10} gap={2} fontSize="17px">
            <Text
              as="p"
              color="blue.300"
              align="center"
              textAlign="center"
              fontWeight="semibold"
            >
              Address:
            </Text>
            {clientProfile?.address}
          </Flex>
          <Flex align="center" mt={10} gap={2} fontSize="17px">
            <Text
              as="p"
              color="blue.300"
              align="center"
              textAlign="center"
              fontWeight="semibold"
            >
              Status:
            </Text>
            {clientProfile?.status}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
