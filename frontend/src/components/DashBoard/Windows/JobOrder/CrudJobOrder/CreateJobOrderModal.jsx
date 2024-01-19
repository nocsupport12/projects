import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { JobOrderForm } from "./JobOrderForm";
export const CreateJobOrderModal = ({
  setCreateJobOrder,
  // setAllUsers,
  updateJobOrder,
  allJobOrders,
  setAllJobOrders,
}) => {
  return (
    <div
      className="inset-0 fixed backdrop-blur-xl flex justify-center items-center overflow-auto text-gray-800"
      style={{ zIndex: 10000000 }}
    >
      <div className="inset-0 fixed bg-gray-200 shadow-2xl  rounded-2xl overflow-auto flex flex-col items-center  py-1">
        {/* CLOSE BUTTON */}
        <div className="flex justify-end pr-3 h-[5%] w-full">
          <IoMdClose
            className="text-2xl hover:cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setCreateJobOrder(false)}
          />
        </div>
        <div className="w-full h-[90%]">
          <div className="p-5">
            <h2 className="text-center text-3xl mb-8 font-semibold">
              Job Order Form
            </h2>
            {/* FORM FOR CREATE EMPLOYEE */}
            <JobOrderForm
              // userDetails={null}
              setCreateJobOrder={setCreateJobOrder}
              allJobOrders={allJobOrders}
              setAllJobOrders={setAllJobOrders}
              updateJobOrder={updateJobOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
