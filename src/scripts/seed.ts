// scripts/seed.ts
import BlogCategory from "@/models/BlogCategory";
import BlogPost from "@/models/BlogPost";
import { connectToDB } from "@/lib/db";

async function seed() {
  try {
    await connectToDB();

    await BlogPost.deleteMany({});
    await BlogCategory.deleteMany({});

    const categories = await BlogCategory.insertMany([
      {
        name: "Electronics",
        description:
          "Explore the latest in electronic gadgets, reviews, and buying guides.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "gadgets tech",
      },
      {
        name: "Home & Lifestyle",
        description:
          "Discover essential and stylish items for your home, plus lifestyle tips.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "home decor",
      },
      {
        name: "Books & Reading",
        description:
          "Find your next great read with our book reviews and recommendations.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "books library",
      },
      {
        name: "Fashion & Style",
        description:
          "Stay trendy with our curated selection of clothing, accessories, and style guides.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "fashion style",
      },
    ]);

    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat.name, cat._id])
    );

    await BlogPost.insertMany([
      {
        title: "The Ultimate Guide to the Best TVs of 2024",
        shortDescription:
          "Our top picks for the best televisions to buy this year, from budget-friendly to premium 8K models.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "television screen",
        date: new Date("2024-07-15"),
        author: "Tech Savvy Reviews",
        categoryId: categoryMap["Electronics"],
      },
      {
        title: "Top 5 Cozy Blankets to Keep You Warm This Winter",
        shortDescription:
          "Stay warm and comfortable with these amazing blankets, perfect for snuggling up on the couch.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "cozy blanket",
        date: new Date("2024-07-10"),
        author: "Home Comforts Blog",
        categoryId: categoryMap["Home & Lifestyle"],
      },
      {
        title: "Must-Read Novels That Will Captivate You This Year",
        shortDescription:
          "Dive into these captivating novels that everyone is talking about, spanning various genres.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "books reading",
        date: new Date("2024-07-05"),
        author: "The Bookworm Chronicle",
        categoryId: categoryMap["Books & Reading"],
      },
      {
        title: "Summer Fashion Trends You Absolutely Need to Know",
        shortDescription:
          "Get ready for summer with the latest fashion trends, from vibrant colors to sustainable choices.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "summer fashion",
        date: new Date("2024-06-28"),
        author: "Style Hub Central",
        categoryId: categoryMap["Fashion & Style"],
      },
    ]);

    console.log("✅ Seed successful!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
