import Todos from "../models/Todos.js";
import Users from "../models/Users.js";

export const userExistsById = async (id) => {
  const existeId = await Users.findById(id);
  if (!existeId) {
    throw new Error(`Id doesn't exists: ${id}`);
  }
};

export const userAlreadyExistsByEmail = async (email) => {
  const existeEmail = await Users.findOne({ email });
  if (existeEmail) {
    throw new Error(`Email already registered`);
  }
};

export const todoExistsById = async (id) => {
  const existeId = await Todos.findById(id);
  if (!existeId) {
    throw new Error(`Id doesn't exists: ${id}`);
  }
};
