"use client";
import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Context } from "./providers";
import { redirect } from "next/navigation";

const Login = () => {
  const { colorMode } = useColorMode();

  const toast = useToast();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
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

  if (user._id) {
    redirect("/");
  }

  return (
    <Flex
      minH={"100vh"}
      align={"start"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text
            fontSize={"lg"}
            color={colorMode === "light" ? "gray.600" : "gray.300"}
          >
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <form onSubmit={loginHandler}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"center"}
                  justify={{ base: "center", sm: "end" }}
                >
                  <Link color={"blue.400"} href="/register">
                    New User?
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};

export default Login;
