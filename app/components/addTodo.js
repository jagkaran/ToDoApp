"use client";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Context } from "./providers";

export default function AddToDo() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const toast = useToast();

  const router = useRouter();

  const { user } = useContext(Context);

  const addTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addtask", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setTitle("");
        setDescription("");
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.refresh();
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

  if (!user._id) return redirect("/login");

  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"} mb={4}>
            Welcome to our Todo App
          </Heading>
          <form onSubmit={addTaskHandler}>
            <FormControl id="title">
              <FormLabel>Task Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter your title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" mt={6}>
              <FormLabel>Task Description</FormLabel>
              <Textarea
                placeholder="Enter your task here"
                size="md"
                resize="none"
                focusBorderColor="blue.500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6} mt={6}>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Add a Task
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
