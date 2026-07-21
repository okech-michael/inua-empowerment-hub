import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { supabase } from "../config/supabase.config";

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? "1d";

if (!jwtSecret) {
  throw new Error("JWT_SECRET must be defined");
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: { sub: string; role: string; email: string }) => {
  const secret: Secret = jwtSecret;
  const options = { expiresIn: jwtExpiresIn } as SignOptions;
  return jwt.sign(payload, secret, options);
};

export const createUser = async (fullname: string, email: string, phone: string, passwordHash: string) => {
  const { data, error } = await supabase.from("users").insert([{ fullname, email, phone, password_hash: passwordHash, role: "user" }]).select().single();
  if (error) {
    throw error;
  }
  return data;
};

export const findUserByEmail = async (email: string) => {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  if (error) {
    return null;
  }
  return data;
};

export const findUserById = async (id: string) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) {
    return null;
  }
  return data;
};
