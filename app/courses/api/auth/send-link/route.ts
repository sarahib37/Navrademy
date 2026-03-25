import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { generateToken } from "@/lib/generateToken";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, courseId, courseTitle, courseAmount} = body;

    if (!email || !courseId || !courseTitle || !courseAmount) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const token = generateToken();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await db.collection("email_verifications").add({
      email,
      token,
      courseId,
      courseTitle, 
      courseAmount, 
      verified: false,
      expiresAt,
      createdAt: new Date(),
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          email: "navraecosystem@gmail.com",
          name: "Navrademy",
        },
        to: [{ email }],
        subject: "Verify your email to continue",
        htmlContent: `
          <p>Click below to verify your email:</p>
          <a href="${verifyUrl}">${verifyUrl}</a>
          <p>This link expires in 15 minutes.</p>
        `,
      }),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}