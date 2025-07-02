import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import { connectToDB } from "@/lib/db";

export async function GET() {
  try {
    await connectToDB();
    const posts = await BlogPost.find();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
