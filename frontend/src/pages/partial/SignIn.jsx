import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  InputRightElement,
  InputGroup,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [intro, setIntro] = useState(
    <div className="fixed flex justify-center items-center text-center h-[100vh] w-screen z-40 bg-white dark:bg-black">
      <ThreeDots
        height={200}
        width={200}
        color="#4fa94d"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false)

   // HIDE AND SHOW OF PASSWORD WHEN ITS TRIGGER
   const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const globalUrl = process.env.REACT_APP_GLOBAL_URL

  const authenticate = async (userID) => {
    const body = {
      token: Math.floor(Math.random() * 1000000000),
      expiration: Date.now() + 7200000,
    };
    localStorage.setItem("//////", body.token);
    try {
      let url = `${globalUrl}/useraccounts/update/` + userID;
      let method = "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        
        
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };

        const response = await axios.get(
          `${globalUrl}/useraccounts/retrieveAll`,
          {
            headers: header,
          }
        );

        setAllUser(response.data);
        setTimeout(() => {
          setIntro(<></>);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIntro(
          <div className="fixed flex justify-center items-center text-center h-[100vh] w-screen z-40 text-3xl bg-white dark:bg-black">
            Please Reload Page...
          </div>
        );
      }
    };
    fetchData();
  }, [intro]);

  const signIn = async (e) => {
    
   
    setLoading(true); 

    const userToSignIn = allUser.find((user) => user.email === email);
  
    if (userToSignIn) {
      if (userToSignIn.password === password) {
        try {
          await authenticate(userToSignIn._id);
          localStorage.setItem("user", userToSignIn._id);
            navigate("/upload");
            window.location.reload(false);
        } catch (error) {
          console.error("Authentication error:", error);
          toast({
            title: "Error during authentication",
            status: "error",
            duration: "2000",
            isClosable: true,
            position: "bottom",
          });
        } finally {
          setLoading(false); 
        }
      } else {
        toast({
          title: "Password does not match",
          status: "warning",
          duration: "2000",
          isClosable: true,
          position: "bottom",
        });
        setLoading(false); 
      }
    } else {
      toast({
        title: "User not Found",
        status: "warning",
        duration: "2000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
     
      signIn(); 
    }
  };
  
  

  return (
    <>
      <section className="py-40 h-screen flex justify-center items-center" >
        {intro}
        <div className="container mx-auto">
        <div className="w-full sm:w-[80%] md:w-[90%] lg:w-[50%]  mx-auto px-10 sm:px-0">
          <VStack spacing="5">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <InputRightElement w="4.5rem">
                <Box onClick={handleShowPassword} _hover={{ cursor: "pointer" , color: "#3182CE" }} fontSize="2xl">
                  {showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                </Box>
                    
                  {/* <Button h="1.75rem" size="sm" onClick={handleShowPassword}>

                   
                  </Button> */}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={signIn}
              isLoading={loading}  
            >
              Log In
            </Button>
            
          </VStack>
        </div>
        </div>
      </section>
    </>
  );
};
