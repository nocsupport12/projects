import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ItemsListDetails = ({ item, index }) => {
  return (
    <>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        px={2}
        py={2}
        mb={1}
        borderBottom="1px solid"
        rounded={6}
        transition="all 0.3s ease"
        flexWrap="nowrap"
        _hover={{
          bg: "gray.600",
        }}
      >
        <GridItem colSpan={3}>
          <Text as="p">
            {item.description}
          </Text>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Text as="p">{item.purpose}</Text>
        </GridItem>

        <GridItem colSpan={1} textAlign="center" >
          <Text as="p">{item.quantity}</Text>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Text as="p">₱ {item.unitprice}</Text>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Text as="p">₱ {item.itemtotalprice}</Text>
        </GridItem>
        <GridItem colSpan={2} >
          <Text as="p">{item.remarks}</Text>
        </GridItem>
      </Grid>
    </>
  );
};
