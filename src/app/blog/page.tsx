"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag, CalendarDays } from "lucide-react";

const blogCategories = [
  {
    id: "electronics",
    name: "Electronics",
    description:
      "Explore the latest in electronic gadgets, reviews, and buying guides.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "gadgets tech",
  },
  {
    id: "home-goods",
    name: "Home & Lifestyle",
    description:
      "Discover essential and stylish items for your home, plus lifestyle tips.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "home decor",
  },
  {
    id: "books",
    name: "Books & Reading",
    description:
      "Find your next great read with our book reviews and recommendations.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "books library",
  },
  {
    id: "fashion",
    name: "Fashion & Style",
    description:
      "Stay trendy with our curated selection of clothing, accessories, and style guides.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "fashion style",
  },
];

// Expanded blog posts with more details
const blogPosts = [
  {
    id: "best-tv-2024",
    categoryId: "electronics",
    title: "The Ultimate Guide to the Best TVs of 2024",
    shortDescription:
      "Our top picks for the best televisions to buy this year, from budget-friendly to premium 8K models.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "television screen",
    date: "2024-07-15",
    author: "Tech Savvy Reviews",
  },
  {
    id: "cozy-blankets",
    categoryId: "home-goods",
    title: "Top 5 Cozy Blankets to Keep You Warm This Winter",
    shortDescription:
      "Stay warm and comfortable with these amazing blankets, perfect for snuggling up on the couch.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "cozy blanket",
    date: "2024-07-10",
    author: "Home Comforts Blog",
  },
  {
    id: "must-read-novels",
    categoryId: "books",
    title: "Must-Read Novels That Will Captivate You This Year",
    shortDescription:
      "Dive into these captivating novels that everyone is talking about, spanning various genres.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "books reading",
    date: "2024-07-05",
    author: "The Bookworm Chronicle",
  },
  {
    id: "summer-fashion-trends",
    categoryId: "fashion",
    title: "Summer Fashion Trends You Absolutely Need to Know",
    shortDescription:
      "Get ready for summer with the latest fashion trends, from vibrant colors to sustainable choices.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "summer fashion",
    date: "2024-06-28",
    author: "Style Hub Central",
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Explore Our Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to our blog! Discover a variety of articles, tips, and
          recommendations across different categories to enhance your affiliate
          marketing journey.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCategories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={category.aiHint}
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 bg-muted/30">
                <Button asChild variant="link" className="text-primary p-0">
                  <Link href={`/blog/category/${category.id}`}>
                    View Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">
          Latest Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group flex flex-col"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={post.aiHint}
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
                  <Tag className="h-3.5 w-3.5" />
                  <span>
                    {blogCategories.find((c) => c.id === post.categoryId)
                      ?.name || "General"}
                  </span>
                  <span className="mx-1">•</span>
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/post/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-sm mt-1 h-20 overflow-hidden text-ellipsis">
                  {post.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 mt-auto bg-muted/30">
                <Button asChild variant="default" size="sm">
                  <Link href={`/blog/post/${post.id}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
