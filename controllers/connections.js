import { connection } from "../models/connections.js";

const isConnect = async (userId1, userId2) => {
  const isData1 = await connection.findOne({ userId1, userId2 });
  const isData2 = await connection.findOne({
    userId1: userId2,
    userId2: userId1,
  });
  if (isData1) return false;
  if (isData2) return false;
  if (!isData1 && !isData2) return true;
  return false;
};

export const makeConnect = async (req, res) => {
  const { userId2 } = req.body;
  const userId1 = req.currUser._id;
  const bool = await isConnect(userId1, userId2);
  if (!bool) {
    return res.status(201).json({
      success: false,
      message: "connection is already present",
    });
  }
  const newConnect = await connection.create({
    userId1: userId1,
    userId2: userId2,
  });

  return res.status(200).json({
    success: true,
    message: "connection is created",
    newConnect,
  });
};

export const disConnect = async (req, res) => {
  const { userId2 } = req.body;
  const userId1 = req.currUser._id;
  const bool = await isConnect(userId1, userId2);
  if (bool) {
    return res.status(201).json({
      success: false,
      message: "connection has to be made",
    });
  }
  const isData1 = await connection.findOne({ userId1, userId2 });
  const isData2 = await connection.findOne({
    userId1: userId2,
    userId2: userId1,
  });
  if (isData1) {
    const dele = await isData1.deleteOne();
    return res.status(200).json({
      success: true,
      message: "connection broken",
      dele,
    });
  }
  if (isData2) {
    const dele = await isData2.deleteOne();
    return res.status(200).json({
      success: true,
      message: "connection broken",
      dele,
    });
  }
};

export const getAll = async (req, res) => {
  const userId = req.currUser._id;
  const Data1 = await connection.find({ userId1: userId });
  const Data2 = await connection.find({ userId2: userId });

  const newArray = [...Data1, ...Data2];
  const sortedArray = newArray.sort((a, b) => {
    return Number(b.createdAt) - a.createdAt;
  });
  return res.status(200).json({
    success: true,
    message: "all connections are retrived",
    size: newArray.length,
    sortedArray,
  });
};
