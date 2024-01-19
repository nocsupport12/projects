import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPrint } from "react-icons/fa";
import { DocViewer } from "../../../../PDF/DocViewer";
export const JobOrderDetails = ({ jobOrderView }) => {
  // OWN PROFILE DETAILS
  const [printView, setPrintView] = useState(false);
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
        {" "}
        <Flex w="50%" align="center" gap={2} fontSize="17px">
          <Text as="p" color="blue.300" align="center" fontWeight="semibold">
            Job Order Nature:
          </Text>
          {jobOrderView?.naturejoborder.toUpperCase()}
        </Flex>
        {jobOrderView?.naturejoborder === "application" && (
          <>
            <Flex py={4}>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Client Name:
                </Text>
                {jobOrderView?.fullname}
              </Flex>
            </Flex>
            <Flex py={4}>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Email/Facebook/Messenger:
                </Text>
                {jobOrderView?.email}
              </Flex>
            </Flex>

            <Flex py={4}>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Contact:
                </Text>
                {jobOrderView?.contactnumber}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Area:
                </Text>
                {jobOrderView?.area}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Monthly Plan:
                </Text>
                {jobOrderView?.monthlyplan}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Address:
                </Text>
                {jobOrderView?.address}
              </Flex>

              <Flex w="50%" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Type:
                </Text>
                {jobOrderView?.type.toUpperCase()}
              </Flex>
            </Flex>

            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Network Type:
              </Text>
              {jobOrderView?.networktype}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                MicroBiz Plan:
              </Text>
              {jobOrderView?.microbizplan}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Status:
              </Text>
              {jobOrderView?.status}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                MBPS:
              </Text>
              {jobOrderView?.mbps}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Agent:
              </Text>
              {jobOrderView?.agent}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Mode of Payment:
              </Text>
              {jobOrderView?.modeofpayment}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Reference Number:
              </Text>
              {jobOrderView?.referencenumber}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Remit Date:
              </Text>
              {jobOrderView?.remitdate}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Over the Counter:
              </Text>
              {jobOrderView?.otc}
            </Flex>
            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Type:
              </Text>
              {jobOrderView?.type}
            </Flex>
          </>
        )}
        {jobOrderView?.naturejoborder === "clienttrouble" && (
          <>
            <Flex py={4}>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Account Number:
                </Text>
                {jobOrderView?.accountnumber}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  CSR Report Number:
                </Text>
                {jobOrderView?.csrreportnumber}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Client Name:
                </Text>
                {jobOrderView?.fullname}
              </Flex>
            </Flex>

            <Flex py={4}>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Contact:
                </Text>
                {jobOrderView?.contactnumber}
              </Flex>
              <Flex w="50%" align="center" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Address:
                </Text>
                {jobOrderView?.address}
              </Flex>

              <Flex w="50%" gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Type:
                </Text>
                {jobOrderView?.type.toUpperCase()}
              </Flex>
            </Flex>

            <Flex w="33.3%" gap={2} fontSize="17px">
              <Text
                as="p"
                color="blue.300"
                align="center"
                fontWeight="semibold"
              >
                Network Type:
              </Text>
              {jobOrderView?.networktype}
            </Flex>
          </>
        )}
        <Flex py={4}>
          <Flex w="33.3%" gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Overview Description:
            </Text>
            {jobOrderView?.description}
          </Flex>
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
        <Flex py={4}>
          <Flex pt={3} w="50%" flexDir="column" gap={2}>
            <Text fontSize="17px" color="blue.300" fontWeight="bold">
              CSR:
            </Text>
            <Flex pl={3} gap={2} align="center">
              <Text fontSize="16px" color="blue.300" fontWeight="semibold">
                In-Charge:
              </Text>
              <Text fontSize={14}>{jobOrderView.csr?.employeeincharge}</Text>
            </Flex>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Status:{" "}
              {jobOrderView.csr?.status
                ? jobOrderView.csr?.status.toUpperCase()
                : ""}
            </Text>
            <Text fontSize="14px" color="blue.300" fontWeight="semibold" pl={3}>
              Remarks: {jobOrderView.csr?.remarks}
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
        <Flex pt={3} w="50%" flexDir="column" gap={2}>
          <Text fontSize="17px" color="blue.300" fontWeight="bold">
            Dispatch:
          </Text>
          <Flex pl={3} gap={2} align="center">
            <Text fontSize="16px" color="blue.300" fontWeight="semibold">
              In-Charge:
            </Text>
            <Text fontSize={14}>{jobOrderView.dispatch?.employeeincharge}</Text>
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
        {jobOrderView.naturejoborder === "application" && (
          <>
            <h2 className="text-xl text-center">NOC Activation</h2>
            <Flex w="50%" pt={3} flexDir="column" gap={2}>
              <Text
                fontSize="14px"
                color="blue.300"
                fontWeight="semibold"
                pl={3}
              >
                IP ADDRESS:{" "}
                {jobOrderView.ipaddress ? jobOrderView.ipaddress : ""}
              </Text>
              <Text
                fontSize="14px"
                color="blue.300"
                fontWeight="semibold"
                pl={3}
              >
                MAC ADDRESS:{" "}
                {jobOrderView.macaddress ? jobOrderView.macaddress : ""}
              </Text>
              <Text
                fontSize="14px"
                color="blue.300"
                fontWeight="semibold"
                pl={3}
              >
                Status: {jobOrderView?.statusupdate}
              </Text>
            </Flex>
          </>
        )}
        {/* PDF PRINT OF JOBORDER */}
        <Flex justifyContent="flex-end" alignItems="flex-end">
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
            onClick={() => {
              setPrintView(true);
            }}
            _hover={{
              borderColor: "blue.300",
              boxShadow: "xl",
              color: "blue.500",
            }}
          >
            <Flex align="center" gap={2}>
              Print Job Order Form
              <FaPrint />
            </Flex>
          </Button>
        </Flex>
        {printView && (
          <>
            <DocViewer
              jobOrderView={jobOrderView}
              setPrintView={setPrintView}
            />
          </>
        )}
      </Flex>
    </>
  );
};
