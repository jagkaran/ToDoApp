"use client";

import {
  Text,
  Box,
  Flex,
  FormControl,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const CustomBox = ({ children }) => {
  return (
    <Box
      w="100%"
      maxW="800px"
      mx="auto"
      px="4"
      py="8"
      bg={useColorModeValue("gray.100", "gray.700")}
      align={{ base: "initial", md: "center" }}
      mt={6}
      boxShadow="xl"
      borderRadius="md"
    >
      {children}
    </Box>
  );
};
export { Text, Box, Flex, FormControl, Stack, CustomBox };
