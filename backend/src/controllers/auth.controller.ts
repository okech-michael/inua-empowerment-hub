import type { RequestHandler } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { createUser, findUserByEmail, findUserById, hashPassword, comparePassword, generateToken } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";

export const register: RequestHandler = async (req, res) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Invalid registration data", error: validation.error.flatten() });
  }

  const { fullname, email, phone, password } = validation.data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(fullname, email, phone, passwordHash);
  const token = generateToken({ sub: user.id, role: user.role, email: user.email });

  return res.status(201).json({ success: true, message: "User registered successfully", data: { user: { id: user.id, fullname: user.fullname, email: user.email, phone: user.phone, role: user.role }, token } });
};

export const login: RequestHandler = async (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Invalid login data", error: validation.error.flatten() });
  }

  const { email, password } = validation.data;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const validPassword = await comparePassword(password, user.password_hash);
  if (!validPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken({ sub: user.id, role: user.role, email: user.email });
  return res.json({ success: true, message: "Login successful", data: { token, user: { id: user.id, fullname: user.fullname, email: user.email, phone: user.phone, role: user.role } } });
};

export const logout: RequestHandler = async (_req, res) => {
  return res.json({ success: true, message: "Logout successful" });
};

export const me: RequestHandler = async (req, res) => {
  const userId = (req as AuthRequest).user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = await findUserById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({ success: true, data: { user: { id: user.id, fullname: user.fullname, email: user.email, phone: user.phone, role: user.role } } });
};
