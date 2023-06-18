import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({
      name: { $regex: `^${username}$`, $options: "i" },
    });
    console.log(user);
    if (user.length < 1) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user does not exist!" });
    } else if (user[0].password !== password) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: `Wrong password!` });
    } else {
      res.status(StatusCodes.OK).json({
        message: `Welcome ${user[0].name}!`,
        details: {
          id: user[0]._id,
          username: user[0].name,
          role: user[0].role,
          occupation: user[0].occupation,
        },
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
