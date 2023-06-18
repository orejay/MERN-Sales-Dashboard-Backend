import OverallStat from "../models/OverallStat.js";
import { StatusCodes } from "http-status-codes";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find({});

    res.status(StatusCodes.OK).json(overallStats[0]);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};
