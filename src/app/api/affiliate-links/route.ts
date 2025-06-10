// app/api/affiliate-links/route.ts
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/models/AffiliateLink";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const link = await AffiliateLink.create(data);
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Error creating affiliate link:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

// GET all affiliate links
export async function GET() {
  try {
    await connectToDB();
    const links = await AffiliateLink.find({}).sort({ createdAt: -1 });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching affiliate links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
