import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cookies } from "next/headers"; 

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

  if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });

  const { title, content } = await req.json();
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  await addDoc(collection(db, "blogs"), {
    title,
    content,
    slug,
    createdAt: serverTimestamp(), 
  });

  return NextResponse.json({ success: true });
}