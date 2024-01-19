import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { JobOrderListDetails } from "./JobOrderListDetails";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
export const JobOrderList = ({
  // allUsers,
  allJobOrders,
  setCreateJobOrder,
  setJobOrderView,
  setUpdateJobOrder,
  setDeleteJobOrder,
  personnel,
}) => {
  const [windowTab, setWindowTab] = useState("Clients");
  const [rows, setRows] = useState([]);

  return (
    <>
      <div className="w-full overflow-x-auto min-w-[850px]">
        <Grid
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
          py={2}
          px={2}
          mb={2}
          rounded="lg"
          bg="green.800"
          flexWrap="nowrap"
          style={{ flexWrap: "nowrap" }}
        >
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Report ID
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Type
            </Text>
          </GridItem>
          <GridItem colSpan={3}>
            {windowTab === "Clients" && (
              <Text as="p" fontWeight="bold">
                Client Name
              </Text>
            )}
            {windowTab === "Field" && (
              <Text as="p" fontWeight="bold">
                Address
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Description
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text as="p" fontWeight="bold">
              Date
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text as="p" fontWeight="bold">
              Actions
            </Text>
          </GridItem>
        </Grid>

        <ul className="w-full h-[550px] overflow-y-auto flex flex-col gap-1 ">
          {allJobOrders
            ?.filter((el) => personnel === el.receiver)
            .map((jobOrder, index) => (
              <JobOrderListDetails
                jobOrder={jobOrder}
                key={index}
                windowTab={windowTab}
                setJobOrderView={setJobOrderView}
                setUpdateJobOrder={setUpdateJobOrder}
                setDeleteJobOrder={setDeleteJobOrder}
              />
            ))}
        </ul>

        {/* Create Employee Button */}
        <div className="flex justify-end items-end mt-4">
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
            onClick={() => setCreateJobOrder(true)}
            _hover={{
              borderColor: "blue.500",
              boxShadow: "xl",
              color: "blue.500",
            }}
          >
            <Flex align="center" gap={2}>
              <Text>Create Job Order</Text>
              <FaPlus />
            </Flex>
          </Button>
        </div>
      </div>
    </>
  );
};
