import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "../../../../../index.css";
// import {
//   createJobOrderDB,
//   updateJobOrderDB,
// } from "../../../../Api/JobOrderApi";
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
import { createClientDB, updateClientDB } from "../../../../Api/ClientsApi";

export const ClientForm = ({
  setCreateClient,
  allClients,
  setAllClients,
  setUpdateClient,
  updateClient,
}) => {
  //   FORM STATES
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [mbps, setMbps] = useState("");
  const [microbizPlan, setMicrobizPlan] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [monthlyPlan, setMonthlyPlan] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [agent, setAgent] = useState("");
  const [remitDate, setRemitDate] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [otc, setOtc] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState({});
  const [dispatch, setDispatch] = useState(null);
  const [noc, setNoc] = useState(null);
  const [billing, setBilling] = useState(null);
  const [action, setAction] = useState(null);
  const [iPAddress, setIPAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [installedDate, setInstalledDate] = useState("");
  const [dateActivated, setDateActivated] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [status, setStatus] = useState("");
  const user = localStorage.getItem("user");
  const [type, setType] = useState("create");
  const toast = useToast();

  useEffect(() => {
    if (updateClient !== null) {
      setType("update");
      console.log(materialsNeeded);
      setFullName(updateClient?.fullname ? updateClient?.fullname : "");
      setContactNumber(
        updateClient?.contactnumber ? updateClient?.contactnumber : ""
      );
      setEmail(updateClient?.email ? updateClient?.email : "");
      setAddress(updateClient?.address ? updateClient?.address : "");
      setArea(updateClient?.area ? updateClient?.area : "");
      setMbps(updateClient?.mbps ? updateClient?.mbps : "");
      setMicrobizPlan(
        updateClient?.microbizplan ? updateClient?.microbizplan : ""
      );
      setNetworkType(updateClient?.type ? updateClient?.type : "");
      setMonthlyPlan(
        updateClient?.monthlyplan ? updateClient?.monthlyplan : ""
      );
      setReferenceNumber(
        updateClient?.referencenumber ? updateClient?.referencenumber : ""
      );
      setAgent(updateClient?.agent ? updateClient?.agent : "");
      setRemitDate(updateClient?.remitdate ? updateClient?.remitdate : "");
      setModeOfPayment(
        updateClient?.modeofpayment ? updateClient?.modeofpayment : ""
      );
      setOtc(updateClient?.otc ? updateClient?.otc : "");
      setMaterialsNeeded(
        updateClient?.materialsneeded ? updateClient?.materialsneeded : {}
      );
      setDispatch(updateClient?.dispatch ? updateClient?.dispatch : null);
      setNoc(updateClient?.noc ? updateClient?.noc : null);
      setBilling(updateClient?.billing ? updateClient?.billing : null);
      setAction(updateClient?.action ? updateClient?.action : null);
      setIPAddress(updateClient?.ipaddress ? updateClient?.ipaddress : "");
      setMacAddress(updateClient?.macaddress ? updateClient?.macaddress : "");
      setInstalledDate(
        updateClient?.installeddate ? updateClient?.installeddate : ""
      );
      setDateActivated(
        updateClient?.dateactivated ? updateClient?.dateactivated : ""
      );
      setStatusUpdate(
        updateClient?.statusupdate ? updateClient?.statusupdate : ""
      );
      setStatus(updateClient?.status ? updateClient?.status : "");
    } else {
      setType("create");
      setAgent(user);
    }
  }, [updateClient]);

  //   CREATE/UPDATE USERACCOUNTS DATABASE
  const clientDB = async () => {
    const body = {
      fullname: fullName,
      contactnumber: contactNumber,
      email: email,
      address: address,
      area: area,
      mbps: mbps,
      microbizplan: microbizPlan,
      type: networkType,
      monthlyplan: monthlyPlan,
      referencenumber: referenceNumber,
      agent: agent,
      remitdate: remitDate,
      modeofpayment: modeOfPayment,
      otc: otc,
      status:
        statusUpdate !== "activated"
          ? statusUpdate !== "pulledout"
            ? "Pending"
            : status
          : status,
      materialsneeded: materialsNeeded,
      dispatch: dispatch,
      noc: noc,
      billing: billing,
      action: action,
      ipaddress: iPAddress,
      macaddress: macAddress,
      installeddate: installedDate,
      dateactivated: dateActivated,
      statusupdate: statusUpdate,
      history:
        type === "create"
          ? [
              {
                fullname: fullName,
                contactnumber: contactNumber,
                email: email,
                address: address,
                area: area,
                mbps: mbps,
                microbizplan: microbizPlan,
                type: networkType,
                monthlyplan: monthlyPlan,
                referencenumber: referenceNumber,
                agent: agent,
                remitdate: remitDate,
                modeofpayment: modeOfPayment,
                otc: otc,
                status:
                  statusUpdate !== "activated"
                    ? statusUpdate !== "pulledout"
                      ? "Pending"
                      : status
                    : status,
                materialsneeded: materialsNeeded,
                dispatch: dispatch,
                noc: noc,
                billing: billing,
                action: action,
                ipaddress: iPAddress,
                macaddress: macAddress,
                installeddate: installedDate,
                dateactivated: dateActivated,
                statusupdate: statusUpdate,
                lastupdate: user,
              },
            ]
          : [
              ...updateClient?.history,
              {
                fullname: fullName,
                contactnumber: contactNumber,
                email: email,
                address: address,
                area: area,
                mbps: mbps,
                microbizplan: microbizPlan,
                type: networkType,
                monthlyplan: monthlyPlan,
                referencenumber: referenceNumber,
                agent: agent,
                remitdate: remitDate,
                modeofpayment: modeOfPayment,
                otc: otc,
                status:
                  statusUpdate !== "activated"
                    ? statusUpdate !== "pulledout"
                      ? "Pending"
                      : status
                    : status,
                materialsneeded: materialsNeeded,
                dispatch: dispatch,
                noc: noc,
                billing: billing,
                action: action,
                ipaddress: iPAddress,
                macaddress: macAddress,
                installeddate: installedDate,
                dateactivated: dateActivated,
                statusupdate: statusUpdate,
                lastupdate: user,
              },
            ],
    };

    try {
      //CREATE USER OR UPDATE USER
      const response =
        type === "create"
          ? await createClientDB({ body: body })
          : await updateClientDB({ body: body, _id: updateClient._id });

      if (response) {
        // REALTIME UPDATE
        if (type === "update") {
          // OTHER USER IN EMPLOYEE MANAGEMENT EDITING
          toast({
            title: "Update Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            zIndex: 9999, // Set the desired z-index value
          });
          let newAllClients = [...allClients]; // Copying the state array

          const updatedClientIndex = newAllClients.findIndex(
            (el) => el._id === updateClient?._id
          );

          if (updatedClientIndex !== -1) {
            newAllClients[updatedClientIndex] = response.data.newData;
            setAllClients(newAllClients);
          }
          setUpdateClient(null);
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
          let newAllClients = [...allClients];
          setAllClients([...newAllClients, response.data.newData]);
          setCreateClient(false);
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
      clientDB();
    }
  };

  // ADDING MATERIAL
  const [materialsNeededInput, setMaterialsNeededInput] = useState("");
  const [materialsNeededQuantity, setMaterialsNeededQuantity] = useState(0);
  const [materialsNeededPrice, setMaterialsNeededPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [materialsTotalPrice, setMaterialsTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(materialsNeededPrice * materialsNeededQuantity);
    setMaterialsTotalPrice(
      materialsNeededPrice * materialsNeededQuantity + materialsTotalPrice
    );
  }, [materialsNeededPrice, materialsNeededQuantity]);
  const addMaterialNeeded = () => {
    let newMaterialsNeeded;
    if (materialsNeededInput.trim() !== "") {
      if (materialsNeeded.materials) {
        newMaterialsNeeded = { ...materialsNeeded };
      } else {
        newMaterialsNeeded = { materials: [], total: 0 };
      }

      newMaterialsNeeded.materials = [
        ...newMaterialsNeeded.materials,
        {
          material: materialsNeededInput,
          quantity: materialsNeededQuantity,
          price: materialsNeededPrice,
          total: totalPrice,
        },
      ];
      newMaterialsNeeded.total = newMaterialsNeeded.total + totalPrice;

      setMaterialsNeeded(newMaterialsNeeded);
      setMaterialsTotalPrice(newMaterialsNeeded.total);

      setMaterialsNeededQuantity(0);
      setMaterialsNeededPrice(0);
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
      >
        <h2 className="text-center text-3xl mt-8 font-semibold">Billing</h2>
        <Flex gap={2}>
          {/* CLIENT NAME */}
          <FormControl>
            <FormLabel>Client Name:</FormLabel>
            <Input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail:</FormLabel>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>
        <Flex gap={2}>
          {/* CONTACT */}
          <FormControl>
            <FormLabel>Contact:</FormLabel>
            <Input
              onChange={(e) => {
                setContactNumber(
                  e.target.value !== ""
                    ? e.target.value.match(/[0-9]/g)
                      ? e.target.value.match(/[0-9]/g).length === 1
                        ? e.target.value.match(/[0-9]/g)[0]
                        : e.target.value.match(/[0-9]/g).join("")
                      : ""
                    : ""
                );
              }}
              value={contactNumber}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Area:</FormLabel>
            <Input
              onChange={(e) => {
                setArea(e.target.value);
              }}
              value={area}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>

        <Flex gap={2}>
          <FormControl>
            <FormLabel>Monthly Plan:</FormLabel>
            <Input
              onChange={(e) => {
                setMonthlyPlan(
                  e.target.value !== ""
                    ? e.target.value.match(/[0-9]/g)
                      ? e.target.value.match(/[0-9]/g).length === 1
                        ? e.target.value.match(/[0-9]/g)[0]
                        : e.target.value.match(/[0-9]/g).join("")
                      : ""
                    : ""
                );
              }}
              value={monthlyPlan}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>

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
              <option color="black" value="Wired">
                WIRED
              </option>
              <option color="black" value="Wireless">
                WIRELESS
              </option>
              <option color="black" value="other">
                OTHER
              </option>
            </Select>
          </FormControl>
        </Flex>

        <Flex gap={2}>
          {/* TYPE */}
          <FormControl w="50%">
            <FormLabel>MicroBiz Plan:</FormLabel>
            <Select
              onChange={(e) => setMicrobizPlan(e.target.value)}
              value={microbizPlan}
              borderColor="blue.300"
              borderRadius="md"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            >
              <option value="" disabled>
                Please Select
              </option>
              <option color="black" value="NOT">
                NOT
              </option>
              <option color="black" value="MICROBIZ">
                MICROBIZ
              </option>
            </Select>
          </FormControl>
          {/* status */}
          {(type !== "create" || statusUpdate === "activated") && (
            <FormControl w="50%">
              <FormLabel>Status:</FormLabel>
              <Select
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (e.target.value === "Pulled Out") {
                    setStatusUpdate("pulledout");
                  }
                }}
                value={status}
                borderColor="blue.300"
                borderRadius="md"
                focusBorderColor="blue.300"
                _hover={{ borderColor: "blue.500" }}
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option color="black" value="Activated">
                  Activated
                </option>
                <option color="black" value="Available">
                  Available
                </option>
                <option color="black" value="FP - Non Payment">
                  FP - Non Payment
                </option>
                <option color="black" value="FP - Termination Requested">
                  FP - Termination Requested
                </option>
                <option color="black" value="Pulled Out">
                  Pulled Out
                </option>
                <option color="black" value="Temporary Disconnected">
                  Temporary Disconnected
                </option>
                <option color="black" value="To Pull Out">
                  To Pull Out
                </option>
              </Select>
            </FormControl>
          )}
        </Flex>
        <Flex gap={2}>
          {/* MBPS */}
          <FormControl w="50%">
            <FormLabel>MBPS Plan:</FormLabel>
            <Input
              onChange={(e) => {
                setMbps(
                  e.target.value !== ""
                    ? e.target.value.match(/[0-9]/g)
                      ? e.target.value.match(/[0-9]/g).length === 1
                        ? e.target.value.match(/[0-9]/g)[0]
                        : e.target.value.match(/[0-9]/g).join("")
                      : ""
                    : ""
                );
              }}
              value={mbps}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          <FormControl w="50%">
            <FormLabel>Agent:</FormLabel>
            <Text>{agent ? agent : "Null"}</Text>
          </FormControl>
          {/* AREA */}
        </Flex>
        <Flex gap={2}>
          {/* MBPS */}
          <FormControl w="50%">
            <FormLabel>Mode of Payment:</FormLabel>
            <Input
              onChange={(e) => {
                setModeOfPayment(e.target.value);
              }}
              value={modeOfPayment}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          <FormControl w="50%">
            <FormLabel>Reference No.:</FormLabel>
            <Input
              onChange={(e) => {
                setReferenceNumber(
                  e.target.value !== ""
                    ? e.target.value.match(/[0-9]/g)
                      ? e.target.value.match(/[0-9]/g).length === 1
                        ? e.target.value.match(/[0-9]/g)[0]
                        : e.target.value.match(/[0-9]/g).join("")
                      : ""
                    : ""
                );
              }}
              value={referenceNumber}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          {/* AREA */}
        </Flex>
        <Flex gap={2}>
          {/* MBPS */}
          <FormControl w="50%">
            <FormLabel>Remit Date:</FormLabel>
            <Input
              onChange={(e) => {
                setRemitDate(e.target.value);
              }}
              value={remitDate}
              type="date"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          <FormControl w="50%">
            <FormLabel>Over the Counter:</FormLabel>
            <Input
              onChange={(e) => {
                setOtc(
                  e.target.value !== ""
                    ? e.target.value.match(/[0-9]/g)
                      ? e.target.value.match(/[0-9]/g).length === 1
                        ? e.target.value.match(/[0-9]/g)[0]
                        : e.target.value.match(/[0-9]/g).join("")
                      : ""
                    : ""
                );
              }}
              value={otc}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          {/* AREA */}
        </Flex>

        {/* Address */}
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
        {type === "update" && (
          <>
            <h2 className="text-center text-3xl mt-8 font-semibold">
              CSR/Dispatch
            </h2>

            {/* MATERIALS NEEDED */}
            <Text>Materials Needed:</Text>

            <Flex alignItems="center" gap={2}>
              <FormControl>
                <FormLabel>Material:</FormLabel>
                <Input
                  type="text"
                  value={materialsNeededInput}
                  onChange={(e) => setMaterialsNeededInput(e.target.value)}
                  borderColor="blue.300"
                  _hover={{
                    borderColor: "blue.500",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price/Material:</FormLabel>
                <Input
                  type="text"
                  value={materialsNeededPrice}
                  onChange={(e) => setMaterialsNeededPrice(e.target.value)}
                  borderColor="blue.300"
                  _hover={{
                    borderColor: "blue.500",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity:</FormLabel>
                <Input
                  type="text"
                  value={materialsNeededQuantity}
                  onChange={(e) => setMaterialsNeededQuantity(e.target.value)}
                  borderColor="blue.300"
                  _hover={{
                    borderColor: "blue.500",
                  }}
                />
              </FormControl>
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
            </Flex>
            <Box py={4}>
              <Flex
                gap={1}
                flexDirection="column"
                overflow="auto"
                id="scrollbar-container"
              >
                {" "}
                <Flex
                  align="center"
                  w="100%"
                  justify="space-between"
                  shrink={0}
                  px={3}
                  py={1}
                  gap={2}
                  rounded={6}
                  fontWeight="semibold"
                  bg="blue.300"
                  // className="flex my-2 gap-2 bg-slate-400 rounded-xl px-3 py-1 justify-between items-center shrink-0 "
                >
                  <Text w="30%" as="p">
                    Material
                  </Text>
                  <Text w="20%" as="p">
                    Quantity
                  </Text>
                  <Text w="20%" as="p">
                    Price
                  </Text>
                  <Text w="25%" as="p">
                    Total
                  </Text>
                  <Text w="5%">Delete</Text>
                </Flex>
                {materialsNeeded?.materials?.length > 0 &&
                  materialsNeeded?.materials?.map((material, index) => {
                    return (
                      <Flex
                        align="center"
                        w="100%"
                        justify="space-around"
                        shrink={0}
                        px={3}
                        py={1}
                        gap={2}
                        rounded={6}
                        bg="gray.300"
                        key={index}
                        // className="flex my-2 gap-2 bg-slate-400 rounded-xl px-3 py-1 justify-between items-center shrink-0 "
                      >
                        <Text w="30%" as="p">
                          {material.material}
                        </Text>
                        <Text w="20%" as="p">
                          {material.quantity}
                        </Text>
                        <Text w="20%" as="p">
                          {material.price}
                        </Text>
                        <Text w="25%" as="p">
                          {material.total}
                        </Text>
                        <Flex
                          w="5%"
                          fontSize={20}
                          color="red.500"
                          _hover={{
                            color: "red.400",
                            cursor: "pointer",
                          }}
                          justify="end"
                          onClick={() => deleteMaterialNeeded(index)}
                        >
                          <IoMdClose />
                        </Flex>
                      </Flex>
                    );
                  })}
                <Flex
                  gap={1}
                  flexDirection="column"
                  overflow="auto"
                  id="scrollbar-container"
                  fontSize="24px"
                >
                  {" "}
                  <Flex
                    align="center"
                    w="100%"
                    justify="space-between"
                    shrink={0}
                    px={3}
                    py={1}
                    gap={2}
                    rounded={6}
                    fontWeight="semibold"
                    bg="blue.300"
                    // className="flex my-2 gap-2 bg-slate-400 rounded-xl px-3 py-1 justify-between items-center shrink-0 "
                  >
                    <Text w="30%" as="p"></Text>
                    <Text w="20%" as="p"></Text>
                    <Text w="20%" as="p"></Text>
                    <Text w="25%" as="p">
                      Overall Total:
                    </Text>
                    <Text w="5%">
                      {materialsNeeded?.total ? materialsNeeded?.total : 0}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>

            <Flex gap={2}>
              {/* Dispatch */}
              <FormControl>
                <FormLabel>CSR/Dispatch Remarks:</FormLabel>
                <Input
                  value={dispatch?.remarks ? dispatch?.remarks : ""}
                  onChange={(e) => {
                    setDispatch({
                      ...dispatch,
                      employeeincharge: user,
                      remarks: e.target.value,
                    });
                  }}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) =>
                    setDispatch({
                      ...dispatch,
                      status: e.target.value,
                      employeeincharge: user,
                    })
                  }
                  value={dispatch?.status ? dispatch?.status : ""}
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
              {/*  */}
              <FormControl>
                <FormLabel>NOC Remarks:</FormLabel>
                <Input
                  onChange={(e) => {
                    setNoc({ ...noc, remarks: e.target.value });
                  }}
                  value={noc?.remarks ? noc?.remarks : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) =>
                    setNoc({
                      ...noc,
                      status: e.target.value,
                      employeeincharge: user,
                    })
                  }
                  value={noc?.status ? noc?.status : ""}
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
            <h3 className="text-right text-xl font-semibold">
              Generate Dispatch Form Button
            </h3>
            <Flex gap={2}>
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
            <h2 className="text-center text-3xl mt-8 font-semibold">
              NOC Activation
            </h2>
            <Flex gap={2}>
              {/* ACC NUMBER */}
              <FormControl>
                <FormLabel>IP Address:</FormLabel>
                <Input
                  onChange={(e) => {
                    setIPAddress(e.target.value);
                  }}
                  value={iPAddress}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mac Address:</FormLabel>
                <Input
                  onChange={(e) => {
                    setMacAddress(e.target.value);
                  }}
                  value={macAddress}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
            </Flex>
            <Flex gap={2}>
              <FormControl w="30%">
                <FormLabel>Status:</FormLabel>
                <Select
                  onChange={(e) => {
                    setStatusUpdate(e.target.value);
                    if (e.target.value === "activated") {
                      setStatus("Activated");
                    }
                  }}
                  value={statusUpdate ? statusUpdate : ""}
                  borderColor="blue.300"
                  borderRadius="md"
                  focusBorderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option color="black" value="activated">
                    Activated
                  </option>
                  <option color="black" value="cancelled">
                    Cancelled
                  </option>
                  <option color="black" value="pending">
                    Pending
                  </option>
                  <option color="black" value="pulledout">
                    Pulled Out
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
              {type === "create" ? "Generate Client" : "Update Client"}
              <FaCheck />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
