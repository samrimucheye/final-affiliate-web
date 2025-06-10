
'use client';

import { useRouter, useParams } from 'next/navigation'; // Use useParams from next/navigation
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Tag, CalendarDays } from 'lucide-react';

// Placeholder blog data (ensure consistency with blog/page.tsx)
const blogCategories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'home-goods', name: 'Home & Lifestyle' },
  { id: 'books', name: 'Books & Reading' },
  { id: 'fashion', name: 'Fashion & Style' },
];

const blogPosts = [
  {
    id: 'best-tv-2024',
    categoryId: 'electronics',
    title: 'The Ultimate Guide to the Best TVs of 2024',
    shortDescription: 'Our top picks for the best televisions to buy this year, from budget-friendly to premium 8K models.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'television screen',
    date: '2024-07-15',
    author: 'Tech Savvy Reviews',
    amazonLink: 'https://www.amazon.com/s?k=best+tv+2024&_encoding=UTF8&tag=yourtag-20',
  },
  {
    id: 'cozy-blankets',
    categoryId: 'home-goods',
    title: 'Top 5 Cozy Blankets to Keep You Warm This Winter',
    shortDescription: 'Stay warm and comfortable with these amazing blankets, perfect for snuggling up on the couch.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'cozy blanket',
    date: '2024-07-10',
    author: 'Home Comforts Blog',
    amazonLink: 'https://www.amazon.com/s?k=cozy+blankets&_encoding=UTF8&tag=yourtag-20',
  },
  {
    id: 'smart-home-gadgets',
    categoryId: 'electronics',
    title: 'Must-Have Smart Home Gadgets for a Modern Lifestyle',
    shortDescription: 'Upgrade your home with these innovative smart gadgets that add convenience and efficiency.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'smart home',
    date: '2024-07-12',
    author: 'Future Home Tech',
    amazonLink: 'https://www.amazon.com/s?k=smart+home+gadgets&_encoding=UTF8&tag=yourtag-20',
  },
   {
    id: 'must-read-novels',
    categoryId: 'books',
    title: 'Must-Read Novels That Will Captivate You This Year',
    shortDescription: 'Dive into these captivating novels that everyone is talking about, spanning various genres.',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'books reading',
    date: '2024-07-05',
    author: 'The Bookworm Chronicle',
    amazonLink: 'https://www.amazon.com/s?k=must+read+novels&_encoding=UTF8&tag=yourtag-20',
  },
];


const CategoryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams(); // Hook to get dynamic route parameters
  const categoryId = typeof params.categoryId === 'string' ? params.categoryId : '';

  const category = blogCategories.find(cat => cat.id === categoryId);
  const categoryPosts = blogPosts.filter(post => post.categoryId === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Category Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">The category you are looking for does not exist.</p>
                <Button onClick={() => router.push('/blog')} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Button onClick={() => router.push('/blog')} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Categories
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">
          Category: <span className="text-primary">{category.name}</span>
        </h1>
      </div>

      {categoryPosts.length === 0 ? (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground text-lg">No posts found in the "{category.name}" category yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for new articles!</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group flex flex-col">
              <Link href={`/blog/post/${post.id}`} className="block relative h-56 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={post.aiHint}
                />
              </Link>
              <CardHeader className="p-4">
                 <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
                  <CalendarDays className="h-3.5 w-3.5"/>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/post/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-sm mt-1 h-20 overflow-hidden text-ellipsis">
                  {post.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 mt-auto bg-muted/30 flex justify-between items-center">
                <Button asChild variant="default" size="sm">
                  <Link href={`/blog/post/${post.id}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                 <a href={post.amazonLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                    View Product
                  </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

    