import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import { connectToDB } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const posts = await BlogPost.find({ categoryId: params.id }).sort({
      date: -1,
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
