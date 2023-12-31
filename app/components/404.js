/* eslint-disable react/no-unescaped-entities */
"use client";
import { Box, Heading, Text, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
export default function NotFound404() {
  const { colorMode } = useColorMode();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.400, blue.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={colorMode === "light" ? "gray.600" : "gray.300"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        as={Link}
        href={"/"}
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"
      >
        Go to Home
      </Button>
    </Box>
  );
}
