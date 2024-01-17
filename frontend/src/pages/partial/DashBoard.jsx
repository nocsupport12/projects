import React, {  useEffect, useState } from "react";
import {
  SideBar,
  WindowDisplay,
} from "../../components/DashBoard/compiler/index";

import { Box, Container, Flex, Icon, Img, Input, InputGroup, InputLeftElement, Text, useDisclosure } from "@chakra-ui/react";

import {FiClipboard, FiMenu , FiMessageSquare } from 'react-icons/fi';

import Logo from "../../assets/logo-removebg-preview.png";

import { Profile } from "../../components/DashBoard/Windows/Profile";
import { retrieveAllClientDB } from "../../components/Api/ClientsApi";
import { ProgressBar } from "react-loader-spinner";

export const DashBoard = ({ userDetails }) => {
  const [tab, setTab] = useState("profile");
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [display, setDisplay] = useState(<Profile userDetails={userDetails} />);
  const [allClients, setAllClients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const LoadingWindow = (
    <Flex w="100%" h="90vh" justify="center" align="center">

      <ProgressBar
        visible={true}
        height="250"
        width="250"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Flex>
  );

  const fetchAllClients = async () => {

    setDisplay(LoadingWindow);
    try {
      const data = await retrieveAllClientDB();

      setAllClients(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchAllClients();
  }, []);

  useEffect(() => {
    if (allClients.length !== 0) {
      if (tab === "clients") {
        const presentTab = tab;
        setTab("loading"); //loading window
        setTimeout(() => {
          setTab(presentTab);
        }, 5000);
      }
    }
  }, [allClients]);



  return (
    <Flex 
      flexDir="column" 
      h="100vh" 
      pos="fixed"
      inset={0}  
      w='100vw'
      bg="gray.800"
      style={{ zIndex: 214  }}
      className="font-poppins"
      >
       {!isLoaded && <>{LoadingWindow}</>}
       {isLoaded && (
        <>
          {/* HEADER */}
          <Box  h="10%" bg="gray.800" color="white">
            {/* DRAWER BUTTON */}
            <Container maxW="container.xl" h="100%" w="100%">
            <Flex justify={{base: "space-between",lg: "space-between"}} align="center" h="100%" w="100%">
              <Flex align="center" gap={3} display={{base: "none", md: "flex"}}>
                <Img h="40px" src={Logo} alt="bicol-community" />
                <Text>Bicol One</Text>
              </Flex>

              <Flex gap={2} align="center" >
              
                
                <Box cursor="pointer" display={{ base: 'block', md: 'block', lg: "none" }} onClick={onOpen}>
                  <Icon as={FiMenu} boxSize={6} />
                </Box>

              </Flex>
              </Flex>
            </Container>
            
            
          </Box>

          <Flex
            h="90%"
          >
            {/* SIDEBAR */}
            <Box h="100%" display={{base: "none", lg:"block"}} w={{ lg:'25%', xl: '20%'}} bg="gray.900" color="white" borderRight="2px solid" borderColor="gray.800" boxShadow={10}>
              <SideBar
                userDetails={userDetails.userDetails}
                tab={tab}
                setTab={setTab}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Box>

            {/* WINDOW DISPLAY */}
            <Box  w={{base:"100%" , md: "100%" ,lg:'75%', xl: '80%'}} bg="gray.900" color="white">
              <WindowDisplay 
                userDetails={userDetails.userDetails}
                tab={tab}
                setTab={setTab}
                LoadingWindow={LoadingWindow}
                display={display}
                setDisplay={setDisplay}
                setIsLoaded={setIsLoaded}
                allClients={allClients}
                setAllClients={setAllClients} 

                    />
              
            </Box>
          </Flex>
        </>
       )}
      
      
    </Flex>
  );
};
