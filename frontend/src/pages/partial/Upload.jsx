import { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

import { UploadImage } from "./UploadImage";
import { UploadVideo } from "./UploadVideo";

export const Upload = (userDetails) => {
  const [uploadImage, setUploadImage] = useState(true);
  const [uploadVideo, setUploadVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const handleUploadImage = () => {
    setUploadImage(true);
    setUploadVideo(false);
   
  };

  const handleUploadVideo = () => {
    setUploadImage(false);
    setUploadVideo(true);
   
  };

  return (
    <section className="font-poppins pt-36 sm:pt-44 pb-40  px-3 md:px-0 lg:px-5 bg-semidimLight text-black dark:bg-darkModeBlack  md:h-screen">
      <div className="container mx-auto">
        <Tabs colorScheme="purple" variant="enclosed">
          <TabList>
            <Tab _selected={{color: "white", bg:"#3182CE"}} onClick={handleUploadImage}>Upload Image</Tab>
            <Tab _selected={{color: "white", bg:"#3182CE"}} onClick={handleUploadVideo}>Upload Video</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {uploadImage && !loading && <UploadImage userDetails={userDetails.userDetails} />}
              
            </TabPanel>
            <TabPanel>
              {uploadVideo && !loading && <UploadVideo userDetails={userDetails.userDetails} />}
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  );
};
