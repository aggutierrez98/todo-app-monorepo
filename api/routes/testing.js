import { Router } from "express";
import Todos from "../models/Todos.js";
import Users from "../models/Users.js";
const router = Router();

router.post("/resetUsers", async (_, res) => {
  await Users.deleteMany({});

  return res.status(201).end();
});

router.post("/resetTodos", async (_, res) => {
  await Todos.deleteMany({});

  return res.status(201).end();
});

export default router;
