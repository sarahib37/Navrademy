import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
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

    const courseQuery = await db
      .collection("courses")
      .where("id", "==", data.courseId)
      .limit(1)
      .get();
    if (courseQuery.empty) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const course = courseQuery.docs[0].data();

    return NextResponse.json({
      courseTitle: data.courseTitle,
      email: data.email,
      duration: course?.duration,
      curriculum: course?.curriculum,
      originalAmount: data.courseAmount,
    });

  } catch {
    return NextResponse.json({ error: "Preview failed" }, { status: 500 });
  }
}