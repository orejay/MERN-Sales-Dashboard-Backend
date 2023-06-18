import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ name: username });
    if ((user = [])) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user does not exist!" });
    }
    if (user[0].password !== password) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: `Wrong password!` });
    }
    res.status(StatusCodes.OK).json({ message: `Welcome ${user[0].name}!` });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
