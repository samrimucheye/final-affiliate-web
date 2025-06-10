"use client";
import { useLinks } from "@/hooks/useLinks";

import type { AffiliateLink } from "@/services/affiliate-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface AffiliateLinkDisplayProps {
  isAdmin: boolean; // Will be false as Firebase is removed
  onDelete: (id: string) => void; // Will show "feature disabled"
  onEdit: (link: AffiliateLink) => void; // Will show "feature disabled"
}

const AffiliateLinkDisplay: React.FC<AffiliateLinkDisplayProps> = ({
  isAdmin,
  onDelete,
  onEdit,
}) => {
  const handlePromoteClick = (affiliateUrl: string) => {
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };
  // Remove the prop-based links check and use the hook instead
  const { data: fetchedLinks, isLoading } = useLinks();

  if (isLoading) {
    return (
      <Card className="text-center py-10">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Please wait while we load your affiliate links.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (!fetchedLinks || fetchedLinks.length === 0) {
    return (
      <Card className="text-center py-10">
        <CardHeader>
          <CardTitle>No Affiliate Links Available</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            It looks like there are no affiliate links to display.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fetchedLinks.map((link, index) => {
        const isDefaultLink = link.id?.startsWith("default-link-");

        return (
          <Card
            key={index}
            className="hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden rounded-lg border"
          >
            <CardHeader className="p-4">
              <CardTitle
                className="text-lg font-semibold leading-tight truncate"
                title={link.productName}
              >
                {link.productName}
              </CardTitle>
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
                  link.productName
                    .toLowerCase()
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
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
                onClick={() => handlePromoteClick(link.affiliateUrl)}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label={`Promote ${link.productName}`}
              >
                Promote Now <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              {isAdmin &&
                !isDefaultLink && ( // isAdmin will be false, so this block won't render
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(link)}
                      aria-label={`Edit ${link.productName}`}
                      title="Edit Link"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(link.id)}
                      aria-label={`Delete ${link.productName}`}
                      title="Delete Link"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default AffiliateLinkDisplay;
