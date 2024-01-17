import React, { useState, useEffect } from "react";
import { CreateJobOrderModal } from "./JobOrder/CrudJobOrder/CreateJobOrderModal";
import { JobOrderViewModal } from "./JobOrder/CrudJobOrder/JobOrderViewModal";
// import { UpdateEmployeeModal } from "./Employee/CrudEmployee/UpdateEmployeeModal";
import { DeleteJobOrderModal } from "./JobOrder/CrudJobOrder/DeleteJobOrderModal";
import { JobOrderList } from "./JobOrder/JobOrderList/JobOrderList";
import { retrieveAllJobOrderDB } from "../../Api/JobOrderApi";
import { UpdateJobOrderModal } from "./JobOrder/CrudJobOrder/UpdateJobOrderModal";
// import { retrieveAllUserDB } from "../../Api/UserAccountsApi";
export const JobOrder = ({ userDetails }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [createJobOrder, setCreateJobOrder] = useState(false);
  const [jobOrderView, setJobOrderView] = useState(null);
  const [updateJobOrder, setUpdateJobOrder] = useState(null);
  const [deleteJobOrder, setDeleteJobOrder] = useState(null);

  const [allJobOrders, setAllJobOrders] = useState([]);

  const fetchAllJobOrders = async () => {
    try {
      const data = await retrieveAllJobOrderDB();
      setAllJobOrders(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllJobOrders();
  }, []);

  return (
    <div>
      {createJobOrder && (
        <CreateJobOrderModal
          setCreateJobOrder={setCreateJobOrder}
          setAllUsers={setAllUsers}
          updateJobOrder={updateJobOrder}
          allUsers={allUsers}
          allJobOrders={allJobOrders}
          setAllJobOrders={setAllJobOrders}
        />
      )}
      {jobOrderView && (
        <JobOrderViewModal
          setJobOrderView={setJobOrderView}
          jobOrderView={jobOrderView}
        />
      )}
      {deleteJobOrder && (
        <DeleteJobOrderModal
          setDeleteJobOrder={setDeleteJobOrder}
          deleteJobOrder={deleteJobOrder}
          allJobOrders={allJobOrders}
          setAllJobOrders={setAllJobOrders}
          userDetails={userDetails}
        />
      )}
      {updateJobOrder && (
        <UpdateJobOrderModal
          setUpdateJobOrder={setUpdateJobOrder}
          updateJobOrder={updateJobOrder}
          allJobOrders={allJobOrders}
          setAllJobOrders={setAllJobOrders}
        />
      )}
      {/* 
     
      
      {deleteEmployee && (
        <DeleteEmployeeModal
          setDeleteEmployee={setDeleteEmployee}
          deleteEmployee={deleteEmployee}
          setAllUsers={setAllUsers}
          allUsers={allUsers}
          userDetails={userDetails}
        />
      )} */}
      {/* EMPLOYEE LIST COMPONENT */}
      <JobOrderList
        // allUsers={allUsers}
        allJobOrders={allJobOrders}
        setCreateJobOrder={setCreateJobOrder}
        setJobOrderView={setJobOrderView}
        setDeleteJobOrder={setDeleteJobOrder}
        setUpdateJobOrder={setUpdateJobOrder}
        // setDeleteEmployee={setDeleteEmployee}
      />
    </div>
  );
};
