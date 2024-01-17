import axios from "axios";

const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;

export const createUserDB = async ({ body }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.post(
    `${globalUrl}/useraccounts/create`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
export const retrieveUserDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(
    `${globalUrl}/useraccounts/retrieve/${_id}`,
    {
      headers: header,
    }
  );
  return response.data;
};
export const retrieveAllUserDB = async () => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/useraccounts/retrieveAll`, {
    headers: header,
  });
  return response.data;
};
export const updateUserDB = async ({ body, _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.patch(
    `${globalUrl}/useraccounts/update/${_id}`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
export const deleteUserDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.delete(
    `${globalUrl}/useraccounts/delete/${_id}`,
    {
      headers: header,
    }
  );
  return response;
};
