"use client";
import React, { useContext } from "react";
import { HamburgerIcon, SunIcon, MoonIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Context } from "./providers";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Hook for adding color mode toggle

  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useColorModeValue("gray.200", "gray.700");

  const { user, setUser } = useContext(Context);

  const toast = useToast();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success) {
        setUser({});
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href="/">
                <Image
                  borderRadius="full"
                  boxSize="45px"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Microsoft_To-Do_icon.svg"
                  alt="Todo Logo"
                />
              </Link>
            </Box>
          </HStack>
          <Flex alignItems={"center"} gap={3}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              fontSize={"2xl"}
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Button
                variant="ghost"
                as={Link}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: color,
                }}
                href="/about"
              >
                About
              </Button>
              {user._id ? (
                <>
                  <Button
                    variant="ghost"
                    px={2}
                    py={1}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: color,
                    }}
                    href="/profile"
                    as={Link}
                  >
                    Profile
                  </Button>

                  <Button
                    variant="ghost"
                    px={2}
                    py={1}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: color,
                    }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  as={Link}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: color,
                  }}
                  href="/login"
                >
                  Login
                </Button>
              )}
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button
                variant="ghost"
                as={Link}
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: color,
                }}
                href="/about"
              >
                About
              </Button>

              {user.id ? (
                <Button
                  variant="ghost"
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: color,
                  }}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  as={Link}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: color,
                  }}
                  href="/login"
                >
                  Login
                </Button>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
