"use client";

import { useRouter, useParams } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
  UserCircle,
  Tag,
} from "lucide-react";

// Placeholder blog data (ensure consistency)
const blogCategories = [
  { id: "electronics", name: "Electronics" },
  { id: "home-goods", name: "Home & Lifestyle" },
  { id: "books", name: "Books & Reading" },
  { id: "fashion", name: "Fashion & Style" },
];

const blogPosts = [
  {
    id: "best-tv-2024",
    categoryId: "electronics",
    title: "The Ultimate Guide to the Best TVs of 2024",
    shortDescription:
      "Our top picks for the best televisions to buy this year, from budget-friendly to premium 8K models.",
    content:
      "In the ever-evolving world of home entertainment, choosing the right TV can be a daunting task. From OLED to QLED, 4K to 8K, the options are plentiful. This guide breaks down the top televisions of 2024, considering factors like picture quality, smart features, gaming performance, and overall value. We explore models from leading brands like Sony, LG, Samsung, and TCL, helping you find the perfect screen to elevate your viewing experience. Whether you're a cinephile, a hardcore gamer, or just looking for a reliable family TV, we've got you covered. We also delve into the latest display technologies and what they mean for your picture, ensuring you make an informed decision. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://placehold.co/800x450.png",
    aiHint: "television screen",
    date: "2024-07-15",
    author: "Tech Savvy Reviews",
    amazonLink:
      "https://www.amazon.com/s?k=best+tv+2024&_encoding=UTF8&tag=yourtag-20",
  },
  {
    id: "cozy-blankets",
    categoryId: "home-goods",
    title: "Top 5 Cozy Blankets to Keep You Warm This Winter",
    content:
      "As winter approaches, the quest for the perfect cozy blanket begins. We review the top 5 blankets that promise ultimate warmth and comfort. From luxurious sherpa fleece to breathable cotton weaves and innovative heated options, discover the ideal companion for chilly nights. We consider material quality, softness, durability, and ease of care. Whether you prefer a lightweight throw for an afternoon nap or a heavy-duty comforter for the coldest nights, our selection caters to every preference and budget. Get ready to snuggle up in style! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "https://placehold.co/800x450.png",
    aiHint: "cozy blanket",
    date: "2024-07-10",
    author: "Home Comforts Blog",
    amazonLink:
      "https://www.amazon.com/s?k=cozy+blankets&_encoding=UTF8&tag=yourtag-20",
  },
  {
    id: "must-read-novels",
    categoryId: "books",
    title: "Must-Read Novels That Will Captivate You This Year",
    content:
      "Embark on literary adventures with our curated list of must-read novels for the year. This selection spans genres from gripping thrillers and heartwarming contemporary fiction to thought-provoking science fiction and immersive historical sagas. We highlight critically acclaimed bestsellers and hidden gems alike, offering a diverse range of stories to lose yourself in. Discover new authors and revisit beloved storytellers. Each recommendation comes with a brief synopsis to pique your interest, ensuring your next favorite book is just a page turn away. Perfect for book clubs or solo reading sessions! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://placehold.co/800x450.png",
    aiHint: "books reading",
    date: "2024-07-05",
    author: "The Bookworm Chronicle",
    amazonLink:
      "https://www.amazon.com/s?k=must+read+novels&_encoding=UTF8&tag=yourtag-20",
  },
  {
    id: "summer-fashion-trends",
    categoryId: "fashion",
    title: "Summer Fashion Trends You Absolutely Need to Know",
    content:
      "Get ready to update your wardrobe with the hottest summer fashion trends. This season is all about vibrant colors, breathable fabrics, and statement accessories. We explore the key looks, from flowy sundresses and chic swimwear to versatile linen pieces and bold prints. Discover how to incorporate these trends into your personal style, whether you're heading to the beach, a summer festival, or a city brunch. We also touch on sustainable fashion choices and how to build a stylish yet conscious summer wardrobe. Stay cool and fashionable all season long! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://placehold.co/800x450.png",
    aiHint: "summer fashion",
    date: "2024-06-28",
    author: "Style Hub Central",
    amazonLink:
      "https://www.amazon.com/s?k=summer+fashion+trends&_encoding=UTF8&tag=yourtag-20",
  },
  {
    id: "smart-home-gadgets",
    categoryId: "electronics",
    title: "Must-Have Smart Home Gadgets for a Modern Lifestyle",
    shortDescription:
      "Upgrade your home with these innovative smart gadgets that add convenience and efficiency.",
    content:
      "Transform your living space into a futuristic haven with the latest smart home gadgets. This guide showcases essential devices that offer convenience, security, and energy efficiency. From smart speakers and displays that act as central hubs, to intelligent lighting systems that adapt to your mood, and advanced security cameras that keep your home safe. We also explore smart thermostats for optimal climate control and robotic vacuums that take the chore out of cleaning. Learn how these gadgets integrate with each other and how to choose the right ecosystem for your needs. Embrace the future of home automation! Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "https://placehold.co/800x450.png",
    aiHint: "smart home",
    date: "2024-07-12",
    author: "Future Home Tech",
    amazonLink:
      "https://www.amazon.com/s?k=smart+home+gadgets&_encoding=UTF8&tag=yourtag-20",
  },
];

const PostPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const postId = typeof params.postId === "string" ? params.postId : "";

  const post = blogPosts.find((p) => p.id === postId);
  const category = post
    ? blogCategories.find((c) => c.id === post.categoryId)
    : null;

  if (!post) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Post Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The blog post you are looking for does not exist or may have been
              moved.
            </p>
            <Button onClick={() => router.push("/blog")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <Button onClick={() => router.back()} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
      </Button>

      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            data-ai-hint={post.aiHint}
          />
        </div>
        <CardHeader className="p-6">
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-3 gap-x-4 gap-y-1">
            {category && (
              <Link
                href={`/blog/category/${category.id}`}
                className="hover:text-primary flex items-center"
              >
                <Tag className="mr-1.5 h-4 w-4" /> {category.name}
              </Link>
            )}
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <UserCircle className="mr-1.5 h-4 w-4" />
              {post.author}
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline">
          {/* Using dangerouslySetInnerHTML for demo purposes if content were HTML. For plain text, just {post.content} is fine.
              For production, sanitize HTML content if it comes from untrusted sources. */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br />"),
            }}
          />
        </CardContent>
        <CardFooter className="p-6 bg-muted/30">
          <Button asChild size="lg">
            <a href={post.amazonLink} target="_blank" rel="noopener noreferrer">
              View Product on Amazon <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostPage;
