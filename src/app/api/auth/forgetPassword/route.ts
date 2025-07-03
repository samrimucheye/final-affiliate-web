import { NextResponse } from "next/server";
import User from "@/models/User";
import crypto from "crypto";
import { connectToDB } from "@/lib/db";
import { sendResetEmail } from "@/lib/email";

// Optional: enable dynamic rendering in Vercel (for DB-based routes)
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectToDB();
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.warn("Password reset requested for non-existent email:", email);
      // Don't reveal if user exists — send same response for security
      return NextResponse.json({
        message: "If an account exists, a reset link was sent.",
      });
    }

    // Create reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    await sendResetEmail(email, token);

    return NextResponse.json({
      message: "If an account exists, a reset link was sent.",
    });
  } catch (err: any) {
    console.error("Reset password request failed:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
