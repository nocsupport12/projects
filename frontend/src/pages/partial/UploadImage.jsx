import React from "react";
import { ImageUpload } from "../../components/Upload/ImageUpload";

export const UploadImage = (userDetails) => {
  return (
    <div>
      <ImageUpload userDetails={userDetails.userDetails} />
    </div>
  );
};
