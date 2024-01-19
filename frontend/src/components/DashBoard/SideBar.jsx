import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaUsers,
  FaHeadset,
  FaShoppingCart,
  FaUserFriends,
} from "react-icons/fa";
import { FiClipboard, FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export const SideBar = ({ userDetails, setTab, tab, isOpen, onClose }) => {
  const [privilege, setPrivilege] = useState([]);
  useEffect(() => {
    if (userDetails) {
      setPrivilege(
        userDetails?.privilegeaccess ? userDetails?.privilegeaccess : []
      );
    }
  }, [userDetails]);
  const menu = (
    <>
      <Link
        onClick={(e) => {
          setTab("profile");
          onClose();
        }}
      >
        <Flex
          align="center"
          gap={5}
          backgroundColor={tab === "profile" ? "blue.500" : ""}
          borderRadius={5}
          px={2}
          py={2}
          mb={2}
          _hover={{
            bg: "blue.500",
            borderRadius: "5",
          }}
        >
          <Icon as={FaUser} />
          <Text as="p">Profile</Text>
        </Flex>
      </Link>
      {privilege.includes("administrator") && (
        <Link
          onClick={(e) => {
            setTab("employee");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "employee" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FaUsers} />
            <Text>Administrator</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("chats") && (
        <Link
          onClick={(e) => {
            setTab("chats");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "chats" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiMessageSquare} />
            <Text>Chats Management</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("customerservice") && (
        <Link
          onClick={(e) => {
            setTab("support");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "support" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FaHeadset} />
            <Text>Customer Support Representative</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("sales") && (
        <Link
          onClick={(e) => {
            setTab("sales");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "sales" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FaShoppingCart} />
            <Text>Sales Marketing</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("dispatch") && (
        <Link
          onClick={(e) => {
            setTab("dispatch");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "dispatch" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiClipboard} />
            <Text>Dispatch</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("noc") && (
        <Link
          onClick={(e) => {
            setTab("noc");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "noc" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiClipboard} />
            <Text>NOC</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("billing") && (
        <Link
          onClick={(e) => {
            setTab("accounting");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "accounting" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiClipboard} />
            <Text>Billing/Accounting</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("osp") && (
        <Link
          onClick={(e) => {
            setTab("osp");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "osp" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiClipboard} />
            <Text>OSP/Engineering</Text>
          </Flex>
        </Link>
      )}
      {privilege.includes("completed") && (
        <Link
          onClick={(e) => {
            setTab("completed");
            onClose();
          }}
        >
          <Flex
            align="center"
            gap={5}
            backgroundColor={tab === "completed" ? "blue.500" : ""}
            borderRadius={5}
            px={2}
            py={2}
            mb={2}
            _hover={{
              bg: "blue.500",
              borderRadius: "5",
            }}
          >
            <Icon as={FiClipboard} />
            <Text>Completed</Text>
          </Flex>
        </Link>
      )}
    </>
  );

  // SIDE BAR
  return (
    <div className="px-3 sticky top-0 ">
      {/* SIDEBAR */}
      <VStack mt={10} display={{ base: "none", md: "none", lg: "block" }}>
        {menu}
      </VStack>

      {/* DRAWER SIDEBAR */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton color="white" />

            <DrawerBody p={0} className="bg-gray-800 text-white">
              <VStack mt={14} align="left" px={3}>
                {menu}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};
