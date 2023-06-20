import { cookieSetter } from "@/app/utils/features";
const { asynError, Errorhandler } = require("@/middleware/error");

const handler = asynError(async (req, res) => {
  if (req.method !== "GET")
    return Errorhandler(400, res, "Only GET method is allowed.");

  cookieSetter(res, null, false); //if true then register otherwise logout

  res.status(200).json({
    success: true,
    message: `Logged out Successfully`,
  });
});

export default handler;
