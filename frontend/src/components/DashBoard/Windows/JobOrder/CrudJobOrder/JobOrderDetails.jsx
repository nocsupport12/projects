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
export const JobOrderDetails = ({ jobOrderView }) => {
  // OWN PROFILE DETAILS
  console.log(jobOrderView);
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
            {jobOrderView?.accountnumber}
          </Flex>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              CSR Report Number:
            </Text>
            {jobOrderView?.csrreportnumber}
          </Flex>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Client Name:
            </Text>
            {jobOrderView?.clientname}
          </Flex>
        </Flex>

        <Flex py={4}>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Contact:
            </Text>
            {jobOrderView?.contact}
          </Flex>
          <Flex w="50%" align="center" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Address:
            </Text>
            {jobOrderView?.address}
          </Flex>

          <Flex w="50%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Type:
            </Text>
            {jobOrderView?.type.toUpperCase()}
          </Flex>
        </Flex>

        <Flex py={4}>
          <Flex w="33.3%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Network Type:
            </Text>
            {jobOrderView?.networktype}
          </Flex>

          <Flex w="33.3%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Description:
            </Text>
            {jobOrderView?.description}
          </Flex>

          <Flex flexDir="column" w="33.3%">
            <Text fontSize="17px" color="blue.300" fontWeight="semibold">
              Materials Needed:
            </Text>
            <ul>
              {jobOrderView?.materialsneeded?.map((material, index) => {
                return <li key={index}>{material}</li>;
              })}
            </ul>
          </Flex>
        </Flex>

        <Flex py={4}>
          <Flex pt={3} w="50%" flexDir="column" gap={2}>
            <Text fontSize="17px" color="blue.300" fontWeight="bold">
              CSR/Dispatch:
            </Text>
            <Flex pl={3} gap={2} align="center">
              <Text fontSize="16px" color="blue.300" fontWeight="semibold">
                In-Charge:
              </Text>
              <Text fontSize={14}>
                {jobOrderView.dispatch?.employeeincharge}
              </Text>
            </Flex>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Status:{" "}
              {jobOrderView.dispatch?.status
                ? jobOrderView.dispatch?.status.toUpperCase()
                : ""}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Remarks: {jobOrderView.dispatch?.remarks}
            </Text>
          </Flex>

          <Flex w="50%" flexDir="column" gap={2}>
            <Text pt={3} fontSize="17px" color="blue.300" fontWeight="bold">
              NOC:
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              In-Charge: {jobOrderView.noc?.employeeincharge}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Status:{" "}
              {jobOrderView.noc?.status
                ? jobOrderView.noc?.status.toUpperCase()
                : ""}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Remarks: {jobOrderView.noc?.remarks}
            </Text>
          </Flex>

          <Flex w="50%" flexDir="column" gap={2}>
            <Text pt={3} fontSize="17px" color="blue.300" fontWeight="bold">
              Billing:
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              In-Charge: {jobOrderView.billing?.employeeincharge}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Status:{" "}
              {jobOrderView.billing?.status
                ? jobOrderView.billing?.status.toUpperCase()
                : ""}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Remarks: {jobOrderView.billing?.remarks}
            </Text>
          </Flex>
        </Flex>

        <Flex w="50%" pt={3} flexDir="column" gap={2}>
          <Text fontSize="17px" color="blue.300" fontWeight="bold">
            Action:
          </Text>
          <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
            In-Charge: {jobOrderView.action?.employeeincharge}
          </Text>
          <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
            Status:{" "}
            {jobOrderView.action?.status
              ? jobOrderView.action?.status.toUpperCase()
              : ""}
          </Text>
          <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
            Remarks: {jobOrderView.action?.remarks}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
