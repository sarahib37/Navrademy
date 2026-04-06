import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { referralCode } = await req.json();

    if (!referralCode) {
      return NextResponse.json({ status: "invalid" });
    }

    const snapshot = await db
      .collection("affiliates")
      .where("referral_code", "==", referralCode)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ status: "invalid" });
    }

    return NextResponse.json({ status: "valid" });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}