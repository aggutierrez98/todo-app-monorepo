import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.js";
import { todoExistsById, userExistsById } from "../helpers/dbValidators.js";
import { check } from "express-validator";
import { validateJWT, fieldsValidator } from "../middlewares/index.js";

const router = Router();

router.get("/", [validateJWT, fieldsValidator], getTodos);

router.post(
  "/",
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("userId", "Should be valid MongoID").isMongoId(),
    check("userId").custom(userExistsById),
    fieldsValidator,
  ],
  createTodo
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Should be valid MongoID").isMongoId(),
    check("id").custom(todoExistsById),
    fieldsValidator,
  ],
  updateTodo
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Should be valid MongoID").isMongoId(),
    check("id").custom(todoExistsById),
    fieldsValidator,
  ],
  deleteTodo
);

export default router;
