import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { COURSE_PRICES } from "@/lib/courses";
import { cookies } from "next/headers";

export async function POST() {
  try {
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
    console.log(data)

    const price = COURSE_PRICES[data.courseId];

    if (!price) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
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
          amount: price,
          courseTitle: data.courseTitle,
          metadata: {
            token,
          },
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/payment-success`,
        }),
      }
    );

    const paystackData = await paystackRes.json();

    return NextResponse.json({
      courseTitle: data.courseTitle,
      amount: price,
      authorization_url: paystackData.data.authorization_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}