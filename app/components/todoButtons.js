"use client";
import React, { useState } from "react";
import { Button, Checkbox, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const TodoButtons = ({ id, isCompleted }) => {
  const toast = useToast();
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const result = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.success) {
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

  // const [isCompleted, setIsCompleted] = useState(false);
  const toggleCheckbox = async (id) => {
    try {
      const result = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await result.json();
      if (data.success) {
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
  return (
    <>
      <Checkbox
        size="lg"
        isChecked={isCompleted}
        onChange={() => toggleCheckbox(id)}
      />
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        onClick={() => deleteHandler(id)}
      >
        Delete
      </Button>
    </>
  );
};

export default TodoButtons;
