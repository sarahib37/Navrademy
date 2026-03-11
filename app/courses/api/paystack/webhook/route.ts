import type { NextApiResponse } from "next";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: NextApiResponse) {
  const signature = req.headers["x-paystack-signature"];

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(req.rawBody)
    .digest("hex");

  if (hash !== signature) {
    return res.status(401).end();
  }

  const event = JSON.parse(req.rawBody);

  if (event.event === "charge.success") {
    const { reference, amount, customer, metadata } = event.data;

    // 🔒 Idempotency Check
    const existing = await db
      .collection("payments")
      .where("reference", "==", reference)
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(200).end(); // already processed
    }

    // Save Payment
    await db.collection("payments").add({
      reference,
      email: customer.email,
      amount,
      courseTitle: metadata.courseTitle,
      paidAt: new Date(),
      createdAt: new Date(),
    });

    // Send Confirmation Email
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

  return res.status(200).end();
}