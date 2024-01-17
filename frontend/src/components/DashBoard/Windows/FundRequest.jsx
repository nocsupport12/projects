import React, { useState, useEffect } from "react";
import { FundRequestList } from "./FundRequest/FundRequestList/FundRequestList";
import { CreateFundRequestModal } from "./FundRequest/CrudFundRequest/CreateFundRequestModal";
import { retrieveAllFundRequestDB } from "../../Api/FundRequestApi";
import { DeleteFundRequestModal } from "./FundRequest/CrudFundRequest/DeleteFundRequestModal";
import { FundRequestProfileModal } from "./FundRequest/CrudFundRequest/FundRequestProfileModal";
import { UpdateFundRequestModal } from "./FundRequest/CrudFundRequest/UpdateFundRequestModal";
export const FundRequest = ({ userDetails }) => {
  const [allFundRequests, setAllFundRequests] = useState([]);
  const [createFundRequest, setCreateFundRequest] = useState(false);
  const [fundRequestProfile, setFundRequestProfile] = useState(null);
  const [updateFundRequest, setUpdateFundRequest] = useState(null);
  const [deleteFundRequest, setDeleteFundRequest] = useState(null);

  const fetchAllFundRequest = async () => {
    try {
      const data = await retrieveAllFundRequestDB();
      setAllFundRequests(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllFundRequest();
  }, []);

  return (
    <div>
      {fundRequestProfile && (
        <FundRequestProfileModal
          setFundRequestProfile={setFundRequestProfile}
          fundRequestProfile={fundRequestProfile}
        />
      )}
      {createFundRequest && (
        <CreateFundRequestModal
          setCreateFundRequest={setCreateFundRequest}
          setAllFundRequests={setAllFundRequests}
          allFundRequests={allFundRequests}
          updateFundRequest={updateFundRequest}
        />
      )}
      {deleteFundRequest && (
        <DeleteFundRequestModal
          setDeleteFundRequest={setDeleteFundRequest}
          deleteFundRequest={deleteFundRequest}
          setAllFundRequests={setAllFundRequests}
          allFundRequests={allFundRequests}
          userDetails={userDetails}
        />
      )}
      {updateFundRequest && (
        <UpdateFundRequestModal
          allFundRequests={allFundRequests}
          setAllFundRequests={setAllFundRequests}
          setUpdateFundRequest={setUpdateFundRequest}
          updateFundRequest={updateFundRequest}
        />
      )}

      {/* EMPLOYEE LIST COMPONENT */}
      <FundRequestList
        allFundRequests={allFundRequests}
        setCreateFundRequest={setCreateFundRequest}
        setDeleteFundRequest={setDeleteFundRequest}
        setFundRequestProfile={setFundRequestProfile}
        setUpdateFundRequest={setUpdateFundRequest}
      />
    </div>
  );
};
