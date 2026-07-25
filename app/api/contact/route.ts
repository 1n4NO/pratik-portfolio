import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Couldn't send the message right now. Try again in a moment." },
      { status: 500 }
    );
  }
}
