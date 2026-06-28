import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { User, type UserDocument } from "../models/User.js";
import { hashPassword, publicUser, signToken, verifyPassword } from "../utils/auth.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const passwordHash = await hashPassword(data.password);
    const user = (await User.create({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone ?? "",
      passwordHash,
      role: "user"
    })) as UserDocument;

    return res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = (await User.findOne({ email: data.email.toLowerCase() })) as UserDocument | null;
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ user: publicUser(req.user!) });
});

export default router;
