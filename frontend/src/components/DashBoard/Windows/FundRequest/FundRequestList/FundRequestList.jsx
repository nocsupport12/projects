import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
// import { EmployeeListDetails } from "./EmployeeListDetails";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FundRequestListDetails } from "./FundRequestListDetails";
export const FundRequestList = ({
  allFundRequests,
  setCreateFundRequest,
  setFundRequestProfile,
  setUpdateFundRequest,
  setDeleteFundRequest,
}) => {
  
  
  return (
    <>
      <Box className="w-full overflow-x-auto min-w-[850px] font-poppins">
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
          style={{ flexWrap: "nowrap" }}
        >
          {/* <p className="col-span-2" >Name</p> */}
          <GridItem colSpan={3}>
            <Text as="p" fontWeight="bold">
              Fund Request ID
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Requested By
            </Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Text as="p" fontWeight="bold">
              Department
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text as="p" fontWeight="bold">
              Total
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Remarks
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text as="p" fontWeight="bold">
              Actions
            </Text>
          </GridItem>
        </Grid>

        {allFundRequests.length > 0 ? (
          <Flex flexDir="column" gap={1} w="100%" maxH="700px" minH="530px">
          {allFundRequests?.map((fundRequest, index) => (
            <FundRequestListDetails
              fundRequest={fundRequest}
              key={index}
              setFundRequestProfile={setFundRequestProfile}
              setUpdateFundRequest={setUpdateFundRequest}
              setDeleteFundRequest={setDeleteFundRequest}
            />
          ))}
        </Flex>) : ( 
          <Flex justify="center" align="center" h="70vh">
            <Text fontSize="50px" fontWeight="bold">There is no Fund Requests</Text>
          </Flex>
        ) }
        

        {/* Create Fundrequests Button */}
        <Flex justify="end" align="end" mt={4}>
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
            onClick={() => setCreateFundRequest(true)}
            _hover={{
              color: "blue.500",
              borderColor: "blue.500",
              boxShadow: "xl",
            }}
          >
            <Flex align="center" gap={2}>
              <Text as="p">Create Fund Request</Text>
              <FaPlus />
            </Flex>
          </Button>
        </Flex>
      </Box>
    </>
  );
};
