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
        px={5}
        my={5}
        border="1px solid #E2E8F0"
        borderRadius={5}
      
      >
        {" "}
        <Flex ml="10px" pb={{base: "10"}} w={{base: "100%", sm: "100%", md: "40%", lg:"32%"}} align="center" gap={2} fontSize="17px">
          <Text as="p" color="blue.300" align="center" fontWeight="semibold">
            Job Order Nature:
          </Text>
          {jobOrderView?.naturejoborder.toUpperCase()}
        </Flex>
        {jobOrderView?.naturejoborder === "application" && (
          <>
          <Flex flexWrap="wrap">
              <Flex  py={{base: "2",lg: "4"}} w={{base: "100%", md:"49%"}} align="center" gap={2} fontSize="17px">
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

              <Flex  py={{base: "2",lg: "4"}} w={{base: "100%", md:"49%"}} align="center" gap={2} fontSize="17px">
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
          
          <Flex justify="space-between" flexWrap="wrap">
          

              {/* CONTACT */}
              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} align="center" gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} align="center" gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} align="center" gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} align="center" gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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
              


              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  MOD:
                </Text>
                {jobOrderView?.modeofpayment}
              </Flex>

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
                <Text
                  as="p"
                  color="blue.300"
                  align="center"
                  fontWeight="semibold"
                >
                  Reference No:
                </Text>
                {jobOrderView?.referencenumber}
              </Flex>

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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

              <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg:"32%"}} gap={2} fontSize="17px">
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
          </Flex>
          </>
        )}

        {jobOrderView?.naturejoborder === "clienttrouble" && (
          <>
            <Flex py={4} flexWrap="wrap">
                {/* ACCOUNT NUMBER */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} align="center" gap={2} fontSize="17px">
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
                {/* CSR REPORT NUMBER */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} align="center" gap={2} fontSize="17px">
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
                {/* CLIENT NAME */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} align="center" gap={2} fontSize="17px">
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
                {/* CONTACT */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} align="center" gap={2} fontSize="17px">
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
                {/* ADDRESS */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} align="center" gap={2} fontSize="17px">
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
                {/* TYPE */}
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} gap={2} fontSize="17px">
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
                <Flex py={{base: "2",lg: "4"}} w={{base: "100%", sm: "100%", md: "49%", lg: "32%"}} gap={2} fontSize="17px">
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
            </Flex>

            {/* NETWORK TYPE */}
            
          </>
        )}
        <Flex py={4}>

          {/* OVERVIEW DESCRIPTION */}
          <Flex w={{base:"100%"}} gap={2} fontSize="17px">
            <Text as="p" color="blue.300" align="center" fontWeight="semibold">
              Overview Description:
            </Text>
            {jobOrderView?.description}
          </Flex>
        </Flex>
        {/* MATERIALS NEEDED */}
        <Flex flexDir="column" w={{base:"100%"}}>
          <Text fontSize="17px" color="blue.300" fontWeight="semibold">
            Materials Needed:
          </Text>
          <ul>
            {jobOrderView?.materialsneeded?.map((material, index) => {
              return <li key={index}>{material}</li>;
            })}
          </ul>
        </Flex>

        <Flex py={4} flexWrap="wrap">
          <Flex pt={3} w={{base:"100%", sm:"100%", md:"32%", lg:"32%"}} flexDir="column" gap={2}>
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

          <Flex w={{base:"100%", sm:"100%", md:"32%", lg:"32%"}} flexDir="column" gap={2}>
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

          <Flex w={{base:"100%", sm:"100%", md:"32%", lg:"32%"}} flexDir="column" gap={2}>
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

        <Flex pb={5} flexWrap="wrap">
          <Flex  pt={3} w={{base:"100%", sm:"100%", md:"32%", lg:"32%"}} flexDir="column" gap={2}>
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

          <Flex w={{base:"100%", sm:"100%", md:"32%", lg:"32%"}} pt={3} flexDir="column" gap={2}>
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
