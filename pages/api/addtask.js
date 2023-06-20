import { checkAuth, connectDB } from "@/app/utils/features";
import { Task } from "../../app/models/tasks";
import { Errorhandler, asynError } from "@/middleware/error";

const handler = asynError(async (req, res) => {
  if (req.method !== "POST")
    return Errorhandler(400, res, "Only POST method is allowed.");

  await connectDB();

  const { title, description } = req.body;

  if (!title || !description)
    return Errorhandler(400, res, "Please fill all fields");

  const user = await checkAuth(req);

  if (!user) return Errorhandler(401, res, "Please login first.");

  await Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message: "Task created",
  });
});

export default handler;
