"use client";
import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Context } from "./providers";
import { redirect } from "next/navigation";

export default function Profile() {
  const { user } = useContext(Context);

  if (!user._id) redirect("/login");

  return (
    <Flex
      minH={"100vh"}
      align={"start"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile
        </Heading>
        <Divider />

        <Stack spacing={3} direction={["row", "row"]}>
          <Text>Username:</Text>
          <Text>{user?.name}</Text>
        </Stack>

        <Stack spacing={3} direction={["row", "row"]}>
          <Text>Email Address:</Text>
          <Text>{user?.email}</Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
