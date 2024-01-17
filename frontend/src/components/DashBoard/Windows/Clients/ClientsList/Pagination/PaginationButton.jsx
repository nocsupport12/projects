import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const PaginationButton = ({ pageNumber, page, setPage, items }) => {
  let pageIndex = pageNumber;
  let clicked = pageNumber;
  switch (pageNumber) {
    case "start":
      pageIndex = <ArrowLeftIcon />;
      clicked = 1;
      break;
    case "prev":
      pageIndex = <ChevronLeftIcon fontSize="26px" />;
      clicked = page - 1;
      break;
    case "next":
      pageIndex = <ChevronRightIcon fontSize="26px" />;
      clicked = page + 1;
      break;
    case "end":
      pageIndex = <ArrowRightIcon />;
      clicked = Math.ceil(items?.length / 80);
      break;

    default:
      break;
  }
  if (pageNumber !== null) {
    return (
      <Button
        onClick={() => setPage(clicked)}
        colorScheme="lime"
        size="md"
        fontWeight="semibold"
        px={6}
        py={3}
        borderRadius="md"
        borderWidth={2}
        borderColor={pageIndex === page ? "blue.200" : "blue.600"}
        transition="all 0.3s"
        color="white"
        // onClick={() => setCreateJobOrder(true)}
        _hover={{
          borderColor: "blue.500",
          boxShadow: "xl",
          color: "blue.500",
        }}
      >
        <Flex align="center" gap={2}>
          <Text>{pageIndex}</Text>
        </Flex>
      </Button>
    );
  }
};
