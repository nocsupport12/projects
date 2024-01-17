import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const JobOrderListDetails = ({
  jobOrder,
  setJobOrderView,
  setUpdateJobOrder,
  setDeleteJobOrder,
  windowTab,
}) => {
  return (
    <Grid
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      py={2}
      px={2}
      mb={2}
      rounded="lg"
      flexWrap="nowrap"
      className="gap-2 px-2 py-2 mb-1 border-b rounded-lg transition duration-300 hover:bg-gray-600"
      style={{ flexWrap: "nowrap" }}
    >
      <GridItem
        colSpan={2}
        _hover={{ cursor: "pointer" }}
        className="hover:underline"
        onClick={() => {
          setJobOrderView(jobOrder);
        }}
      >
        <Text as="p" fontWeight="bold">
          {jobOrder.csrreportnumber}
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="p" fontWeight="bold">
          {jobOrder.type.toUpperCase()}
        </Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text as="p" fontWeight="bold">
          {windowTab === "Clients" && jobOrder.clientname}
          {windowTab === "Field" && jobOrder.address}
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="p" fontWeight="bold">
          {jobOrder.description}
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="p">
          {Date(jobOrder.date)
            .toLocaleString()
            .split(" ")
            .slice(1, 4)
            .join(" ")}
        </Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Flex as="p" fontWeight="bold" dir="row" fontSize="21px" gap={2}>
          <FaEdit
            className="hover:cursor-pointer hover:text-gray-300"
            onClick={() => setUpdateJobOrder(jobOrder)}
          />
          <MdDelete
            className="text-red-700 hover:cursor-pointer hover:text-red-300"
            onClick={() => {
              setDeleteJobOrder(jobOrder._id);
            }}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};
