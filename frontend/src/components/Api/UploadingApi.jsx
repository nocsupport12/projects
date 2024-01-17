import axios from "axios";

const authToken = process.env.REACT_APP_X_AUTH_TOKEN;
const globalUrl = process.env.REACT_APP_GLOBAL_URL;

export const uploadingImg = async ({ selectedFile }) => {
console.log(selectedFile);

  const headers = {
    "Content-Type": "multipart/form-data",
    "x-auth-token": authToken,
  };
  
  const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);

  try {
    const response = await axios.post(`${globalUrl}/uploading/create`,formData,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error during image upload:", error);
    throw error; // Re-throw the error to propagate it to the caller if needed
  }
};
