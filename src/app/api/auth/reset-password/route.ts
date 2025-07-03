import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/lib/db";

export const dynamic = "force-dynamic"; // Optional for Vercel/Edge

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and valid password are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = (await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    })) as
      | (typeof User.prototype & {
          password?: string;
          resetToken?: string | null;
          resetTokenExpires?: Date | null;
          save?: () => Promise<void>;
        })
      | null;

    if (!user || typeof user !== "object" || !("save" in user)) {
      return NextResponse.json(
        { error: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    return NextResponse.json({
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
