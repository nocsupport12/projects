import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FundRequestForm } from "./FundRequestForm";
import { Flex, Text } from "@chakra-ui/react";

export const UpdateFundRequestModal = ({
  allFundRequests,
  setAllFundRequests,
  setUpdateFundRequest,
  updateFundRequest,
}) => {
  return (
    <div
      className="inset-0 fixed backdrop-blur-xl flex justify-center items-center overflow-auto text-gray-800 font-poppins"
      style={{ zIndex: 10000000 }}
    >
      <div className="bg-gray-200 shadow-2xl min-w-[800px] min-h-[700px] w-[85vw] h-[70vh] rounded-2xl overflow-auto flex flex-col items-center  py-1">
        {/* CLOSE BUTTON */}
        <div className="flex justify-end pr-3 h-[5%] w-full">
          <IoMdClose
            className="text-2xl hover:cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setUpdateFundRequest(null)}
          />
        </div>
        <div className="w-full h-[90%]">
          <div className="p-5">
            <Flex w="100%" justify="center" gap={2} fontSize="28px" fontWeight="semibold">
              <Text as="p">Editing </Text>
              <Text>{updateFundRequest?.requestfundid}</Text>
            </Flex>
            {/* FORM FOR CREATE EMPLOYEE */}
            <FundRequestForm
              updateFundRequest={updateFundRequest}
              setUpdateFundRequest={setUpdateFundRequest}
              setAllFundRequests={setAllFundRequests}
              allFundRequests={allFundRequests}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
