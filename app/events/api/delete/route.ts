import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { delete_url } = await req.json();

    if (!delete_url) {
      return NextResponse.json({ error: "Missing delete_url" }, { status: 400 });
    }

    await fetch(delete_url);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}