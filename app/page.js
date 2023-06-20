import AddToDo from "./components/addTodo";
import {
  Text,
  FormControl,
  Stack,
  CustomBox,
} from "./components/chakra-components";
import TodoButtons from "./components/todoButtons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchToDos = async (token) => {
  try {
    const result = await fetch(`${process.env.HOST}/api/mytask`, {
      cache: "no-cache",
      headers: { cookie: `token=${token}` },
    });

    const data = await result.json();
    if (!data.success) return [];
    return data.tasks;
  } catch (error) {
    return [];
  }
};

export default async function Home() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");
  const tasks = await fetchToDos(token);
  return (
    <main>
      <AddToDo />
      {tasks?.map((task) => (
        <>
          {" "}
          <CustomBox key={task._id}>
            <FormControl>
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "initial", md: "center" }}
              >
                <Stack mr={{ base: "0", md: "8" }} mb={{ base: "4", md: "0" }}>
                  <Text as="b" fontSize="xl">
                    {task.title}
                  </Text>
                  <Text>{task.description}</Text>
                </Stack>
                <Stack
                  direction={{ base: "row", md: "row" }}
                  spacing={"6"}
                  align={{ base: "center", md: "center" }}
                >
                  <TodoButtons
                    key={task._id}
                    id={task._id}
                    isCompleted={task.isCompleted}
                  />
                </Stack>
              </Stack>
            </FormControl>
          </CustomBox>
        </>
      ))}
    </main>
  );
}
