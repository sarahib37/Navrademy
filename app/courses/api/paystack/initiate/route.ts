import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { coupon, referralCode } = await req.json();

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
    
    const courseQuery = await db
      .collection("courses")
      .where("id", "==", data.courseId)
      .limit(1)
      .get();

    if (courseQuery.empty) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const course = courseQuery.docs[0].data();
 
    let originalAmount = course.price;
    let discount = 0;
    let finalAmount = originalAmount;

    if (coupon) {
      const couponQuery = await db
        .collection("coupons")
        .where("code", "==", coupon.toUpperCase())
        .where("is_active", "==", true)
        .limit(1)
        .get();
      
      if (couponQuery.empty) {
        return NextResponse.json({ error: "Invalid coupon" }, { status: 400 });
      }

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
    }

    const expectedFinalAmount = Math.max((data.courseAmount)/100 - discount, 0);
    if (finalAmount !== expectedFinalAmount) {
      return NextResponse.json({
        error: "Amount mismatch detected",
      }, { status: 400 });
    }

    if (finalAmount < 90000) {
      return NextResponse.json({
        error: "Amount too low",
      }, { status: 400 });
    }

    let validReferralCode = null;

    if (referralCode) {
      const refQuery = await db
        .collection("affiliates")
        .where("referral_code", "==", referralCode)
        .limit(1)
        .get();

      if (!refQuery.empty) {
        const refData = refQuery.docs[0].data();

        if (refData.email !== data.email) {
          validReferralCode = referralCode;
        }
      }
    }

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
          amount: finalAmount * 100,
          metadata: {
            token,
            courseTitle: data.courseTitle,
            coupon: coupon || null,
            referralCode: validReferralCode || null,
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
      email: data.email,
      duration: course?.duration,
      curriculum: course?.curriculum,
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