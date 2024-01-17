import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "../../../../../index.css";
import {
  createJobOrderDB,
  updateJobOrderDB,
} from "../../../../Api/JobOrderApi";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

export const JobOrderForm = ({
  setCreateJobOrder,
  allJobOrders,
  setAllJobOrders,
  setUpdateJobOrder,
  updateJobOrder,
  jobTypeProps,
}) => {
  //   FORM STATES
  const [accountNumber, setAccountNumber] = useState("");
  const [jobOrdertype, setJobOrdertype] = useState("");
  const [csrReportNumber, setCsrReportNumber] = useState("");
  const [clientName, setclientName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [jobOrderTypeProps, setJobOrderTypeProps] = useState("");
  const [materialsNeededInput, setMaterialsNeededInput] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const [networkType, setNetworkType] = useState("");
  const [dispatch, setDispatch] = useState(null);
  const [nOC, setNOC] = useState(null);
  const [billing, setBilling] = useState(null);
  const [action, setAction] = useState(null);
  const user = localStorage.getItem("user");
  const [type, setType] = useState("create");
  const toast = useToast();
  useEffect(() => {
    setJobOrderTypeProps(jobTypeProps);
  }, [jobTypeProps]);
  useEffect(() => {
    if (updateJobOrder !== null) {
      setType("update");

      setAccountNumber(
        updateJobOrder?.accountnumber ? updateJobOrder?.accountnumber : ""
      );
      setCsrReportNumber(
        updateJobOrder?.csrreportnumber ? updateJobOrder?.csrreportnumber : ""
      );
      setclientName(
        updateJobOrder?.clientname ? updateJobOrder?.clientname : ""
      );
      setContact(updateJobOrder?.contact ? updateJobOrder?.contact : "");

      setDescription(
        updateJobOrder?.description ? updateJobOrder?.description : ""
      );

      setAddress(updateJobOrder?.address ? updateJobOrder?.address : "");

      setJobOrdertype(updateJobOrder?.type ? updateJobOrder?.type : "");

      setMaterialsNeeded(
        updateJobOrder?.materialsneeded ? updateJobOrder?.materialsneeded : []
      );

      setNetworkType(
        updateJobOrder?.networktype ? updateJobOrder?.networktype : ""
      );

      setDispatch(updateJobOrder?.dispatch ? updateJobOrder?.dispatch : null);
      setNOC(updateJobOrder?.noc ? updateJobOrder?.noc : null);
      setBilling(updateJobOrder?.billing ? updateJobOrder?.billing : null);
      setAction(updateJobOrder?.action ? updateJobOrder?.action : null);
    } else {
      setType("create");
    }
  }, [updateJobOrder]);

  //   CREATE/UPDATE USERACCOUNTS DATABASE
  const JobOrderDB = async () => {
    const body = {
      accountnumber: accountNumber,
      jobordertype: jobOrderTypeProps,
      csrreportnumber: csrReportNumber,
      clientname: clientName,
      contact: contact,
      description: description,
      address: address,
      type: jobOrdertype,
      materialsneeded: materialsNeeded,
      networktype: networkType,
      dispatch: dispatch,
      noc: nOC,
      billing: billing,
      action: action,
      history:
        type === "create"
          ? [
              {
                accountnumber: accountNumber,
                jobordertype: jobOrderTypeProps,
                csrreportnumber: csrReportNumber,
                clientname: clientName,
                contact: contact,
                description: description,
                address: address,
                type: jobOrdertype,
                materialsneeded: materialsNeeded,
                networktype: networkType,
                dispatch: dispatch,
                noc: nOC,
                billing: billing,
                action: action,
                employeeincharge: user,
              },
            ]
          : [
              ...updateJobOrder.history,
              {
                accountnumber: accountNumber,
                jobordertype: jobOrderTypeProps,
                csrreportnumber: csrReportNumber,
                clientname: clientName,
                contact: contact,
                description: description,
                address: address,
                type: jobOrdertype,
                materialsneeded: materialsNeeded,
                networktype: networkType,
                dispatch: dispatch,
                noc: nOC,
                billing: billing,
                action: action,
                employeeincharge: user,
              },
            ],
    };

    try {
      //CREATE USER OR UPDATE USER
      const response =
        type === "create"
          ? await createJobOrderDB({ body: body })
          : await updateJobOrderDB({ body: body, _id: updateJobOrder._id });

      if (response) {
        // REALTIME UPDATE
        if (type === "update") {
          console.log(response);
          // OTHER USER IN EMPLOYEE MANAGEMENT EDITING
          toast({
            title: "Update Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            zIndex: 9999, // Set the desired z-index value
          });
          let newAllJobOrders = [...allJobOrders]; // Copying the state array

          const updatedJobOrderIndex = newAllJobOrders.findIndex(
            (el) => el._id === updateJobOrder?._id
          );

          if (updatedJobOrderIndex !== -1) {
            newAllJobOrders[updatedJobOrderIndex] = response.data.newData;
            setAllJobOrders(newAllJobOrders);
          }
          setUpdateJobOrder(null);
        } else {
          // CREATE JOBORDER
          toast({
            title: "Create Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            zIndex: 9999, // Set the desired z-index value
          });
          let newAllJobOrders = [...allJobOrders];
          setAllJobOrders([...newAllJobOrders, response.data.newData]);
          setCreateJobOrder(false);
        }

        //CLEARING
        // setFullName("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleValidate = () => {
    const validate = () => {
      return true;
    };
    if (validate()) {
      JobOrderDB();
    }
  };

  // ADDING MATERIAL
  const addMaterialNeeded = () => {
    if (materialsNeededInput.trim() !== "") {
      setMaterialsNeeded([...materialsNeeded, materialsNeededInput]);

      setMaterialsNeededInput("");
    } else {
      toast({
        title: "Please input an item.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
        zIndex: 9999, // Set the desired z-index value
      });
    }
  };

  const deleteMaterialNeeded = (indexToDelete) => {
    const updatedItems = materialsNeeded.filter(
      (item, index) => index !== indexToDelete
    );
    setMaterialsNeeded(updatedItems);
  };

  return (
    <>
      <Flex
        flexDir="column"
        gap={3}
        bg="gray.200"
        color="black"
        p={5}
        borderRadius={10}
        mt={5}
      >
        {jobOrderTypeProps !== "Field" && (
          <>
            <Flex gap={2}>
              {/* ACC NUMBER */}
              <FormControl>
                <FormLabel>Account Number:</FormLabel>
                <Input
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                  }}
                  value={accountNumber}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>

              {/* CSR REPORT NUMBER */}
              <FormControl>
                <FormLabel>CSR Report Number:</FormLabel>
                <Input
                  onChange={(e) => {
                    setCsrReportNumber(e.target.value);
                  }}
                  value={csrReportNumber}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
            </Flex>

            <Flex gap={2}>
              {/* CLIENT NAME */}
              <FormControl>
                <FormLabel>Client Name:</FormLabel>
                <Input
                  onChange={(e) => {
                    setclientName(e.target.value);
                  }}
                  value={clientName}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>

              {/* CONTACT */}
              <FormControl>
                <FormLabel>Contact:</FormLabel>
                <Input
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  value={contact}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
            </Flex>
          </>
        )}

        <Flex gap={2}>
          {jobOrderTypeProps !== "Field" && (
            <>
              {/* NETWORK TYPE */}
              <FormControl>
                <FormLabel>Network Type:</FormLabel>
                <Select
                  onChange={(e) => setNetworkType(e.target.value)}
                  value={networkType}
                  borderColor="blue.300"
                  borderRadius="md"
                  focusBorderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option color="black" value="wired">
                    WIRED
                  </option>
                  <option color="black" value="wireless">
                    WIRELESS
                  </option>
                  <option color="black" value="other">
                    OTHER
                  </option>
                </Select>
              </FormControl>
            </>
          )}
          {/* ADDRESS */}
          <FormControl>
            <FormLabel>Address:</FormLabel>
            <Input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>

        <Flex gap={2}>
          {/* MATERIALS NEEDED */}
          <Flex flexDir="column" w="50%">
            <FormControl>
              <FormLabel>Materials Needed:</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  value={materialsNeededInput}
                  onChange={(e) => setMaterialsNeededInput(e.target.value)}
                  borderColor="blue.300"
                  _hover={{
                    borderColor: "blue.500",
                  }}
                />
                <InputRightElement w="4.5rem">
                  <Button
                    bg="none"
                    fontSize="16px"
                    onClick={addMaterialNeeded}
                    _hover={{
                      bg: "none",
                    }}
                  >
                    <Text as="p">Add</Text>
                  </Button>

                  {/* <Button h="1.75rem" size="sm" onClick={handleShowPassword}>


                    </Button> */}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Box py={4}>
              <Flex gap={2} overflow="auto" id="scrollbar-container">
                {materialsNeeded.length > 0 &&
                  materialsNeeded?.map((material, index) => {
                    return (
                      <Flex
                        align="center"
                        shrink={0}
                        px={3}
                        py={1}
                        gap={2}
                        my={2}
                        rounded={6}
                        bg="gray.300"
                        key={index}
                        // className="flex my-2 gap-2 bg-slate-400 rounded-xl px-3 py-1 justify-between items-center shrink-0 "
                      >
                        <Text as="p">{material}</Text>
                        <Flex
                          fontSize={20}
                          color="red.500"
                          _hover={{
                            color: "red.400",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteMaterialNeeded(index)}
                        >
                          <IoMdClose />
                        </Flex>
                      </Flex>
                    );
                  })}
              </Flex>
            </Box>
          </Flex>

          {/* TYPE */}
          <FormControl w="50%">
            <FormLabel>Type:</FormLabel>
            <Select
              onChange={(e) => setJobOrdertype(e.target.value)}
              value={jobOrdertype}
              borderColor="blue.300"
              borderRadius="md"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            >
              <option value="" disabled>
                Please Select
              </option>
              <option color="black" value="survey">
                Survey
              </option>
              <option color="black" value="installation">
                Installation
              </option>
              <option color="black" value="splicing">
                Splicing
              </option>
              <option color="black" value="activation">
                Activation
              </option>
              <option color="black" value="repair/maintenance">
                Repair/Maintenance
              </option>
              <option color="black" value="other">
                Other
              </option>
            </Select>
          </FormControl>
        </Flex>

        {/* DESCRIPTION */}
        {/* <FormControl>
            <FormLabel>Description:</FormLabel>
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl> */}

        <Box>
          <FormLabel htmlFor="remarks" fontWeight="bold" mb={2}>
            Description:
          </FormLabel>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            _hover={{
              borderColor: "blue.500",
            }}
            size="lg"
            resize="none"
            placeholder="Enter your remarks here..."
            borderColor="blue.300"
            borderRadius="md"
          />
        </Box>
        <Flex gap={2}>
          {/* Dispatch */}
          <FormControl>
            <FormLabel>CSR/Dispatch Remarks:</FormLabel>
            <Input
              value={dispatch?.remarks ? dispatch?.remarks : ""}
              onChange={(e) => {
                setDispatch({
                  employeeincharge: user,
                  remarks: e.target.value,
                  status: "approved",
                });
              }}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>
        {type === "update" && (
          <>
            <Flex gap={2}>
              {/*  */}
              <FormControl>
                <FormLabel>NOC Remarks:</FormLabel>
                <Input
                  onChange={(e) => {
                    setNOC({ ...nOC, remarks: e.target.value });
                  }}
                  value={nOC?.remarks ? nOC?.remarks : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) =>
                    setNOC({
                      ...nOC,
                      status: e.target.value,
                      employeeincharge: user,
                    })
                  }
                  value={nOC?.status ? nOC?.status : ""}
                  borderColor="blue.300"
                  borderRadius="md"
                  focusBorderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option color="black" value="approved">
                    Approved
                  </option>
                  <option color="black" value="cancelled">
                    Cancelled
                  </option>
                  <option color="black" value="pending">
                    Pending
                  </option>
                </Select>
              </FormControl>
            </Flex>
            <Flex gap={2}>
              {/* BILLING */}
              <FormControl>
                <FormLabel>Billing Remarks:</FormLabel>
                <Input
                  onChange={(e) => {
                    setBilling({ ...billing, remarks: e.target.value });
                  }}
                  value={billing?.remarks ? billing?.remarks : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) =>
                    setBilling({
                      ...billing,
                      status: e.target.value,
                      employeeincharge: user,
                    })
                  }
                  value={billing?.status ? billing?.status : ""}
                  borderColor="blue.300"
                  borderRadius="md"
                  focusBorderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option color="black" value="approved">
                    Approved
                  </option>
                  <option color="black" value="cancelled">
                    Cancelled
                  </option>
                  <option color="black" value="pending">
                    Pending
                  </option>
                </Select>
              </FormControl>
            </Flex>
            <Flex gap={2}>
              {/* BILLING */}
              <FormControl>
                <FormLabel>Actions Remarks:</FormLabel>
                <Input
                  onChange={(e) => {
                    setAction({ ...action, remarks: e.target.value });
                  }}
                  value={action?.remarks ? action?.remarks : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) =>
                    setAction({
                      ...action,
                      status: e.target.value,
                      employeeincharge: user,
                    })
                  }
                  value={action?.status ? action?.status : ""}
                  borderColor="blue.300"
                  borderRadius="md"
                  focusBorderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option color="black" value="approved">
                    Approved
                  </option>
                  <option color="black" value="cancelled">
                    Cancelled
                  </option>
                  <option color="black" value="pending">
                    Pending
                  </option>
                </Select>
              </FormControl>
            </Flex>
          </>
        )}

        <Flex justifyContent="flex-end" alignItems="flex-end">
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
            color="black"
            onClick={handleValidate}
            _hover={{
              borderColor: "blue.300",
              boxShadow: "xl",
              color: "blue.500",
            }}
          >
            <Flex align="center" gap={2}>
              {type === "create" ? "Generate Job Order" : "Update Job Order"}
              <FaCheck />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
