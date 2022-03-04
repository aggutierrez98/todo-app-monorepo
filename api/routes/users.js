import { Router } from "express";
import { check } from "express-validator";
import { login, register, renewToken } from "../controllers/users.js";
import { userAlreadyExistsByEmail } from "../helpers/dbValidators.js";
import { validateJWT, fieldsValidator } from "../middlewares/index.js";
const router = Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "Lastname is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email should be valid").isEmail(),
    check("email").custom(userAlreadyExistsByEmail),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidator,
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidator,
  ],
  login
);

router.get("/renew", validateJWT, renewToken);

export default router;
