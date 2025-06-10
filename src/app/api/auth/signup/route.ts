import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await connectToDB();

  const existing = await User.findOne({ email });
  if (existing)
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return NextResponse.json({ message: "User created", user });
}
