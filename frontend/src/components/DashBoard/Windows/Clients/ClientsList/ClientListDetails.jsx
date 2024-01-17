import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ClientListDetails = ({
  client,
  setClientProfile,
  rows,
  setUpdateClient,
  setDeleteClient,
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
      {rows.includes("accountnumber") && (
        <GridItem
          colSpan={2}
          _hover={{ cursor: "pointer" }}
          className="hover:underline"
          onClick={() => {
            setClientProfile(client);
          }}
        >
          <Text as="p" fontWeight="bold">
            {client?.accountnumber ? client?.accountnumber : ""}
          </Text>
        </GridItem>
      )}
      {rows.includes("remitdate") && (
        <GridItem
          colSpan={2}
          _hover={{ cursor: "pointer" }}
          className="hover:underline"
          onClick={() => {
            setClientProfile(client);
          }}
        >
          <Text as="p" fontWeight="bold">
            {client?.remitdate ? client?.remitdate : ""}
          </Text>
        </GridItem>
      )}
      {rows.includes("fullname") && (
        <GridItem colSpan={4}>
          <Text as="p" fontWeight="bold">
            {client.fullname}
          </Text>
        </GridItem>
      )}
      {rows.includes("contactnumber") && (
        <GridItem colSpan={2}>
          <Text as="p" fontWeight="bold" textAlign="center">
            {client?.contactnumber?.split("").filter((char) => !isNaN(char))
              .length === 10
              ? `0${client?.contactnumber
                  ?.split("")
                  .filter((char) => !isNaN(char))
                  .join("")}`
              : client?.contactnumber
                  ?.split("")
                  .filter((char) => !isNaN(char))
                  .join("")}
          </Text>
        </GridItem>
      )}
      {rows.includes("agent") && (
        <GridItem colSpan={2}>
          <Text as="p" fontWeight="semibold" textAlign="center">
            {client?.agent ? client?.agent : ""}
          </Text>
        </GridItem>
      )}
      {rows.includes("area") && (
        <GridItem colSpan={3}>
          <Text as="p" fontWeight="semibold" textAlign="center">
            {client?.area ? client?.area : ""}
          </Text>
        </GridItem>
      )}
      {rows.includes("actions") && (
        <GridItem colSpan={1}>
          <Flex as="p" fontWeight="bold" dir="row" fontSize="21px" gap={2}>
            <FaEdit
              className="hover:cursor-pointer hover:text-gray-300"
              onClick={() => setUpdateClient(client)}
            />
            <MdDelete
              className="text-red-700 hover:cursor-pointer hover:text-red-300"
              onClick={() => {
                setDeleteClient(client._id);
              }}
            />
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};
