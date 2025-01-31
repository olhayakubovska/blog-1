import { verifyToken } from "../helpers/token.js";
import User from "../models/User.js";

export const authenticated = async (req, res, next) => {
  const tokenData = verifyToken(req.cookies.token);
  const user = await User.findOne({ _id: tokenData.id });
  if (!user) {
    res.send({ error: "user not authenticated" });
    return;
  }

  req.user = user;
  next();
};
//?
