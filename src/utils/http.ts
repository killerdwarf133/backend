import type { Response } from "express";

export function notFound(res: Response, message = "Resource not found") {
  return res.status(404).json({ message });
}

export function badRequest(res: Response, message = "Invalid request") {
  return res.status(400).json({ message });
}
