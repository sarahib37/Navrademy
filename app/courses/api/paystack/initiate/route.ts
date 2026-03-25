import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { coupon } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("payment_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not verified" }, { status: 401 });
    }

    const snapshot = await db
      .collection("email_verifications")
      .where("token", "==", token)
      .where("verified", "==", true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const data = snapshot.docs[0].data();

    let courseTitle = data.courseTitle;
    let originalAmount = data.courseAmount; 
    let finalAmount = originalAmount;
    let discount = 0;

    // ✅ APPLY COUPON
    if (coupon) {
      const couponQuery = await db
        .collection("coupons")
        .where("code", "==", coupon.toUpperCase())
        .where("is_active", "==", true)
        .limit(1)
        .get();

      if (!couponQuery.empty) {
        const couponData = couponQuery.docs[0].data();

        const isExpired =
          couponData.usage_count >= couponData.usage_limit;

        const validForCourse =
          !couponData.course_id ||
          couponData.course_id === data.courseId;

        if (!isExpired && validForCourse) {
          if (couponData.discount_type === "percentage") {
            discount =
              (originalAmount * couponData.discount_value) / 100;
          } else {
            discount = couponData.discount_value * 100;
          }

          finalAmount = Math.max(originalAmount - discount, 0);
        }


      } else {
        return NextResponse.json({
          error: "Invalid coupon code",
        }, { status: 400 });
      }
    }

    // ✅ PAYSTACK INIT
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          amount: finalAmount,
          metadata: {
            token,
            courseTitle,
            coupon: coupon || null,
            originalAmount,
            discount,
          },
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/payment-success`,
        }),
      }
    );

    const paystackData = await paystackRes.json();

    return NextResponse.json({
      courseTitle: data.courseTitle,
      originalAmount,
      finalAmount,
      discount,
      authorization_url: paystackData.data.authorization_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}