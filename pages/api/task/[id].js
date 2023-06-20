import { Task } from "@/app/models/tasks";
import { checkAuth, connectDB } from "@/app/utils/features";
import { Errorhandler, asynError } from "@/middleware/error";

const handler = asynError(async (req, res) => {
  await connectDB();

  const user = await checkAuth(req);

  if (!user) return Errorhandler(401, res, "Please login first.");

  const taskId = req.query.id;

  const task = await Task.findById(taskId);

  if (!task) return Errorhandler(404, res, "Task not found.");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    return Errorhandler(400, res, "This method is NOT allowed.");
  }
});

export default handler;
