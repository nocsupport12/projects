import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ItemsList = ({ item, removeItem, editItem, index }) => {
  return (
    <>
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
          bg: "gray.400",
        }}
      >
        <GridItem colSpan={2}>
          <Text as="p" _hover={{ textDecor: "underline", cursor: "pointer" }}>
            {item.description}
          </Text>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Text as="p">{item.purpose}</Text>
        </GridItem>

        <GridItem colSpan={1} textAlign="center">
          <Text as="p">{item.quantity}</Text>
        </GridItem>

        <GridItem colSpan={1} textAlign="center">
          <Text as="p">₱ {item.unitprice}</Text>
        </GridItem>

        <GridItem colSpan={2} textAlign="center">
          <Text as="p">₱ {item.itemtotalprice}</Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Text as="p">{item.remarks}</Text>
        </GridItem>
        <GridItem colSpan={1 } textAlign="center">
          <p className="col-span-1 flex gap-3 justify-center text-xl">
            <FaEdit
              className="hover:cursor-pointer hover:text-gray-300"
              onClick={() => editItem({ e: item, index: index })}
            />
            <MdDelete
              className="text-red-700 hover:cursor-pointer hover:text-red-300"
              onClick={() => {
                removeItem(index);
              }}
            />
          </p>
        </GridItem>
      </Grid>
    </>
  );
};
