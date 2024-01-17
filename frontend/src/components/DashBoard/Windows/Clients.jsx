import React, { useState, useEffect } from "react";
import { ClientsList } from "./Clients/ClientsList/ClientsList";
import { retrieveAllClientDB } from "../../Api/ClientsApi";
import { ClientViewModal } from "./Clients/CrudJobClients/ClientViewModal";
import { CreateClientModal } from "./Clients/CrudJobClients/CreateClientModal";
import { UpdateClientModal } from "./Clients/CrudJobClients/UpdateClientModal";
import { DeleteClientsModal } from "./Clients/CrudJobClients/DeleteClientsModal";
// import { CreateEmployeeModal } from "./Employee/CrudEmployee/CreateEmployeeModal";
// import { EmployeeProfileModal } from "./Employee/CrudEmployee/EmployeeProfileModal";
// import { UpdateEmployeeModal } from "./Employee/CrudEmployee/UpdateEmployeeModal";
// import { DeleteEmployeeModal } from "./Employee/CrudEmployee/DeleteEmployeeModal";
// import { EmployeeList } from "./Employee/EmployeeList/Empl oyeeList";
export const Clients = ({
  userDetails,
  allClients,
  setAllClients,
  setDisplay,
  LoadingWindow,
  search,
}) => {

  const [clientProfile, setClientProfile] = useState(null);
  const [createClient, setCreateClient] = useState(false);
  const [updateClient, setUpdateClient] = useState(null);
  const [deleteClient, setDeleteClient] = useState(null);
  


  // useEffect(() => {
  //   // if (allClients) {
  //   // }
  //   // if (allClients.length<0) {
  //   // }
  // }, [allClients]);
  return (
    <div>
      {clientProfile && (
        <ClientViewModal
          setClientProfile={setClientProfile}
          clientProfile={clientProfile}
        />
      )}
      {createClient && (
        <CreateClientModal
          setCreateClient={setCreateClient}
          updateClient={updateClient}
          setAllClients={setAllClients}
          allClients={allClients}
        />
      )}
      {updateClient && (
        <UpdateClientModal
          setUpdateClient={setUpdateClient}
          updateClient={updateClient}
          setAllClients={setAllClients}
          allClients={allClients}
        />
      )}

      {deleteClient && (
        <DeleteClientsModal
          setDeleteClient={setDeleteClient}
          deleteClient={deleteClient}
          setAllClients={setAllClients}
          allClients={allClients}
          userDetails={userDetails}
        />
      )}
      {/* EMPLOYEE LIST COMPONENT */}
      <ClientsList
        allClients={allClients}
        setClientProfile={setClientProfile}
        setCreateClient={setCreateClient}
        setUpdateClient={setUpdateClient}
        setDeleteClient={setDeleteClient}
        search={search}
        
      />
    </div>
  );
};
