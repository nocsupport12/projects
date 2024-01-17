import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./image-upload.css";



// RADIO MATERIAL-TAILWIND LIBRARY
import { Radio } from "@material-tailwind/react";
import { Button, Center, FormControl, FormLabel, Input, Text, Textarea, VStack, useToast } from "@chakra-ui/react";


export const ImageUpload = (userDetails) => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("news");
  const navigate = useNavigate();
  const toast = useToast();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const uploadFiles = async () => {
    setLoading(true)
    //
    try {
      let cloudName = "dijhxviqe";
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        setImageUrls((prevUrls) => [...prevUrls, secure_url]);
        fetchUploadImage(secure_url);
      }
      
      setUploadSuccess(true);

      
      setLoading(false);

      setTimeout(() => {
        navigate("/news");
      }, 2000);

      console.log("Files upload success");
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  const fetchUploadImage = async (imageSecureUrl) => {
    const body = {
      imageUrl: imageSecureUrl,
      category: "image",
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
    
    if (!title || title.trim() === "" || !description || description.trim() === "" || images.length < 1)  {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: "2000",
        isClosable: true,
        position: "bottom",
      })
    } else {
      uploadFiles();
    }
  }
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
    
   
  };
 
  
 
  

  return (
    <section className="font-poppins">
      <div className="container mx-auto">
        {/* <h2 className="text-center text-2xl pb-10 sm:text-4xl font-semibold dark:text-white">
          UPLOAD YOUR IMAGE BELOW!
        </h2> */}
        <form className="">
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
                {/* upload images */}
                <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black  h-full w-[100%] dark:bg-white">
                  {images.length > 0 ? (
                    <div className="flex flex-col justify-center items-center gap-3 text-center h-[170px]" style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
                      <img
                        className="mx-auto max-h-[150px] "
                        src={URL.createObjectURL(images[0])}
                        alt={images[0].name}
                      />
                      {images.map((image) => {
                        return <p key={image.name}>{image.name}</p>;
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-[4rem]">
                        <i className="fa-solid fa-folder-open"></i>
                      </span>
                      <p className="font-semibold text-center">Upload your image here</p>
                    </div>
                  )}

                  <label htmlFor="actual-btn" className="custom-file-upload">
                    Choose Files
                    <input
                      type="file"
                      accept="image/*"
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
                
                <div className="flex justify-center">
                  {loading && (
                    <ThreeDots
                      height={80}
                      width={80}
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                    />
                  )}
                </div>
               
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
