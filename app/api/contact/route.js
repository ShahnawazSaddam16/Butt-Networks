import { connectToDB } from "@/lib/db";
import Message from "@/modal/message";
import { NextResponse } from "next/server";

// --- POST handler ---
export async function POST(req) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectToDB();
    await Message.create({ name, email, message, phone });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Internal error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
