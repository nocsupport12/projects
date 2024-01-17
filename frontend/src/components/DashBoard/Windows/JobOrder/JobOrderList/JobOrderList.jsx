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
}) => {
  const [windowTab, setWindowTab] = useState("Clients");
  const [rows, setRows] = useState([]);

  return (
    <>
      <div className="w-full overflow-x-auto min-w-[850px]">
        {/* List of Employees */}
        {/* window tabs */}
        <Flex>
          <Box
            px={5}
            py={3}
            borderRadius={10}
            _hover={{
              cursor: "pointer",
              backgroundColor: "blue.500",
              fontWeight: "semibold",
            }}
            backgroundColor={windowTab === "Clients" ? "blue.500" : ""}
            fontWeight={windowTab === "Clients" ? "semibold" : ""}
            onClick={() => {
              setWindowTab("Clients");
              setRows([
                "reportId",
                "type",
                "clientName",
                "description",
                "date",
                "actions",
              ]);
            }}
          >
            <Text>Clients</Text>
          </Box>
          <Box
            px={5}
            py={3}
            borderRadius={10}
            _hover={{
              cursor: "pointer",
              backgroundColor: "blue.500",
              fontWeight: "semibold",
            }}
            onClick={() => {
              setWindowTab("Field");
              setRows([
                "reportId",
                "type",
                "area",
                "description",
                "date",
                "actions",
              ]);
            }}
            backgroundColor={windowTab === "Field" ? "blue.500" : ""}
            fontWeight={windowTab === "Field" ? "semibold" : ""}
          >
            <Text>Field</Text>
          </Box>
        </Flex>
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

        <ul className="w-full max-h-[700px] min-h-[530px] flex flex-col gap-1 ">
          {allJobOrders
            .filter((el) => {
              if (el?.jobordertype) {
                return el?.jobordertype === windowTab;
              }
            })
            ?.map((jobOrder, index) => (
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
