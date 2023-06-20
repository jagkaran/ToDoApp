import { User } from "@/app/models/user";
import { connectDB, cookieSetter, generateToken } from "@/app/utils/features";
const { asynError, Errorhandler } = require("@/middleware/error");
import bcrypt from "bcrypt";

const handler = asynError(async (req, res) => {
  if (req.method !== "POST")
    return Errorhandler(400, res, "Only POST method is allowed.");

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return Errorhandler(400, res, "Please enter all required fields");
  }

  await connectDB();

  let user = await User.findOne({ email });

  if (user)
    return Errorhandler(400, res, "User already registered with this email");

  const maskedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: maskedPassword });

  const token = generateToken(user._id);

  cookieSetter(res, token, true); //if true then register otherwise logout

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user,
  });
});

export default handler;
