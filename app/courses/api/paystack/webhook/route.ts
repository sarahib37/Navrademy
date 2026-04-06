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
      const referralCode = payment.metadata?.referralCode || "";
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

      if (referralCode) {
        const referralQuery = await db
          .collection("affiliates")
          .where("referral_code", "==", referralCode)
          .limit(1)
          .get();
      
        if (!referralQuery.empty) {
          const referralDoc = referralQuery.docs[0];
          const referralData = referralDoc.data()
          const commissionRate = Number((referralData.commission_rate)/100)
          const affiliateEarning = (amount/100)*commissionRate
      
          await referralDoc.ref.update({
            total_earnings: FieldValue.increment(affiliateEarning),
            pending_earnings: FieldValue.increment(affiliateEarning),
            referral_count: FieldValue.increment(1),
          });

          await db.collection("referrals").add({
            referralCode,
            courseTitle,
            affiliateEarning: affiliateEarning,
            amount: amount/100,
            email,
            reference: referenceId,
            created_at: new Date(),
          });
        }
      }

      await db.collection("payments").add({
        email,
        amount,
        coupon,
        referralCode,
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
          subject: "Yahhh 🎉 You’re officially one of #TheNavs",
          htmlContent: `
            <h2>Hi there 🥰,</h2>
            <p>I just had to write this little note to say I’m so, so excited for you.</p>
            <p>First of all, welcome to #TheNavs 🫶🏽 ( our little cult name 😃)</p>
            <p>And secondly… this is a big deal.</p>
            <p>You didn’t just register for a class. You just took a bold step towards yourself. Towards growth, towards upskilling, towards starting that new career you’ve probably been thinking about for a while now.</p>
            <p>And I really want you to pause and give yourself credit for that.</p>
            <p>At Navrademy, the vibe is simple: we learn, we grow, we show up for ourselves, and we do it with community, good energy, and people who are genuinely rooting for you.</p>
            <p>So I want you to know you’re stepping into something warm, practical, and full of possibility.</p>
            <p>Emphasis on practical.</p>
            <p>Classes start on 26th April, and we’ll keep you updated with everything you need before then. You’ll also be sent the community link soon.</p>
            <p>I’m really happy you’re here. Truly.</p>
            <p>This is the beginning of something beautiful, and I can’t wait for you to experience all that’s ahead.</p>
            <p>With love,</p>
            <p>Blessing</p>
            <p>Founder, Navrademy</p>
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