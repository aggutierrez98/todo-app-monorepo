import { Router } from "express";
import {
  obtenerTodos,
  crearTodo,
  actualizarTodo,
  borarTodo,
} from "../controllers/todos.js";
import { todoExistsById, userExistsById } from "../helpers/db-validators.js";
import { check } from "express-validator";
import { validarJWT, validarCampos } from "../middlewares/index.js";

const router = Router();

router.get("/", [validarJWT, validarCampos], obtenerTodos);

router.post(
  "/",
  [
    validarJWT,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("userId", "Should be valid MongoID").isMongoId(),
    check("userId").custom(userExistsById),
    validarCampos,
  ],
  crearTodo
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(todoExistsById),
    validarCampos,
  ],
  actualizarTodo
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(todoExistsById),
    validarCampos,
  ],
  borarTodo
);

export default router;
