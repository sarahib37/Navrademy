import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs" 
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature") || "";

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const payment = event.data;

      const email = payment.customer.email;
      const amount = payment.amount;
      const coupon = payment.metadata?.coupon || "";
      const courseTitle = payment.metadata?.courseTitle || "";
      const referenceId = payment.reference;

      const existing = await db
        .collection("payments")
        .where("reference", "==", referenceId)
        .limit(1)
        .get();

      if (!existing.empty) {
        return NextResponse.json({ message: "Already processed" });
      }

      if (coupon) {
        const couponQuery = await db
          .collection("coupons")
          .where("code", "==", coupon)
          .limit(1)
          .get();
      
        if (!couponQuery.empty) {
          const docRef = couponQuery.docs[0].ref;
      
          await docRef.update({
            usage_count: FieldValue.increment(1),
          });
        }
      }

      await db.collection("payments").add({
        email,
        amount,
        coupon,
        courseTitle,
        reference: referenceId,
        status: "success",
        created_at: new Date(),
      });

      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: { email: "hello@navrademy.com", name: "Navrademy" },
          to: [{ email }],
          subject: "Payment Confirmed - Course Enrollment",
          htmlContent: `
            <h2>Payment Successful</h2>
            <p>You are successfully enrolled in:</p>
            <strong>${courseTitle}</strong>
            <p>Reference: ${referenceId}</p>
            <p>We will contact you with next steps.</p>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "GET not allowed" }, { status: 405 });
}