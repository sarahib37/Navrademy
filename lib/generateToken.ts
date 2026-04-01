import crypto from "crypto";

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function generateCode(name: string){
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${clean}${rand}`;
};