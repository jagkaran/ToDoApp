import { checkAuth } from "@/app/utils/features";
const { asynError, Errorhandler } = require("@/middleware/error");

const handler = asynError(async (req, res) => {
  if (req.method !== "GET")
    return Errorhandler(400, res, "Only GET method is allowed.");

  const user = await checkAuth(req);

  if (!user) return Errorhandler(401, res, "Please login first.");

  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;
