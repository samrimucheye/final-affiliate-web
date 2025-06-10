import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import AffiliateLink from "@/models/AffiliateLink";
import { connectToDB } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const data = await req.json();
  await connectToDB();
  const product = await AffiliateLink.create(data);
  return NextResponse.json(product);
}

export async function GET() {
  await connectToDB();
  const products = await AffiliateLink.find();
  return NextResponse.json(products);
}
