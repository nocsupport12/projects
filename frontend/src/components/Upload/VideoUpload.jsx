import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./image-upload.css";

// RADIO MATERIAL-TAILWIND LIBRARY
import { Radio } from "@material-tailwind/react";
import { Button, Input, FormControl, FormLabel, Textarea, VStack, useToast } from "@chakra-ui/react";

export const VideoUpload = (userDetails) => {
  const [videos, setVideos] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoKey, setVideoKey] = useState(0);


  const [type, setType] = useState("news");
  const navigate = useNavigate();
  const toast = useToast();


  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const uploadFiles = async () => {
    setLoading(true);
    try {
      let cloudName = "dijhxviqe";
      const uploadedVideoUrls = [];

      for (const video of videos) {
        if (video.size > 40 * 1024 * 1024) {
          setErr("File size exceeds the 40mb limit.");
          setLoading(false)
          return;
        }

        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "barangay_ariman_video");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        uploadedVideoUrls.push(secure_url);
        fetchUploadVideo(secure_url);
      }

      setUploadSuccess(true);
      setLoading(false);
      

      setTimeout(() => {
        navigate("/news");
      }, 2000);

      
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  const fetchUploadVideo = async (secureUrl) => {
    const body = {
      imageUrl: secureUrl,
      category: "video",
      title: title,
      description: description,
      barangay: userDetails.userDetails.barangay,
      municipality: userDetails.userDetails.municipality,
      province: userDetails.userDetails.province,
      level: userDetails.userDetails.level,
      type: type,
    };
    try {
      let url = `${globalUrl}/blogposts/create`;
      let method = "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log("Data saved successfully");
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleSubmit = () => {
    if (!title || title.trim() === "" || !description || description.trim() === "" || videos.length < 1) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: "2000",
        isClosable: true,
        position: "bottom",
      });
    } else {
      for (const video of videos) {
        if (video.size > 40 * 1024 * 1024) {
          toast({
            title: "File size exceeds the 40MB limit!",
            status: "warning",
            duration: "2000",
            isClosable: true,
            position: "bottom",
          });
          break;
        }
      }
      
      uploadFiles();
    }
  };
  

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
  
    if (selectedFiles) {
      // Update videoUrl state with the new URL for the selected video
      setVideoUrl(URL.createObjectURL(selectedFiles));
      setVideos([selectedFiles]);
      // Force a re-render by changing the key
      setVideoKey((prevKey) => prevKey + 1);
    } else {
      // If no file is selected, reset the videoUrl state
      setVideoUrl(null);
      setVideos([]);
    }
  };
  

  return (
    <section className="font-poppins">
      <div className="container mx-auto">
        <form>
          <div className="flex justify-center gap-10 pb-20">
            <Radio
              name="type"
              label="News"
              defaultChecked
              value="news"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <Radio
              name="type"
              label="Announcement"
              value="announcement"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4 h-full">
                <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black  h-full w-[100%] dark:bg-white">
                  {videos.length > 0 ? (
                    <div className="flex flex-col justify-center items-center gap-5 h-[250px]" style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
                      
                    <video key={videoKey} controls className="h-[200px] w-full object-contain">
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                      {videos.map((video) => (
                        <p key={video.name}>{video.name}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-[4rem]">
                        <i className="fa-solid fa-folder-open"></i>
                      </span>
                      <p className="font-semibold text-center">Upload your video here</p>
                    </div>
                  )}

                  <label htmlFor="actual-btn" className="custom-file-upload">
                    Choose Files
                    <input
                      multiple
                      type="file"
                      accept="video/*"
                      id="actual-btn"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="md:col-span-8">
                <VStack spacing="5">
                <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Please type your Title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
              
                  {/* description */}
                  <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      size='sm' placeholder='Input your description here...'  resize="none" onChange={(e) => {setDescription(e.target.value);}}>
                    </Textarea>
                  </FormControl>
                </VStack>
                <Button
                  colorScheme="blue"
                  width="25%"
                  style={{ marginTop: 15 }}
                  onClick={handleSubmit}
                  isLoading={loading}  
                >
                  Post
                </Button>
              </div>

          </div>
          
        </form>

        {uploadSuccess && (
          <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">
            <div className="text-2xl bg-white dark:bg-darkModeBlack dark:text-primary font-bold flex justify-center items-center h-screen w-screen">
              <h2>UPLOAD SUCCESS!</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
