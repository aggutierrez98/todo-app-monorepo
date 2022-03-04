import { request, response } from "express";
import Todos from "../models/Todos.js";

const getTodos = async (req = request, res = response) => {
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
      msg: "Server error",
    });
  }
};

const createTodo = async (req, res = response) => {
  try {
    const todo = new Todos(req.body);
    await todo.save();

    return res.json({
      msg: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

const updateTodo = async (req, res = response) => {
  const { id } = req.params;

  try {
    const todo = await Todos.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({
      msg: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

const deleteTodo = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Todos.findByIdAndDelete(id);

    return res.json({
      msg: "Todo deleted successfully",
      data: id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
