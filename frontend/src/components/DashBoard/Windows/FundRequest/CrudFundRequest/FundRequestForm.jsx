import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { ItemsList } from "./FormComponent/ItemList";
import {
  createFundRequestDB,
  updateFundRequestDB,
} from "../../../../Api/FundRequestApi";
import { IoMdClose } from "react-icons/io";
export const FundRequestForm = ({
  updateFundRequest,
  setUpdateFundRequest,
  setCreateFundRequest,
  setAllFundRequests,
  allFundRequests,
}) => {
  //   FORM STATES
  const [requestedBy, setRequestedBy] = useState("");
  const [department, setDepartment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [total, setTotal] = useState(0);
  const [checkedBy, setCheckedBy] = useState("");
  const [approval, setApproval] = useState("");
  const [items, setItems] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const [itemRemarks, setItemRemarks] = useState("");
  const [type, setType] = useState("create");
  const [updateAddItem, setUpdateAddItem] = useState(false);
  const [isEditMode, setEditMode] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (updateFundRequest !== null) {
      setType("update");
      setRequestedBy(
        updateFundRequest?.requestedby ? updateFundRequest?.requestedby : ""
      );
      setDepartment(
        updateFundRequest?.department ? updateFundRequest?.department : ""
      );
      setRemarks(updateFundRequest?.remarks ? updateFundRequest?.remarks : "");
      setItems(updateFundRequest?.items ? updateFundRequest?.items : []);
    } else {
      setType("create");
    }
    console.log(updateFundRequest);
  }, [updateFundRequest]);

  //   CREATE/UPDATE USERACCOUNTS DATABASE
  const fundRequestDB = async () => {
    const body = {
      department: department,
      items: items,
      total: total,
      remarks: remarks,
      checkedby: checkedBy,
      approval: approval,
      requestedby: requestedBy,
    };

    try {
      //CREATE USER OR UPDATE USER
      const response =
        type === "create"
          ? await createFundRequestDB({ body: body })
          : await updateFundRequestDB({
              body: body,
              _id: updateFundRequest?._id,
            });
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
          let newAllFundRequests = [...allFundRequests]; // Copying the state array
          const updatedFundRequestIndex = newAllFundRequests.findIndex(
            (el) => el._id === updateFundRequest?._id
          );
          if (updatedFundRequestIndex !== -1) {
            newAllFundRequests[updatedFundRequestIndex] = response.data.newData;
            setAllFundRequests(newAllFundRequests);
          }
          setUpdateFundRequest(null);
        } else {
          // CREATE USER UPDATE IN RENDERING
          toast({
            title: "Create Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            zIndex: 9999, // Set the desired z-index value
          });
          let newAllFundRequests = [...allFundRequests];
          setAllFundRequests([...newAllFundRequests, response.data.newData]);
          setCreateFundRequest(false);
        }
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
      fundRequestDB();
    }
  };

  useEffect(() => {
    setItemTotalPrice(Number(unitPrice) * Number(quantity));
  }, [unitPrice, quantity]);
  useEffect(() => {
    let newTotal = 0;
    items.map((item) => {
      newTotal = newTotal + item.itemtotalprice;
    });
    setTotal(newTotal);
  }, [items]);

  const addItem = () => {
    if (purpose.trim() !== "" && itemDescription.trim() !== "") {
      setItems([
        ...items,
        {
          description: itemDescription,
          purpose: purpose,
          quantity: quantity,
          unitprice: unitPrice,
          itemtotalprice: itemTotalPrice,
          remarks: itemRemarks,
        },
      ]);

      setItemDescription("");
      setPurpose("");
      setQuantity(0);
      setUnitPrice(0);
      setItemRemarks("");
    } else {
      toast({
        title: "Please Input description and purpose",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
        zIndex: 9999, // Set the desired z-index value
      });
    }
  };
  const removeItem = (indexToDelete) => {
    const updatedItems = items.filter((item, index) => index !== indexToDelete);
    setItems(updatedItems);
  };
  const editItem = ({ e, index }) => {
    setUpdateAddItem(true);
    setEditMode({ ...e, index: index });
    setItemDescription(e.description);
    setPurpose(e.purpose);
    setQuantity(Number(e.quantity));
    setUnitPrice(Number(e.unitprice));
    setItemRemarks(e.remarks);
  };
  const updateItem = () => {
    if (purpose.trim() !== "" && itemDescription.trim() !== "") {
      let newItems = [...items]; // Copying the state array
      const updatedItemIndex = newItems.findIndex(
        (el, index) => index === isEditMode?.index
      );
      if (updatedItemIndex !== -1) {
        newItems[updatedItemIndex] = {
          description: itemDescription,
          purpose: purpose,
          quantity: quantity,
          unitprice: unitPrice,
          itemtotalprice: itemTotalPrice,
          remarks: itemRemarks,
        };
        setItems(newItems);
      }

      setEditMode(null);
      setItemDescription("");
      setPurpose("");
      setQuantity(0);
      setUnitPrice(0);
      setItemRemarks("");
    } else {
      toast({
        title: "Please Input description and purpose",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
        zIndex: 9999, // Set the desired z-index value
      });
    }
  };
  const cancelEdit = () => {
    setEditMode(null);
    setItemDescription("");
    setPurpose("");
    setQuantity(0);
    setUnitPrice(0);
    setItemRemarks("");
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
        <Flex gap={2}>
          {/* REQUESTED BY */}
          <FormControl>
            <FormLabel>Requested By:</FormLabel>
            <Input
              onChange={(e) => {
                setRequestedBy(e.target.value);
              }}
              value={requestedBy}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
          {/* DEPARTMENT */}
          <FormControl>
            <FormLabel>Department:</FormLabel>
            <Input
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              value={department}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>
        
        <Flex gap={2}>
          {/* REMARKS */}
          <FormControl>
            <FormLabel>Remarks:</FormLabel>
            <Input
              onChange={(e) => {
                setRemarks(e.target.value);
              }}
              value={remarks}
              type="text"
              borderColor="blue.300"
              _hover={{ borderColor: "blue.500" }}
            />
          </FormControl>
        </Flex>
        <Flex justify="space-between">
          <Box as="div" fontWeight="bold" pt={8}>
            ITEMS:
          </Box>
          {type === "update" && (
            <Box
              as="div"
              fontWeight="bold"
              pt={8}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setUpdateAddItem(!updateAddItem);
                setItemDescription("");
                setPurpose("");
                setQuantity(0);
                setUnitPrice(0);
                setItemRemarks("");
                setEditMode(null);
              }}
            >
             
              <Button 
                border="2px solid" 
                borderColor="blue.600" 
                _hover={{
                  borderColor: "blue.300",
                  color: "blue.600"
                }}
              >
                <Flex gap={2} align="center">
                {!updateAddItem ? "Add Item" : "Cancel"}
                <FaPlus />
                </Flex>
                
              </Button>
             

              
            </Box>
          )}
        </Flex>
        {(type === "create" || updateAddItem === true) && (
          <>
            <Flex gap={2}>
              {/* REMARKS */}
              <FormControl>
                <FormLabel>Item Description:</FormLabel>
                <Input
                  onChange={(e) => {
                    setItemDescription(e.target.value);
                  }}
                  value={itemDescription}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Purpose:</FormLabel>
                <Input
                  onChange={(e) => {
                    setPurpose(e.target.value);
                  }}
                  value={purpose}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Remarks:</FormLabel>
                <Input
                  onChange={(e) => {
                    setItemRemarks(e.target.value);
                  }}
                  value={itemRemarks}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
            </Flex>
            <Flex gap={2}>
              {/* REMARKS */}
              <FormControl>
                <FormLabel>Quantity:</FormLabel>
                <Input
                  onChange={(e) => {
                    setQuantity(
                      e.target.value !== ""
                        ? e.target.value.match(/[0-9]/g)
                          ? e.target.value.match(/[0-9]/g).length === 1
                            ? e.target.value.match(/[0-9]/g)[0]
                            : e.target.value.match(/[0-9]/g).join("")
                          : 0
                        : 0
                    );
                    // e.target.value.match(/[0-9]/g).length>0?setQuantity(e.target.value.match(/[0-9]/g)[0]:(e.target.value.match(/[0-9]/g).join('')
                  }}
                  value={quantity ? quantity : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Unit Price:</FormLabel>
                <Input
                  onChange={(e) => {
                    setUnitPrice(
                      e.target.value !== ""
                        ? e.target.value.match(/[0-9]/g)
                          ? e.target.value.match(/[0-9]/g).length === 1
                            ? e.target.value.match(/[0-9]/g)[0]
                            : e.target.value.match(/[0-9]/g).join("")
                          : 0
                        : 0
                    );
                  }}
                  value={unitPrice ? unitPrice : ""}
                  type="text"
                  borderColor="blue.300"
                  _hover={{ borderColor: "blue.500" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Item Total Price:</FormLabel>
                <Box textAlign="center" fontSize="22px">
                  ₱ {itemTotalPrice}
                </Box>
              </FormControl>
              <Flex justifyContent="flex-end" alignItems="flex-end">
                {!isEditMode ? (
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
                    onClick={() => {
                      addItem();
                    }}
                    _hover={{
                      borderColor: "blue.300",
                      boxShadow: "xl",
                    }}
                  >
                    <Flex align="center" gap={2}>
                      Add
                      <FaPlus />
                    </Flex>
                  </Button>
                ) : (
                  <>
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
                      onClick={() => {
                        updateItem();
                      }}
                      _hover={{
                        borderColor: "blue.300",
                        boxShadow: "xl",
                      }}
                    >
                      <Flex align="center" gap={2}>
                        Update
                        <FaPlus />
                      </Flex>
                    </Button>
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
                      onClick={() => {
                        cancelEdit();
                      }}
                      _hover={{
                        borderColor: "blue.300",
                        boxShadow: "xl",
                      }}
                    >
                      <Flex align="center" gap={2}>
                        Cancel
                        <IoMdClose />
                      </Flex>
                    </Button>
                  </>
                )}
              </Flex>
            </Flex>
          </>
        )}

        {items.length > 0 && (
          <Flex
            flexDir="column"
            gap={2}
            px={2}
            py={2}
            mb={1}
            border="1px solid black" //
            rounded={6}
          >
            <Grid
              gridTemplateColumns="repeat(12, 1fr)"
              gap={2}
              px={2}
              py={2}
              mb={1}
              borderBottom={1}
              rounded={6}
              flexWrap="nowrap"
              bg="green.600"
              color="white"
              fontWeight="semibold"
            >
              <GridItem colSpan={2}>
                <Text as="p">Description</Text>
              </GridItem>

              <GridItem colSpan={2} textAlign="center">
                <Text as="p">Purpose</Text>
              </GridItem>

              <GridItem colSpan={1} textAlign="center">
                <Text as="p">Quantity</Text>
              </GridItem>

              <GridItem colSpan={1} textAlign="center">
                <Text as="p">Unit Price</Text>
              </GridItem>

              <GridItem colSpan={2} textAlign="center">
                <Text as="p">Total Price</Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Text as="p">Remarks</Text>
              </GridItem>
              <GridItem colSpan={1} textAlign="center">
                <p>Actions</p>
              </GridItem>
            </Grid>
            {items.map((item, index) => {
              return (
                <ItemsList
                  item={item}
                  key={index}
                  index={index}
                  removeItem={removeItem}
                  editItem={editItem}
                />
              );
            })}
            <Grid
              gridTemplateColumns="repeat(12, 1fr)"
              gap={2}
              px={2}
              py={2}
              mb={1}
              borderBottom={1}
              rounded={6}
              flexWrap="nowrap"
              bg="green.600"
              color="white"
              fontWeight="semibold"
            >
              <GridItem colSpan={10}>
                <Text as="p" textAlign="right" fontSize="22px">
                  Total:
                </Text>
              </GridItem>
              <GridItem colSpan={2} textAlign="center" fontSize="22px">
                <p>₱ {total}</p>
              </GridItem>
            </Grid>
          </Flex>
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
            }}
          >
            <Flex align="center" gap={2}>
              {updateFundRequest ? "Update" : "Create"}
              <FaCheck />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
