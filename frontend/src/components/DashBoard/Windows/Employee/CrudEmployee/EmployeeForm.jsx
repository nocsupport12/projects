import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { createUserDB, updateUserDB } from "../../../../Api/UserAccountsApi";
import { Avatar, Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Select, Text, Textarea, Wrap, WrapItem, useToast, } from "@chakra-ui/react";
import axios from "axios";
import { uploadingImg } from "../../../../Api/UploadingApi";


// import { uploadingImg } from "../../../../Api/UploadingApi";
const storageUrl = process.env.REACT_APP_GLOBAL_STORAGEURL

export const EmployeeForm = ({

  userDetails,
  setUpdateEmployee,
  setCreateEmployee,
  isOwnProfile,
  setAllUsers,
  allUsers,
  setUserDetails,
  setIsEditMode,

}) => {
  //   FORM STATES
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [employedDate, setEmployedDate] = useState("");
  const [office, setOffice] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [type, setType] = useState("create");
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef(null);
  const toast = useToast();


  useEffect(() => {
    if (userDetails !== null) {
      setType("update");
      setFullName(userDetails?.fullname ? userDetails?.fullname : "");
      setEmail(userDetails?.email ? userDetails?.email : "");
      setAge(userDetails.age ? userDetails.age : "");
      setContact(userDetails.contact ? userDetails.contact : "");
      setBirthday(userDetails?.birthday ? userDetails?.birthday : "");
      setEmployedDate(
        userDetails?.employeddate ? userDetails?.employeddate : ""
      );
      setOffice(userDetails?.office ? userDetails?.office : "");
      setPosition(userDetails?.position ? userDetails?.position : "");
      setGender(userDetails?.gender ? userDetails?.gender : "");
      setAddress(userDetails?.address ? userDetails?.address : "");
      setDepartment(userDetails?.department ? userDetails?.department : "");
      setPassword(userDetails.password ? userDetails.password : "");
      setSelectedPrivileges(userDetails?.privilegeaccess);
      
      setRemarks(userDetails.remarks ? userDetails.remarks : "");
      console.log(userDetails?.privilegeaccess, selectedPrivileges);
    } else {
      setType("create");
    }
  }, [userDetails]);

  //   AUTOMATED BIRTHDAY CALCULATION
  const handleBirthdayChange = (event) => {
    const birthDate = new Date(event.target.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge);
    setBirthday(event.target.value);
  };

  //   MULTIPLE PRIVILEGES
  const handlePrivilegeChange = (event) => {
    const { value } = event.target;
    if (selectedPrivileges.includes(value)) {
      setSelectedPrivileges(
        selectedPrivileges.filter((privilege) => privilege !== value)
      );
    } else {
      setSelectedPrivileges([...selectedPrivileges, value]);
    }
  };

  //   CREATE/UPDATE USERACCOUNTS DATABASE
  const EmployeeDB = async (filename) => {
    
    setLoading(true)

    const body = {
      fullname: fullName,
      contact: contact,
      birthday: birthday,
      picture: filename.filename,
      //////////////////
      employeddate: employedDate,
      office: office,
      position: position,
      email: email,
      gender: gender,
      age: age,
      address: address,
      department: department,
      remarks: remarks,
      privilegeaccess: selectedPrivileges,
      password: password,
    };

    try {
      //CREATE USER OR UPDATE USER
      const response =
        type === "create"
          ? await createUserDB({ body: body })
          : await updateUserDB({ body: body, _id: userDetails._id });

      if (response) {
        
       
        // REALTIME UPDATE
        if (type === "update") {
          
          
          if (!isOwnProfile) {
            
            // OTHER USER IN EMPLOYEE MANAGEMENT EDITING
            toast({
              title: "Update Successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
              zIndex: 9999, // Set the desired z-index value
            });

            let newAllUsers = [...allUsers]; // Copying the state array

            const updatedUserIndex = newAllUsers.findIndex(
              (el) => el._id === userDetails?._id
            );

            if (updatedUserIndex !== -1) {
              newAllUsers[updatedUserIndex] = response.data.newData;
              setAllUsers(newAllUsers);
             
            }
              setUpdateEmployee(null);
          } else {
            toast({
              title: "Update Successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
              zIndex: 9999, // Set the desired z-index value
            });
            // OWN USER PROFILE EDITING
            setUserDetails(response.data.newData);   
          
            setIsEditMode(false);
          }
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
          let newAllUsers = [...allUsers];
          setAllUsers([...newAllUsers, response.data.newUser]);
            setCreateEmployee(false);
        }
        
        //CLEARING
        setFullName("");
        setContact("");
        setBirthday("");
        setEmployedDate("");
        setOffice("");
        setPosition("");
        setEmail("");
        setGender("");
        setAge("");
        setAddress("");
        setDepartment("");
        setRemarks("");
        setSelectedPrivileges([]);
        setShowPassword(false);
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
 

  const handleValidate = () => {
    
    const validate = () => {
      
      if (!fullName || !contact || !birthday || !employedDate || !office || !position || !email || !gender || !age || !address || !department ) {
        // true 
        toast({
          title: "Filled Important Fields",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
          zIndex: 9999, // Set the desired z-index value
        });
    
      } else {
        return true;
      }
      
      
    };
   
    if (validate()) {            
      handleUpload()
    }
  };

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };





  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
    console.log(images);
  };





  const handleUpload = async () => {
    try {
      if (images.length > 0) {
        let cloudName = "dijhxviqe";
        const data = new FormData();
        data.append("file", images[0]);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
  
        // Update the database with the uploaded image URL
        EmployeeDB({ filename: secure_url });
      } else {
        // If no new image is selected, update the database with the existing image URL
        EmployeeDB({ filename: userDetails?.picture });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
  return (
  <>    
    <Flex flexDir="column"  gap={3} bg="gray.200" color="black" p={5} borderRadius={10} >

      <Flex flexDir="column" gap={2} pb={10}>
        <Flex>
          <Box >
          {images.length > 0 ? (
            <Flex>
              <Wrap>
                <WrapItem>
                  <Avatar
                    size='xl'
                  
                    src={URL.createObjectURL(images[0])}
                  />
                </WrapItem>
              </Wrap>

              <Flex flexDir="column" justify="end">
              <Input
                type="file"
                accept="*/*"
                id="actual-btn" 
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Button 
                onClick={handleButtonClick}
                bg="none"
              >
                <Box
                  _hover={{
                    color:"gray.600"
                }}>
                  <FaEdit   />
                </Box>
              </Button>
              </Flex>
            </Flex>
          ) : ( 
            <Flex>
              <Wrap>
                <WrapItem >

                  <Avatar size='xl'  src={`${userDetails?.picture ? `${userDetails?.picture}` : "" }`}  name={userDetails?.fullname}/>
                </WrapItem>
              </Wrap>
              <Flex flexDir="column" justify="end">
              <Input
                type="file"
                accept="*/*"
                id="actual-btn" 
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Button 
                onClick={handleButtonClick}
                bg="none"
              >
                <Box
                  _hover={{
                    color:"gray.600"
                }}>
                  <FaEdit   />
                </Box>
              </Button>
              </Flex>
            </Flex>
           
            )}

            
            <Text as="p" fontSize="xl">{userDetails?.fullname}</Text>
          </Box>
            
        </Flex>
        
        
      </Flex>
      
        <Flex 
          gap={2} flexDir={{base: "column", md: "row" ,lg: "row"}}>
          {/* FULL NAME */}
          <FormControl>
            <FormLabel >Full Name:</FormLabel>
            <Input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
              type="text"
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
          
          {/* EMAIL */}
          <FormControl >
            <FormLabel >E-mail:</FormLabel>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
        </Flex>

        <Flex gap={3} flexDir={{base: "column", md: "row", lg: "row"}}>
          {/* CONTANT NUMBER */}
          <FormControl className="col-span-6">
            <FormLabel>Contact Number:</FormLabel>
            <Input
              onChange={(e) => {
                setContact(e.target.value);
              }}
              value={contact}
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
          
          {/* ADDRESS */}
          <FormControl className="col-span-6">
            <FormLabel>Address:</FormLabel>
            <Input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
        </Flex>
        
        <Flex gap={3} flexDir={{base: "column", md: "row", lg: "row"}}>
          {/* BIRTHDAY */}
          <FormControl className="col-span-6">
            <FormLabel >Birthday:</FormLabel>
            <Input
              type="date"
              onChange={handleBirthdayChange}
              value={birthday}
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
          
          {/* AGE */}
          <FormControl className="col-span-6">
            <FormLabel>Age:</FormLabel>
            <Input
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
              readOnly
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>

          {/* GENDER */}
          <FormControl className="col-span-6">
            <FormLabel fontSize="md" fontWeight="bold" >Gender:</FormLabel>
            <Select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              borderColor="blue.300"
              borderRadius="md"
              focusBorderColor="blue.300"
              _hover={{ borderColor: 'blue.500' }}
            
              
              // placeholder="Please Select"
            >
              <option value="" disabled>
                Please Select
              </option>
              <option color="black" value="male">Male</option>
              <option color="black" value="female">Female</option>
              <option color="black" value="other">Other</option>
            </Select>
          </FormControl>
        </Flex>

        <Flex gap={3} flexDir={{base: "column", md: "row", lg: "row"}}>
          {/* EMPLOYEE DATE */}
          <FormControl className="col-span-6">
            <FormLabel>Employed Date:</FormLabel>
            <Input
              type="date"
              onChange={(e) => {
                setEmployedDate(e.target.value);
                
              }}
              value={employedDate}
              borderRadius="md"
              borderColor='blue.300'
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
        
          {/* OFFICE */}
          <FormControl className="col-span-6">
            <FormLabel>Office:</FormLabel>
            <Input
              onChange={(e) => {
                setOffice(e.target.value);
              }}
              value={office}
              borderColor="blue.300"
              borderRadius="md"
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
        </Flex>

        <Flex gap={3} flexDir={{base: "column", md: "row", lg: "row"}}>
          {/* DEPARTMENT */}
          <FormControl className="col-span-6" w={{base: "100%" , lg:"33%"}}>
            <FormLabel>Department:</FormLabel>
            <Input
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              value={department}
              borderColor="blue.300"
              borderRadius="md"
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>

          {/* POSITION */}
          <FormControl className="col-span-6" w={{base: "100%" , lg:"33%"}}>
            <FormLabel>Position:</FormLabel>
            <Input
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              value={position}
              borderColor="blue.300"
              borderRadius="md"
              _hover={{ borderColor: 'blue.500' }}
            />
          </FormControl>
          <Flex  w={{base: "100%" , lg:"33%"}} flexDir="column">
            <Flex  pb={2}>Give / Change Password:<Checkbox
              isChecked={showPassword}
              onChange={handleCheckboxChange}
              borderColor="blue.300"
              borderRadius="md"
              pl={2}
              
            /></Flex>
            
            {showPassword && (
              <Box>
                <Input
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  borderColor="blue.300"
                  borderRadius="md"
                  _hover={{ borderColor: 'blue.500' }}
                />
              </Box>
            )}
          </Flex>
        </Flex>  
        
        {!isOwnProfile && ( 

          <Flex flexDir="column" as="div">
            <FormLabel>
              Privilege:
            </FormLabel>

            <Flex flexDir={{base: "column", lg: "row"}}>
                <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                  <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                    <Checkbox
                      value="analytics"
                      checked={selectedPrivileges?.includes("analytics")}
                      onChange={handlePrivilegeChange}
                      borderColor="blue.300"
                    
                    />
                    <Text as="p" ml={2}>
                      Business Dashboard
                    </Text>
                  </Flex>
                </Box>

                <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                  <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                    <Checkbox
                      value="customerService"
                      checked={selectedPrivileges?.includes("customerService")}
                      onChange={handlePrivilegeChange}
                      borderColor="blue.300"
                    />
                    <Text as="p" ml={2}>
                      Customer Service Reports
                    </Text>
                  
                </Flex>
              </Box>
            </Flex>

            <Flex flexDir={{base: "column", lg: "row"}}>
              <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                  <Checkbox
                    value="inventory"
                    checked={selectedPrivileges?.includes("inventory")}
                    onChange={handlePrivilegeChange}
                    borderColor="blue.300"
                  />
                  <Text as="p" ml={2}>
                    Inventory Management
                  </Text>
                </Flex>
              </Box>  
              
              <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                  <Checkbox
                    value="employee"
                    checked={selectedPrivileges?.includes("employee")}
                    onChange={handlePrivilegeChange}
                    borderColor="blue.300"
                  />
                  <Text as="p" ml={2}>
                    Employee Management
                  </Text>
                </Flex>
              </Box>
            </Flex>

            <Flex flexDir={{base: "column", lg: "row"}}>
              <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                  <Checkbox
                    value="clients"
                    checked={selectedPrivileges?.includes("clients")}
                    onChange={handlePrivilegeChange}
                    borderColor="blue.300"
                  />
                  <Text as="p" ml={2}>
                    Clients

                  </Text>
                </Flex>
              </Box>

              <Box as="div" w={{base: "100%" ,lg:"50%"}}>
                <Flex w={{base: "100%" ,lg:"40%"}} align="center">
                  <Checkbox
                    value="sales"
                    checked={selectedPrivileges?.includes("sales")}
                    onChange={handlePrivilegeChange}
                    borderColor="blue.300"
                  />
                  <Text as="p" ml={2}>
                    Sales
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Box>
              <FormLabel htmlFor="remarks" fontWeight="bold" mb={2}>
                Remarks:
              </FormLabel>
              <Textarea
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
                size="lg"
                resize="none"
                placeholder="Enter your remarks here..."
                borderColor="blue.300"
                borderRadius="md"
              />
            </Box>
          </Flex>
        )} 
    
        <Flex flexDir="column" w="100%">
      </Flex>
      
      {/* BUTTON */}
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
          isLoading={loading}
          onClick={handleValidate}
          _hover={{
          
            
            borderColor: 'blue.300',
            boxShadow: 'xl',
          }}
        >
          <Flex align="center" gap={2}>
          
            {type === "create" ? "Generate" : "Update"}{" "}
            {!isOwnProfile ? "Employee" : "Profile"}{" "}
            <FaCheck />
          </Flex>
        </Button>
        
      </Flex>
    </Flex> 
      
  </>
  );
};

