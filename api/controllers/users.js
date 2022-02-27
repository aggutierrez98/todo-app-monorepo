import bcryptjs from "bcryptjs";
import { request, response } from "express";
import generarJWT from "../helpers/generar-jwt.js";
import Users from "../models/Users.js";

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    //Verificar si el email existe
    if (!user) {
      return res.status(400).json({
        msg: "Wrong credentials",
      });
    }

    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Wrong credentials",
      });
    }

    //Generar el JWT
    const token = await generarJWT(user.id);

    const userReturned = {
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };

    return res.json({
      user: userReturned,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Server problem",
    });
  }
};

const register = async (req = request, res = response) => {
  const { name, lastName, email, password } = req.body;

  try {
    const user = new Users({ name, lastName, email, password });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();

    const userReturned = {
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(201).json({
      user: userReturned,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server problem",
    });
  }
};

const revalidarToken = async (req = request, res = response) => {
  const { _id, name } = req.usuario;

  try {
    // Generar JWT
    const token = await generarJWT(_id, name);
    const user = await Users.findById(_id);

    const userReturned = {
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };

    res.json({
      token,
      user: userReturned,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server problem",
    });
  }
};

export { login, register, revalidarToken };
