import { USER_ROLE } from "../constants.js";
import { generateToken } from "../helpers/token.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function register(login, password) {
  if (!password) {
    throw new Error("Empty password ");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: hashedPassword });
  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
}

export async function loginFn(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found ");
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    throw new Error("Wrong password ");
  }

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
}

export function getUsers() {
  return User.find();
}

export function getRoles() {
  return [
    { id: USER_ROLE.ADMIN, name: "Admin" },
    { id: USER_ROLE.MODERATOR, name: "Moderator" },
    { id: USER_ROLE.USER, name: "User" },
  ];
}

export function deleteUser(userId) {
  return User.deleteOne({ _id: userId });
}
export function updateUser(userId, userData) {
  return User.findByIdAndUpdate(userId, userData, { returnDocument: "after" });
}
