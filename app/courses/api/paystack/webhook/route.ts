// app/paystack/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";

export const config = {
  runtime: "nodejs", // ensures Node runtime for Firebase Admin
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // get raw body
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
      const { reference, amount, customer, metadata } = event.data;

      // 🔒 Idempotency check
      const existing = await db
        .collection("payments")
        .where("reference", "==", reference)
        .limit(1)
        .get();

      if (!existing.empty) {
        return NextResponse.json({ message: "Already processed" });
      }

      // Save payment
      await db.collection("payments").add({
        reference,
        email: customer.email,
        amount,
        courseTitle: metadata.courseTitle,
        paidAt: new Date(),
        createdAt: new Date(),
      });

      // Send confirmation email
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: { email: "hello@yourdomain.com", name: "Your Academy" },
          to: [{ email: customer.email }],
          subject: "Payment Confirmed - Course Enrollment",
          htmlContent: `
            <h2>Payment Successful</h2>
            <p>You are successfully enrolled in:</p>
            <strong>${metadata.courseTitle}</strong>
            <p>Reference: ${reference}</p>
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

// Optional: block other methods
export async function GET() {
  return NextResponse.json({ error: "GET not allowed" }, { status: 405 });
}