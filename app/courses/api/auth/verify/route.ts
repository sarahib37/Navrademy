import { db } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), {
      status: 400,
    });
  }

  const snapshot = await db
    .collection("email_verifications")
    .where("token", "==", token)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
    });
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  if (data.verified) {
    return new Response(JSON.stringify({ error: "Already verified" }), {
      status: 400,
    });
  }

  if (new Date() > data.expiresAt.toDate()) {
    return new Response(JSON.stringify({ error: "Token expired" }), {
      status: 400,
    });
  }

  await doc.ref.update({ verified: true });

  // Set cookie
  const cookieStore = await cookies();

  cookieStore.set("payment_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
    path: "/",
  });

  return Response.json({ success: true });
}