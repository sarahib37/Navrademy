import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // your admin SDK
import { getAuth } from "firebase-admin/auth";

export async function GET(req: NextRequest) {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];

    // 2. Verify token
    const decodedToken = await getAuth().verifyIdToken(token);
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json({ error: "No email in token" }, { status: 400 });
    }

    // 3. Fetch affiliate from Firestore
    const snapshot = await db
      .collection("affiliates")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Affiliate not found" },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // 4. Normalize response (IMPORTANT)
    const affiliate = {
      id: doc.id,
      ...data,
      created_at: data.created_at?.toDate?.().toISOString() || null,
    };

    return NextResponse.json({ affiliate });

  } catch (error: any) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}