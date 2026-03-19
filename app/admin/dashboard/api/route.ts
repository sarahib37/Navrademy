import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ success: false, error: "No token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ success: true, message: "Welcome Admin", admin: decoded });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
  }
}