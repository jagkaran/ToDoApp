import { User } from "@/app/models/user";
import { connectDB, cookieSetter, generateToken } from "@/app/utils/features";
const { asynError, Errorhandler } = require("@/middleware/error");
import bcrypt from "bcrypt";

const handler = asynError(async (req, res) => {
  if (req.method !== "POST")
    return Errorhandler(400, res, "Only POST method is allowed.");

  const { email, password } = req.body;

  if (!email || !password) {
    return Errorhandler(400, res, "Please enter all required fields");
  }

  await connectDB();

  const user = await User.findOne({ email }).select("+password");

  if (!user) return Errorhandler(400, res, "Invalid Email or Password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return Errorhandler(400, res, "Incorrect Password");

  const token = generateToken(user._id);

  cookieSetter(res, token, true); //if true then register otherwise logout

  res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}`,
    user,
  });
});

export default handler;
