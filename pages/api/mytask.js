import { checkAuth, connectDB } from "@/app/utils/features";
import { Task } from "../../app/models/tasks";
import { Errorhandler, asynError } from "@/middleware/error";

const handler = asynError(async (req, res) => {
  if (req.method !== "GET")
    return Errorhandler(400, res, "Only GET method is allowed.");

  await connectDB();

  const user = await checkAuth(req);

  if (!user) return Errorhandler(401, res, "Please login first.");

  const tasks = await Task.find({ user: user._id });

  res.json({
    success: true,
    tasks,
  });
});

export default handler;
