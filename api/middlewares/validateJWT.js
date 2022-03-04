import { response, request } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({
      msg: "No token sent in request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await Users.findOne({ _id: uid });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid token / expired token",
      });
    }

    req.usuario = user;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};
