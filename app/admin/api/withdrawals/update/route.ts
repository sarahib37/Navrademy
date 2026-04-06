import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { id, status, amount_paid } = await req.json();

    const updateData: any = {
      status,
      updated_at: new Date(),
    };

    if (amount_paid !== undefined) {
      updateData.amount_paid = amount_paid;
    }

    await db.collection("withdrawal_requests").doc(id).update(updateData);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}