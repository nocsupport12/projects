import axios from "axios";
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;

export const createClientDB = async ({ body }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };
  const response = await axios.post(
    `${globalUrl}/clientform/create`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
export const retrieveClientDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/clientform/retrieve/${_id}`, {
    headers: header,
  });
  return response.data;
};
export const retrieveAllClientDB = async () => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.get(`${globalUrl}/clientform/retrieveAll`, {
    headers: header,
  });
  return response.data;
};
export const updateClientDB = async ({ body, _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.patch(
    `${globalUrl}/clientform/update/${_id}`,
    JSON.stringify(body),
    {
      headers: header,
    }
  );
  return response;
};
export const deleteClientDB = async ({ _id }) => {
  const header = {
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  };

  const response = await axios.delete(`${globalUrl}/clientform/delete/${_id}`, {
    headers: header,
  });
  return response;
};
