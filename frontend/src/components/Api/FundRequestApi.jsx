import axios from "axios";
import React from "react";
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;
export const createFundRequestDB = async ({ body }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.post(
    `${globalUrl}/fundrequest/create`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};

export const retrieveAllFundRequestDB = async () => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/fundrequest/retrieveAll`, {
    headers: header,
  });

  const filteredData = response.data.filter((fundRequest) => !fundRequest.deleted);
  return filteredData;
  
};

export const updateFundRequestDB = async ({ body, _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.patch(
    `${globalUrl}/fundrequest/update/${_id}`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};

export const deleteFundRequestDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.delete(
    `${globalUrl}/fundrequest/delete/${_id}`,
    {
      headers: header,
    }
  );
  return response;
};
