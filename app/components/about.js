"use client";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own
const features = [
  {
    id: 1,
    text: "Create multiple lists to organize your tasks by project, category, or priority.",
  },
  {
    id: 2,
    text: "Set due dates and reminders to help you stay on track and meet deadlines.",
  },
  {
    id: 3,
    text: "Use color-coding to visually distinguish between tasks and lists.",
  },
  {
    id: 4,
    text: "Customize your app settings to suit your preferences.",
  },
];

export default function About() {
  const { colorMode } = useColorMode();

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"5xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Welcome to our Todo App!</Heading>
        <Text
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          fontSize={"xl"}
        >
          Our app is designed to help you stay organized and on top of your
          daily tasks. With our easy-to-use interface, you can quickly create
          and manage your to-do list, set reminders, and prioritize your tasks.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                {/* <Text fontWeight={600}>{feature.title}</Text> */}
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                  {feature.text}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        mt={10}
      >
        {/* <Heading fontSize={"3xl"}>Welcome to our Todo App!</Heading> */}
        <Text
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          fontSize={"xl"}
        >
          Our mission is to help you achieve your goals and maximize your
          productivity.
        </Text>
      </Stack>
    </Box>
  );
}
