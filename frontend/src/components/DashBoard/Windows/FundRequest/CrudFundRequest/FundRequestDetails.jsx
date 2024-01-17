import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { ItemsListDetails } from "./FormComponent/ItemListDetails";
export const FundRequestDetails = ({ fundRequestProfile }) => {
  // OWN PROFILE DETAILS
  return (
    <>
      <Flex
        flexDir="column"
        className="font-poppins"
        py={5}
        my={5}
        border="1px solid #E2E8F0"
        borderRadius={5}
        px={5}
      >
        

        {/* FUND REQUEST ID */}
        <Flex py={4}>
          <Flex w="50%" align="center" gap={2} fontSize="18px">
            <Text align="center" fontWeight="semibold" color="blue.300">
              Fund Request ID:
            </Text>
            <Text fontWeight="bold">{fundRequestProfile?.requestfundid}</Text>
          </Flex>

          {/* REQUESTED BY */}
          <Flex w="50%" align="center" gap={2} fontSize="18px">
            <Text align="center" fontWeight="semibold" color="blue.300">
              Requested By:
            </Text>
            <Text>{fundRequestProfile?.requestedby}</Text>
          </Flex>

          {/* DEPARTMENT */}
          <Flex w="50%" align="center" gap={2} fontSize="18px">
            <Text align="center" fontWeight="semibold" color="blue.300">
              Department:
            </Text>
            <Text>{fundRequestProfile?.department}</Text> 
          </Flex>

        </Flex>

        {/* REMARKS */}
        <Flex py={4}>
          <Flex w="50%" align="center" gap={2} fontSize="18px" >
            <Text align="center" fontWeight="semibold" color="blue.300">
              Remarks:
            </Text>
            <Text>{fundRequestProfile?.remarks}</Text>
          </Flex>
        </Flex>

        <Box py={4}>
          <FormLabel fontSize="17px" pb={3}>ITEMS:</FormLabel>
          <Grid
              gridTemplateColumns="repeat(12, 1fr)"
              gap={2}
              px={2}
              py={2}
              mb={1}
              borderBottom={1}
              rounded={6}
              flexWrap="nowrap"
              bg="green.600"
              color="white"
              fontWeight="semibold"
              
            >
              <GridItem colSpan={3} >
                <Text as="p">Description</Text>
              </GridItem>

              <GridItem colSpan={2} textAlign="center">
                <Text as="p">Purpose</Text>
              </GridItem>

              <GridItem colSpan={1} textAlign="center">
                <Text as="p">Quantity</Text>
              </GridItem>

              <GridItem colSpan={2} textAlign="center">
                <Text as="p">Unit Price</Text>
              </GridItem>

              <GridItem colSpan={2} textAlign="center">
                <Text as="p">Total Price</Text>
              </GridItem>
              <GridItem colSpan={2} >
                <Text as="p">Remarks</Text>
              </GridItem>
            </Grid>
          <ul>
            {fundRequestProfile?.items?.map((item, index) => {
              return <ItemsListDetails item={item} key={index} index={index} />;
            })}
          </ul>
          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            px={2}
            py={2}
            mb={1}
            mt={10}
            borderBottom={1}
            rounded={6}
            flexWrap="nowrap"
            bg="green.600"
            color="white"
            fontWeight="semibold"
          >
            <GridItem colSpan={9}>
              <Text as="p" textAlign="right" fontSize="22px">
                Total:
              </Text>
            </GridItem>
            <GridItem colSpan={3} textAlign="center" fontSize="22px">
              <p>₱ {fundRequestProfile.total}</p>
            </GridItem>
          </Grid>

        </Box>
        <Flex w="100%" py={2} gap={2} align="center">
          <Box fontWeight="semibold">Checked:</Box>
          {fundRequestProfile?.checkedby}
        </Flex>
        <Flex w="100%" py={2} gap={2} align="center">
          <Box fontWeight="semibold">Approved:</Box>
          {fundRequestProfile?.approvedby}
        </Flex>
      </Flex>
    </>
  );
};
