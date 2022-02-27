import { request, response } from "express";
import Todos from "../models/Todos.js";

const obtenerTodos = async (req = request, res = response) => {
  const { from, limit, userId } = req.query;

  try {
    const todos = await Todos.find({ userId })
      .skip(Number(from))
      .limit(Number(limit))
      .sort({ createdAt: "desc" });

    return res.json({
      data: todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const crearTodo = async (req, res = response) => {
  try {
    const todo = new Todos(req.body);
    await todo.save();

    return res.json({
      msg: "Todo creado exitosamente",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const actualizarTodo = async (req, res = response) => {
  const { id } = req.params;

  try {
    const todo = await Todos.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({
      msg: "Todo editado exitosamente",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const borarTodo = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Todos.findByIdAndDelete(id);

    return res.json({
      msg: "Todo eliminado exitosamente",
      data: id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export { obtenerTodos, crearTodo, actualizarTodo, borarTodo };
