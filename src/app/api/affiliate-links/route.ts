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
export async function GET(req: Request) {
  try {
    await connectToDB();

    // Get pagination params from query string
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      AffiliateLink.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      AffiliateLink.countDocuments({}),
    ]);

    return NextResponse.json({
      data: links,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching affiliate links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
