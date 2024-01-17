import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const FundRequestListDetails = ({
  fundRequest,
  setUpdateFundRequest,
  setFundRequestProfile,
  setDeleteFundRequest,
}) => {
  return (
    <Grid
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      px={2}
      py={2}
      mb={1}
      borderBottom={1}
      rounded={6}
      transition="all 0.3s ease"
      flexWrap="nowrap"
      _hover={{
        bg: "gray.600",
      }}
    >
      {/* <p className="col-span-2" >Name</p> */}
      <GridItem colSpan={3} onClick={() => setFundRequestProfile(fundRequest)}>
        <Text as="p">{fundRequest?.requestfundid}</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="p">{fundRequest?.requestedby}</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text as="p">{fundRequest?.department}</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text as="p">{fundRequest?.total}</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="p">{fundRequest?.remarks}</Text>
      </GridItem>
      <GridItem colSpan={1} >
        <p className="col-span-1 flex gap-3 justify-center text-xl">
          <FaEdit
            className="hover:cursor-pointer hover:text-gray-300"
            onClick={() => setUpdateFundRequest(fundRequest)}
          />
          <MdDelete
            className="text-red-700 hover:cursor-pointer hover:text-red-300"
            onClick={() => {
              setDeleteFundRequest(fundRequest?._id);
            }}
          />
        </p>
      </GridItem>
    </Grid>
  );
};
