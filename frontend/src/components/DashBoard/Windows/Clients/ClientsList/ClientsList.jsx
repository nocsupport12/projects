import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ClientListDetails, JobOrderListDetails } from "./ClientListDetails";

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Pagination } from "./Pagination/Pagination";
export const ClientsList = ({
  allClients,
  // allJobOrders,
  setCreateClient,
  setClientProfile,
  setUpdateClient,
  setDeleteClient,
}) => {
  const [clientsDisplay, setClientDisplay] = useState([]);
  const [windowTab, setWindowTab] = useState("Activated");
  const [rows, setRows] = useState([
    "fullname",
    "accountnumber",
    "contactnumber",
    "area",
    "actions",
  ]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Activated");
  const [initCalled, setInitCalled] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!initCalled && allClients?.length !== 0) {
      // Call your init function here
      init();

      // Set initCalled to true to prevent future calls
      setInitCalled(true);
    }
  }, [allClients, initCalled]);

  const init = () => {
    const filteredByStatus = allClients?.filter((client) => {
      return client.status === windowTab;
    });
    setClientDisplay(filteredByStatus);
  };
  useEffect(() => {
    const filteredByStatus = allClients?.filter((client) => {
      if (windowTab === "For Pull Out") {
        return (
          "FP - Non Payment" === client.status ||
          "FP - Termination Requested" === client.status
        );
      } else {
        return client.status === windowTab;
      }
    });

    const filteredBySearch = filteredByStatus?.filter((item) =>
      Object.entries(item).some(
        ([key, value]) =>
          key !== "status" &&
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
    setPage(1);
    setClientDisplay(filteredBySearch);
  }, [search, windowTab, allClients]);
  // const statusOptions = [
  //   "Activated",
  //   "Available",
  //   "FP - Non Payment",
  //   "FP - Termination Requested",
  //   "Pulled Out",
  //   "Temporary Disconnected",
  //   "To Pull Out",
  //   "All",
  // ];

  // useEffect(() => {

  // }, [page]);
  // useEffect(() => {
  //   console.log(status);
  // }, [status]);

  return (
    <>
      <div className="w-full overflow-x-auto min-w-[850px]">

        {/* SEARCH */}
        <Flex w="100%" gap={2}>
          <InputGroup w="40%" mb="8px">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
              ml="10px"
            />
            <Input
              className="w-full"
              type="text"
              placeholder="Search"
              pl="40px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          {/* <Box w="20%">
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              color="white"
              borderColor="white"
              bg="gray.600"
              _hover={{ bg: "gray.700" }}
              _focus={{ bg: "gray.700", borderColor: "white" }}
            >
              {statusOptions.map((option, index) => (
                <option
                  key={index}
                  className="bg-gray-900 text-black py-3 text-lg "
                  value={option}
                >
                  {option}
                </option>
              ))}
            </Select>
          </Box> */}
          <Box as="div" w="40%">
            <Text textAlign="right">
              Total {search === "" ? "Clients" : "Results"}:{" "}
              {clientsDisplay?.length}
            </Text>
          </Box>
        </Flex>
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
            backgroundColor={windowTab === "Activated" ? "blue.500" : ""}
            fontWeight={windowTab === "Activated" ? "semibold" : ""}
            onClick={() => {
              setWindowTab("Activated");
              setRows([
                "fullname",
                "accountnumber",
                "contactnumber",
                "area",
                "actions",
              ]);
            }}
          >
            <Text>Activated</Text>
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
              setWindowTab("Temporary Disconnected");
              setRows([
                "fullname",
                "accountnumber",
                "contactnumber",
                "area",
                "actions",
              ]);
            }}
            backgroundColor={
              windowTab === "Temporary Disconnected" ? "blue.500" : ""
            }
            fontWeight={
              windowTab === "Temporary Disconnected" ? "semibold" : ""
            }
          >
            <Text>Temporary Disconnected</Text>
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
              setWindowTab("For Pull Out");
              setRows([
                "fullname",
                "accountnumber",
                "contactnumber",
                "area",
                "actions",
              ]);
            }}
            backgroundColor={windowTab === "For Pull Out" ? "blue.500" : ""}
            fontWeight={windowTab === "For Pull Out" ? "semibold" : ""}
          >
            <Text>For Pull Out</Text>
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
              setWindowTab("Pulled Out");
              setRows([
                "fullname",
                "accountnumber",
                "contactnumber",
                "area",
                "actions",
              ]);
            }}
            backgroundColor={windowTab === "Pulled Out" ? "blue.500" : ""}
            fontWeight={windowTab === "Pulled Out" ? "semibold" : ""}
          >
            <Text>Inactive</Text>
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
              setWindowTab("Pending");
              setRows(["fullname", "remitdate", "agent", "area", "actions"]);
            }}
            backgroundColor={windowTab === "Pending" ? "blue.500" : ""}
            fontWeight={windowTab === "Pending" ? "semibold" : ""}
          >
            <Text>I&AQ</Text>
          </Box>
        </Flex>
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
          className="gap-2 px-2 py-2 mb-1"
          style={{ flexWrap: "nowrap" }}
        >
          {rows.includes("accountnumber") && (
            <GridItem colSpan={2}>
              <Text as="p" fontWeight="bold">
                Account No.
              </Text>
            </GridItem>
          )}
          {rows.includes("remitdate") && (
            <GridItem colSpan={2}>
              <Text as="p" fontWeight="bold">
                Remit Date
              </Text>
            </GridItem>
          )}
          {rows.includes("fullname") && (
            <GridItem colSpan={4}>
              <Text as="p" fontWeight="bold">
                Client Name
              </Text>
            </GridItem>
          )}
          {rows.includes("contactnumber") && (
            <GridItem colSpan={2}>
              <Text as="p" fontWeight="bold" textAlign="center">
                Contact No.
              </Text>
            </GridItem>
          )}
          {rows.includes("agent") && (
            <GridItem colSpan={2}>
              <Text as="p" fontWeight="bold" textAlign="center">
                Agent
              </Text>
            </GridItem>
          )}
          {rows.includes("area") && (
            <GridItem colSpan={3}>
              <Text as="p" fontWeight="bold" textAlign="center">
                Area
              </Text>
            </GridItem>
          )}
          {rows.includes("actions") && (
            <GridItem colSpan={1}>
              <Text as="p" fontWeight="bold">
                Actions
              </Text>
            </GridItem>
          )}
        </Grid>
        {clientsDisplay?.length > 0 ? (
          <ul className="w-full h-[550px] overflow-auto flex flex-col gap-1 ">
            {clientsDisplay
              ?.slice((page - 1) * 80, page * 80)
              ?.map((client, index) => {
                return (
                  <ClientListDetails
                    client={client}
                    key={index}
                    rows={rows}
                    // setCreateEmployee={setCreateEmployee}
                    setClientProfile={setClientProfile}
                    setUpdateClient={setUpdateClient}
                    setDeleteClient={setDeleteClient}
                  />
                );
              })}
          </ul>
        ) : (
          <Flex justify="center" align="center" h="70vh">
            <Text fontSize="50px" fontWeight="bold">
              There is no Client
            </Text>
          </Flex>
        )}

        {/* PAGINATION BUTTON */}
        <Flex gap={2} justify="center">
          <Pagination items={clientsDisplay} page={page} setPage={setPage} />
        </Flex>
        
        {/* CREATE CLIENT */}
        <Flex gap={2} justify="end">
          
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
            onClick={() => setCreateClient(true)}
            _hover={{
              borderColor: "blue.500",
              boxShadow: "xl",
              color: "blue.500",
            }}
          >
            <Flex align="center" gap={2}>
              <Text>Create Client</Text>
              <FaPlus />
            </Flex>
          </Button>
        </Flex>
      </div>
    </>
  );
};
