import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await db
      .collection("affiliates")
      .orderBy("created_at", "desc")
      .get();
    
    console.log(snapshot.size)

    const affiliates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(affiliates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch affiliates" },
      { status: 500 }
    );
  }
}