import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import admin from "firebase-admin";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const email = decoded.email;
    const snapshot = await db
      .collection("withdrawal_requests")
      .where("email", "==", email)
      .orderBy("created_at", "desc")
      .get();

    const withdrawals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({withdrawals});
  } catch (err: any) {
    console.error("FIRESTORE ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Failed to fetch withdrawals" },
      { status: 500 }
    );
  }
}