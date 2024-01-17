import axios from "axios";
import React from "react";
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;
export const createJobOrderDB = async ({ body }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.post(
    `${globalUrl}/joborder/create`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
// export const retrieveUserDB = async ({ _id }) => {
//   const header = {
//     "Content-Type": "application/json",
//     "x-auth-token": authToken,
//   };

//   const response = await axios.get(
//     `${globalUrl}/useraccounts/retrieve/${_id}`,
//     {
//       headers: header,
//     }
//   );
//   return response.data;
// };
export const retrieveAllJobOrderDB = async () => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/joborder/retrieveAll`, {
    headers: header,
  });
  console.log(response.data)
  return response.data;
};
export const updateJobOrderDB = async ({ body, _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.patch(
    `${globalUrl}/joborder/update/${_id}`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  console.log(response.data);
  return response;
};
export const deleteJobOrderDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.delete(`${globalUrl}/joborder/delete/${_id}`, {
    headers: header,
  });
  return response;
};
