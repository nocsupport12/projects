import React, { useState, useEffect } from "react";
import { CreateEmployeeModal } from "./Employee/CrudEmployee/CreateEmployeeModal";
import { EmployeeProfileModal } from "./Employee/CrudEmployee/EmployeeProfileModal";
import { UpdateEmployeeModal } from "./Employee/CrudEmployee/UpdateEmployeeModal";
import { DeleteEmployeeModal } from "./Employee/CrudEmployee/DeleteEmployeeModal";
import { EmployeeList } from "./Employee/EmployeeList/EmployeeList";
import { retrieveAllUserDB } from "../../Api/UserAccountsApi";
import { Flex } from "@chakra-ui/react";
export const Employee = ({ userDetails }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [createEmployee, setCreateEmployee] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [updateEmployee, setUpdateEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const data = await retrieveAllUserDB();
      setAllUsers(data.filter((el) => el._id !== userDetails._id));
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {employeeProfile && (
        <Flex overflow="auto" h="30vh">
          <EmployeeProfileModal
            setEmployeeProfile={setEmployeeProfile}
            employeeProfile={employeeProfile}
          />
        </Flex>
        
      )}
      {createEmployee && (
        <CreateEmployeeModal
          setCreateEmployee={setCreateEmployee}
          setAllUsers={setAllUsers}
          allUsers={allUsers}
        />
      )}
      {updateEmployee && (
        <UpdateEmployeeModal
          setUpdateEmployee={setUpdateEmployee}
          updateEmployee={updateEmployee}
          setAllUsers={setAllUsers}
          allUsers={allUsers}
        />
      )}
      {deleteEmployee && (
        <DeleteEmployeeModal
          setDeleteEmployee={setDeleteEmployee}
          deleteEmployee={deleteEmployee}
          setAllUsers={setAllUsers}
          allUsers={allUsers}
          userDetails={userDetails}
        />
      )}
      {/* EMPLOYEE LIST COMPONENT */}
      <EmployeeList
        allUsers={allUsers}
        setCreateEmployee={setCreateEmployee}
        setEmployeeProfile={setEmployeeProfile}
        setUpdateEmployee={setUpdateEmployee}
        setDeleteEmployee={setDeleteEmployee}
      />
    </div>
  );
};
