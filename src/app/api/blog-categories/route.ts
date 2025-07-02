import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";

export async function GET() {
  try {
    await connectToDB();
    const categories = await BlogCategory.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
