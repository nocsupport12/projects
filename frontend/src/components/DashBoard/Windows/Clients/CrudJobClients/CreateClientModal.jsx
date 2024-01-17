import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ClientForm } from "./ClientForm";
export const CreateClientModal = ({
  setCreateClient,
  setAllClients,
  allClients,
  // updateJobOrder,
  // setAllJobOrders,
  updateClient,
}) => {
  return (
    <div
      className="inset-0 fixed backdrop-blur-xl flex justify-center items-center overflow-auto text-gray-800"
      style={{ zIndex: 10000000 }}
    >
      <div className="bg-gray-200 shadow-2xl min-w-[800px] min-h-[700px] w-[85vw] h-[70vh] rounded-2xl overflow-auto flex flex-col items-center  py-1">
        {/* CLOSE BUTTON */}
        <div className="flex justify-end pr-3 h-[5%] w-full">
          <IoMdClose
            className="text-2xl hover:cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setCreateClient(false)}
          />
        </div>
        <div className="w-full h-[90%]">
          <div className="p-5">
            <h2 className="text-center text-3xl font-semibold">Client Form</h2>
            {/* FORM FOR CREATE EMPLOYEE */}
            <ClientForm
              setCreateClient={setCreateClient}
              allClients={allClients}
              setAllClients={setAllClients}
              updateClient={null}
              // setAllUsers={setAllUsers}
              // allUsers={allUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
