"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Pencil, Trash2, ExternalLink } from "lucide-react";

import React from "react";
import { Button } from "./ui/button";

interface AffiliateLink {
  id: string;
  productName: string;
  imageUrl: string;
  affiliateUrl: string;
  description: string;
  aiHint?: string;
  onEdit?: (link: AffiliateLink) => void;
  onDelete?: (id: string) => void;
}

export interface AffiliateLinkDisplayProps {
  link: AffiliateLink;
  onEdit?: (link: AffiliateLink) => void;
  onDelete?: (id: string) => void;
}

const AffiliateLinkDisplay: React.FC<AffiliateLinkDisplayProps> = ({
  link,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4">
      <Card
        key={link.id}
        className="hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden rounded-lg border"
      >
        <CardHeader>
          <CardTitle>{link.productName}</CardTitle>
        </CardHeader>
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={link.imageUrl}
            alt={link.productName}
            width={400}
            height={225}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={
              link.aiHint ||
              link.productName.toLowerCase().split(" ").slice(0, 2).join(" ")
            }
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).srcset = `https://placehold.co/400x225.png?text=${encodeURIComponent(
                link.productName.substring(0, 15)
              )}`;
              (
                e.target as HTMLImageElement
              ).src = `https://placehold.co/400x225.png?text=${encodeURIComponent(
                link.productName.substring(0, 15)
              )}`;
            }}
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <CardDescription className="text-sm line-clamp-3 leading-relaxed">
            {link.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 border-t bg-muted/30 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <Button
            onClick={() => {
              window.open(link.affiliateUrl, "_blank", "noopener,noreferrer");
            }}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            aria-label={`Promote ${link.productName}`}
          >
            Promote Now <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          {(onEdit || onDelete) &&
            typeof window !== "undefined" &&
            window.sessionStorage.getItem("role") === "admin" && (
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(link)}
                    aria-label={`Edit ${link.productName}`}
                    title="Edit Link"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(link.id)}
                    aria-label={`Delete ${link.productName}`}
                    title="Delete Link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AffiliateLinkDisplay;
