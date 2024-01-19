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
}) => {
  //   FORM STATES
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
  const [natureJobOrder, setNatureJobOrder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [jobOrdertype, setJobOrdertype] = useState("");
  const [csrReportNumber, setCsrReportNumber] = useState("");
  const [clientName, setclientName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeededInput, setMaterialsNeededInput] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const [csr, setCsr] = useState(null);
  const [dispatch, setDispatch] = useState(null);
  const [nOC, setNOC] = useState(null);
  const [billing, setBilling] = useState(null);
  const [action, setAction] = useState(null);
  const [iPAddress, setIPAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");

  const [statusUpdate, setStatusUpdate] = useState("");
  const [status, setStatus] = useState("");
  const [receiver, setReceiver] = useState("");
  const [cleared, setCleared] = useState([]);

  const user = localStorage.getItem("user");
  const [type, setType] = useState("create");
  const toast = useToast();
  useEffect(() => {
    if (updateJobOrder !== null) {
      console.log(updateJobOrder);
      setType("update");
      setNatureJobOrder(
        updateJobOrder?.naturejoborder ? updateJobOrder?.naturejoborder : ""
      );
      setAccountNumber(
        updateJobOrder?.accountnumber ? updateJobOrder?.accountnumber : ""
      );
      setCsrReportNumber(
        updateJobOrder?.csrreportnumber ? updateJobOrder?.csrreportnumber : ""
      );
      setclientName(updateJobOrder?.fullname ? updateJobOrder?.fullname : "");
      setEmail(updateJobOrder?.email ? updateJobOrder?.email : "");
      setContact(
        updateJobOrder?.contactnumber ? updateJobOrder?.contactnumber : ""
      );
      setArea(updateJobOrder?.area ? updateJobOrder?.area : "");
      setMonthlyPlan(
        updateJobOrder?.monthlyplan ? updateJobOrder?.monthlyplan : ""
      );
      setMicrobizPlan(
        updateJobOrder?.microbizplan ? updateJobOrder?.microbizplan : ""
      );
      setStatus(updateJobOrder?.status ? updateJobOrder?.status : "");
      setMbps(updateJobOrder?.mbps ? updateJobOrder?.mbps : "");
      setAgent(updateJobOrder?.agent ? updateJobOrder?.agent : "");
      setModeOfPayment(
        updateJobOrder?.modeofpayment ? updateJobOrder?.modeofpayment : ""
      );
      setReferenceNumber(
        updateJobOrder?.referencenumber ? updateJobOrder?.referencenumber : ""
      );
      setRemitDate(updateJobOrder?.remitdate ? updateJobOrder?.remitdate : "");
      setOtc(updateJobOrder?.otc ? updateJobOrder?.otc : "");

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

      // JO
      setCsr(updateJobOrder?.csr ? updateJobOrder?.csr : null);
      setDispatch(updateJobOrder?.dispatch ? updateJobOrder?.dispatch : null);
      setNOC(updateJobOrder?.noc ? updateJobOrder?.noc : null);
      setBilling(updateJobOrder?.billing ? updateJobOrder?.billing : null);
      setAction(updateJobOrder?.action ? updateJobOrder?.action : null);
      // ACTIVATION NOC
      setIPAddress(updateJobOrder?.ipaddress ? updateJobOrder?.ipaddress : "");
      setMacAddress(
        updateJobOrder?.macaddress ? updateJobOrder?.macaddress : ""
      );
      setStatusUpdate(
        updateJobOrder?.statusupdate ? updateJobOrder?.statusupdate : ""
      );
    } else {
      setType("create");
      setStatus("Pending");
      setAgent(user);
    }
  }, [updateJobOrder]);

  //   CREATE/UPDATE USERACCOUNTS DATABASE
  const JobOrderDB = async () => {
    const body = {
      naturejoborder: natureJobOrder,
      accountnumber: accountNumber,
      fullname: clientName,
      contactnumber: contact,
      email: email,
      address: address,
      area: area,
      mbps: mbps,
      microbizplan: microbizPlan,
      type: jobOrdertype,
      networktype: networkType,
      monthlyplan: monthlyPlan,
      status: status,
      referencenumber: referenceNumber,
      agent: agent,
      remitdate: remitDate,
      modeofpayment: modeOfPayment,
      otc: otc,
      csrreportnumber: csrReportNumber,
      materialsneeded: materialsNeeded,
      csr: csr,
      dispatch: dispatch,
      noc: nOC,
      billing: billing,
      action: action,
      description: description,
      ipaddress: iPAddress,
      macaddress: macAddress,
      statusupdate: statusUpdate,
      receiver: receiver,
      history:
        type === "create"
          ? [
              {
                naturejoborder: natureJobOrder,
                accountnumber: accountNumber,
                fullname: clientName,
                contactnumber: contact,
                email: email,
                address: address,
                area: area,
                mbps: mbps,
                microbizplan: microbizPlan,
                type: jobOrdertype,
                networktype: networkType,
                monthlyplan: monthlyPlan,
                status: status,
                referencenumber: referenceNumber,
                agent: agent,
                remitdate: remitDate,
                modeofpayment: modeOfPayment,
                otc: otc,
                csrreportnumber: csrReportNumber,
                materialsneeded: materialsNeeded,
                csr: csr,
                dispatch: dispatch,
                noc: nOC,
                billing: billing,
                action: action,
                description: description,
                ipaddress: iPAddress,
                macaddress: macAddress,
                statusupdate: statusUpdate,
                receiver: receiver,
                employeeincharge: user,
              },
            ]
          : [
              ...updateJobOrder.history,
              {
                naturejoborder: natureJobOrder,
                accountnumber: accountNumber,
                fullname: clientName,
                contactnumber: contact,
                email: email,
                address: address,
                area: area,
                mbps: mbps,
                microbizplan: microbizPlan,
                type: jobOrdertype,
                networktype: networkType,
                monthlyplan: monthlyPlan,
                status: status,
                referencenumber: referenceNumber,
                agent: agent,
                remitdate: remitDate,
                modeofpayment: modeOfPayment,
                otc: otc,
                csrreportnumber: csrReportNumber,
                materialsneeded: materialsNeeded,
                csr: csr,
                dispatch: dispatch,
                noc: nOC,
                billing: billing,
                action: action,
                description: description,
                ipaddress: iPAddress,
                macaddress: macAddress,
                statusupdate: statusUpdate,
                receiver: receiver,
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
      if (receiver && natureJobOrder) {
        return true;
      } else {
        toast({
          title: "Please complete necessary inputs",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
          zIndex: 9999, // Set the desired z-index value
        });
      }
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
      <Flex gap={3} bg="gray.200" color="black" p={5} borderRadius={10} mt={5}>
        {" "}
        {/* JOBORDER NATURE */}
        <FormControl w={{base: "50%", sm:"50%", md: "40%" ,lg: "30%"}}>
          <FormLabel>Job Order Nature:</FormLabel>
          <Select
            onChange={(e) => {
              setNatureJobOrder(e.target.value);
              console.log(e.target.value);
            }}
            value={natureJobOrder}
            borderColor="blue.300"
            borderRadius="md"
            focusBorderColor="blue.300"
            _hover={{ borderColor: "blue.500" }}
          >
            <option value="" disabled>
              Please Select
            </option>
            <option value="clienttrouble">Client Trouble</option>
            <option value="application">Client Application</option>
            <option value="field">Field</option>
          </Select>
        </FormControl>
      </Flex>

      {natureJobOrder !== "" && (
        <Flex
        flexDir="column"
        gap={3}
        bg="gray.200"
        color="black"
        p={5}
        borderRadius={10}
        mt={5}
      >
        <>
        
          {/* CLIENT APPLICATION */}
          {natureJobOrder === "application" && (
            <>
              <Flex flexDir={{base:"column", md: "row"}} flexWrap="wrap" gap={2}>
                {/* CLIENT NAME */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* EMAIL/FACEBOOK/MESSENGER */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
                  <FormLabel>E-mail/Facebook/Messenger:</FormLabel>
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

                {/* CONTACT */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
                  <FormLabel>Contact:</FormLabel>
                  <Input
                    onChange={(e) => {
                      setContact(
                        e.target.value !== ""
                          ? e.target.value.match(/[0-9]/g)
                            ? e.target.value.match(/[0-9]/g).length === 1
                              ? e.target.value.match(/[0-9]/g)[0]
                              : e.target.value.match(/[0-9]/g).join("")
                            : ""
                          : ""
                      );
                    }}
                    value={contact}
                    type="text"
                    borderColor="blue.300"
                    _hover={{ borderColor: "blue.500" }}
                  />
                </FormControl>

                {/* AREA */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* MONTHLY PLAN */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* TYPE */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
                  <FormLabel>Status:</FormLabel>
                  <Select
                    onChange={(e) => {
                      setStatus(e.target.value);
                      if (e.target.value === "Cancelled") {
                        setStatusUpdate("cancelled");
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
                    <option color="black" value="Pending">
                      Pending
                    </option>
                    <option color="black" value="Activated">
                      Activated
                    </option>
                    <option color="black" value="Cancelled">
                      Cancelled
                    </option>
                  </Select>
                </FormControl>

                {/* MBPS */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* MODE OF PAYMENT */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* REFERENCE NO. */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
                  <FormLabel>Reference No.:</FormLabel>
                  <Input
                    onChange={(e) => {
                      setReferenceNumber(e.target.value);
                    }}
                    value={referenceNumber}
                    type="text"
                    borderColor="blue.300"
                    _hover={{ borderColor: "blue.500" }}
                  />
                </FormControl>

                {/* AGENT */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
                    <FormLabel>Agent:</FormLabel>
                    
                      <Text pt={2}>{agent ? agent : user}</Text>
                  </FormControl>

                  {/* REMIT DATE */}
                <FormControl w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* OVER THE COUNTER */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* TYPE */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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

                {/* MATERIALS NEEDED */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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
                
                {/* ADDRESS */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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
            </>
          )}

          

          {/* CLIENT TROUBLE */}
          {natureJobOrder === "clienttrouble" && (
            <Flex flexDir={{base:"column", md: "row"}} flexWrap="wrap" justify={{md: "space-around"}}>
              {/* <Flex flexDir={{base:"column",md: "row", lg:"row"}} gap={2}>

                
              </Flex> */}

                {/* ACC NUMBER */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%" ,lg: "32%"}}>
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
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%", lg: "32%"}}>
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

                {/* CLIENT NAME */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%",  lg: "32%"}}>
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
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%",  lg: "32%"}}>
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

                {/* NETWORK TYPE */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%",  lg: "32%"}}>
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

                  

                  {/* TYPE */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%",  lg: "32%"}}>
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

              <Flex gap={2}>
                

                
              </Flex>

              {/* MATERIALS NEEDED */}
              <Flex flexDir="column" w={{base: "100%", sm:"100%", md: "49%",  lg: "49%"}}>
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

                {/* ADDRESS */}
                <FormControl pb={{base: "5", sm:"3", md: "3" ,lg: "2"}} w={{base: "100%", sm:"100%", md: "49%",  lg: "49%"}}>
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
          )}
        </>

        

       
        
        {/* OVERVIEW DESCRIPTION */}
        <Box>
          <FormLabel htmlFor="remarks" fontWeight="bold" mb={2}>
            Overview Description:
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

        {/* CSR DESCRIPTION */}
        <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
          {/* Dispatch */}
          <FormControl>
            <FormLabel>CSR Description:</FormLabel>
            <Input
              value={csr?.remarks ? csr?.remarks : ""}
              onChange={(e) => {
                setCsr({
                  employeeincharge: user,
                  remarks: e.target.value,
                });
              }}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>

          {/* STATUS FOR CSR */}
          <FormControl pb={{base:"5", lg:"0"}} w={{base:"50%", lg:"30%"}}>
            <FormLabel>Status:</FormLabel>
            <Select
              onChange={(e) =>
                setCsr({
                  ...csr,
                  status: e.target.value,
                  employeeincharge: user,
                })
              }
              value={csr?.status ? csr?.status : ""}
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
        <>
          {/* NOC DESCRIPTION */}
          <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
            {/*  */}
            <FormControl>
              <FormLabel>NOC Description:</FormLabel>
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
            {/* STATUS FOR NOC */}
            <FormControl pb={{base:"5", lg:"0"}} w={{base:"50%", lg:"30%"}}>
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

          {/* BILLING DESCRIPTION */}
          <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
            {/* BILLING */}
            <FormControl>
              <FormLabel>Billing Description:</FormLabel>
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
            <FormControl pb={{base:"5", lg:"0"}} w={{base:"50%", lg:"30%"}}>
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

          {/* DISPATCH DESCRIPTION */}
          <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
            {/* Dispatch */}
            <FormControl>
              <FormLabel>Dispatch Description:</FormLabel>
              <Input
                value={dispatch?.remarks ? dispatch?.remarks : ""}
                onChange={(e) => {
                  setDispatch({
                    employeeincharge: user,
                    remarks: e.target.value,
                  });
                }}
                type="text"
                borderColor="blue.300"
                _hover={{ borderColor: "blue.500" }}
              />
            </FormControl>

            {/* STATUS FOR DISPATCH */}
            <FormControl pb={{base:"5", lg:"0"}} w={{base:"50%", lg:"30%"}}>
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

          {/* ACTION DESCRIPTION */}
          <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
            {/* ACTION DESCRIPTION */}
            <FormControl>
              <FormLabel>Actions Description:</FormLabel>
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
            <FormControl pb={{base:"5", lg:"0"}} w={{base:"50%", lg:"30%"}}>
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

          {/* CLIENT APPLICATION */}
          {natureJobOrder === "application" && (
            <>
              <h2 className="text-center text-3xl mt-8 font-semibold">
                NOC Activation
              </h2>
              <Flex flexDir={{base:"column", lg:"row"}} gap={2}>
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
                <FormControl w={{base:"50%", lg:"30%"}}>
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
          
          {/* FORWARDED TO */}
          <Flex gap={2} mt={5} justify="end">
            <FormControl w={{base:"52%", lg:"30%"}}>
              <FormLabel>Forward to:</FormLabel>
              <Select
                onChange={(e) => setReceiver(e.target.value)}
                value={receiver}
                borderColor="blue.300"
                borderRadius="md"
                focusBorderColor="blue.300"
                _hover={{ borderColor: "blue.500" }}
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option color="black" value="support">
                  Customer Support
                </option>
                <option color="black" value="sales">
                  Sales Marketing
                </option>
                <option color="black" value="dispatch">
                  Dispatch
                </option>
                <option color="black" value="noc">
                  NOC Department
                </option>
                <option color="black" value="accounting">
                  Billing/Accounting
                </option>
                <option color="black" value="osp">
                  OSP/Engineering
                </option>
                <option color="black" value="completed">
                  Completed
                </option>
              </Select>
            </FormControl>
          </Flex>
        </>

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
      )}
      
    </>
  );
};
