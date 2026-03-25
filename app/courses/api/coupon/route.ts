import { db } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
      const { coupon } = await req.json();
  
      if (!coupon) {
        return Response.json({ error: "No coupon provided" }, { status: 400 });
      }
  
      const cookieStore = await cookies();
      const token = cookieStore.get("payment_session")?.value;
  
      if (!token) {
        return Response.json({ error: "Not verified" }, { status: 401 });
      }
  
      const snapshot = await db
        .collection("email_verifications")
        .where("token", "==", token)
        .where("verified", "==", true)
        .limit(1)
        .get();
  
      if (snapshot.empty) {
        return Response.json({ error: "Invalid session" }, { status: 401 });
      }
  
      const session = snapshot.docs[0].data();
  
      const originalAmount = session.courseAmount;
      const courseId = session.courseId;
  
      const couponQuery = await db
        .collection("coupons")
        .where("code", "==", coupon.toUpperCase())
        .limit(1)
        .get();
  
      // ❌ NOT FOUND
      if (couponQuery.empty) {
        return Response.json({ status: "not_found" });
      }
  
      const c = couponQuery.docs[0].data();
  
      // ❌ EXPIRED
      if (c.usage_count >= c.usage_limit) {
        return Response.json({ status: "expired" });
      }
  
      // ❌ WRONG COURSE
      if (c.course_id && c.course_id !== courseId) {
        return Response.json({ status: "invalid_course" });
      }
  
      // ✅ VALID
      let discount = 0;
  
      if (c.discount_type === "percentage") {
        discount = (originalAmount * c.discount_value) / 100;
      } else {
        discount = c.discount_value * 100;
      }
  
      const finalAmount = Math.max(originalAmount - discount, 0);
  
      return Response.json({
        status: "valid",
        originalAmount,
        finalAmount,
        discount,
      });
  
    } catch {
      return Response.json({ error: "Validation failed" }, { status: 500 });
    }
  }