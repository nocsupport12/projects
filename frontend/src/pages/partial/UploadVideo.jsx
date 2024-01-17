import React from "react";
// import Upload from '../../../components/Upload/Upload'
import { VideoUpload } from "../../components/Upload/VideoUpload";

export const UploadVideo = (userDetails) => {
  return (
    <div>
      <VideoUpload userDetails={userDetails.userDetails} />
    </div>
  );
};
