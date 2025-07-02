import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import nodemailer from "nodemailer";
import { connectToDB } from "@/lib/db";

//forget password route

export async function POST(req: NextRequest) {
  await connectToDB();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generate reset token and expiry
  const resetToken = Math.random().toString(36).substring(2);
  const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiry;
  await user.save();

  // Check for email
  if (!email) {
    throw new Error("Missing email in request.");
  }

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,

    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>You requested a password reset.</p>
                     <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });

  return NextResponse.json({ message: "Password reset email sent" });
}
