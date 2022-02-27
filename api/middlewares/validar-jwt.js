import { response, request } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corresponde al uid
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
