import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;

    const {
      amount,
      bank_name,
      account_number,
      account_name,
    } = body;

    // 🔴 1. Basic validation
    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    // 🔴 2. Get affiliate (TRUST SOURCE)
    const affiliateQuery = await db
    .collection("affiliates")
    .where("email", "==", email)
    .limit(1)
    .get();

    if (affiliateQuery.empty) {
    return NextResponse.json({ success: false, error: "Affiliate not found" }, { status: 404 });
    }

    const affiliateDoc = affiliateQuery.docs[0];
    const affiliateRef = affiliateDoc.ref;
    const affiliate = affiliateDoc.data();

    const pending = affiliate.pending_earnings || 0;

    // 🔴 3. Balance check (CRITICAL)
    if (amount > pending) {
      return NextResponse.json(
        { success: false, error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // 🔴 4. Prevent rapid duplicate withdrawals
    const recentRequests = await db
      .collection("withdrawal_requests")
      .where("email", "==", affiliate.email)
      .where("status", "==", "pending")
      .get();

    if (!recentRequests.empty) {
      return NextResponse.json(
        { success: false, error: "You already have a pending withdrawal" },
        { status: 400 }
      );
    }

    // 🔴 5. Atomic update (VERY IMPORTANT)
    await db.runTransaction(async (transaction) => {
      const freshSnap = await transaction.get(affiliateRef);
      const freshData = freshSnap.data()!;

      if (amount > freshData.pending_earnings) {
        throw new Error("Balance changed, try again");
      }

      // Deduct balance
      transaction.update(affiliateRef, {
        pending_earnings: FieldValue.increment(-amount),
      });

      // Create withdrawal request
      const withdrawalRef = db.collection("withdrawal_requests").doc();

      transaction.set(withdrawalRef, {
        email: affiliate.email,
        amount,
        amount_paid: Number(0),
        bank_name,
        account_number,
        account_name,
        status: "pending",
        created_at: new Date(),
      });
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Withdrawal failed" },
      { status: 500 }
    );
  }
}