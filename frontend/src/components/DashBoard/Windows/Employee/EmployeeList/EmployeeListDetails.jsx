import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const EmployeeListDetails = ({
  user,
  setEmployeeProfile,
  setUpdateEmployee,
  setDeleteEmployee,
}) => {
  return (
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
        bg: 'gray.600',
       
      }}
    >
    <GridItem colSpan={2}>
      <Text as="p" _hover={{ textDecor: "underline", cursor: "pointer"}} onClick={() => setEmployeeProfile(user)}>
        {user?.fullname ? user.fullname.length > 18 ? user.fullname.slice(0, 18) + "..." : user.fullname : "Null"}
      </Text>
    </GridItem>

    <GridItem colSpan={2}>
      <Text as="p">
        {user?.position}
      </Text>
    </GridItem>

    <GridItem colSpan={3}>
      <Text as="p">
        {user?.email.length > 25 ? user.email.slice(0, 25) + "..." : user.email}
      </Text>
    </GridItem>

    <GridItem colSpan={2}>
      <Text as="p">
        {user?.contact || "Null"}
      </Text>
    </GridItem>

    <GridItem colSpan={2}>
      <Text as="p">
        {user?.remarks
          ? user.remarks.length > 15
            ? user.remarks.slice(0, 15) + "..."
            : user.remarks
          : "Null"}
      </Text>
    </GridItem>
      
   
      <p className="col-span-1 flex gap-3 justify-center text-xl">
        <FaEdit
          className="hover:cursor-pointer hover:text-gray-300"
          onClick={() => setUpdateEmployee(user)}
        />
        <MdDelete
          className="text-red-700 hover:cursor-pointer hover:text-red-300"
          onClick={() => {
            setDeleteEmployee(user._id);
          }}
        />
      </p>
    </Grid>
  );
};
