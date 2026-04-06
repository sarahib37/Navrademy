import { NextRequest, NextResponse } from "next/server";
import { db, auth, adminFieldValue } from "@/lib/firebaseAdmin";

const BOOST_CODE = "ELITE10";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await auth.verifyIdToken(token);

    // 2. Parse JSON (Next.js handles this cleanly)
    const body = await req.json();
    const code = body?.code;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code required" }, { status: 400 });
    }

    const normalizedCode = code.trim().toUpperCase();

    // 3. Validate code
    if (normalizedCode !== BOOST_CODE) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // 4. Fetch affiliate
    const snapshot = await db
      .collection("affiliates")
      .where("email", "==", decoded.email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    const affiliateRef = snapshot.docs[0].ref;
    const affiliateData = snapshot.docs[0].data();

    // ❗ FIXED (no .exists)
    if (!affiliateData) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    // 5. Prevent reuse
    if ((affiliateData?.commission_rate ?? 5) >= 10) {
      return NextResponse.json({ error: "Already upgraded" }, { status: 400 });
    }

    // 6. Update
    await affiliateRef.update({
      commission_rate: 10,
      boost_code_used: true,
      boosted_at: adminFieldValue.serverTimestamp(),
    });

    return NextResponse.json({ new_rate: 10 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}