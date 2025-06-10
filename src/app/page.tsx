"use client";

import React, { useState } from "react";
import AffiliateLinkDisplay from "@/components/AffiliateLinkDisplay";
import LinkManagement from "@/components/LinkManagement";
import AiDescription from "@/components/AiDescription";
import type { AffiliateLink } from "@/services/affiliate-link";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const defaultLinks: AffiliateLink[] = [
  /*...your static links...*/
];

// Fetch function
async function fetchAffiliateLinks(): Promise<AffiliateLink[]> {
  const res = await fetch("/api/affiliate-links");
  if (!res.ok) throw new Error("Failed to fetch links");
  return res.json();
}

export default function Home() {
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);
  const [showLinkManagement, setShowLinkManagement] = useState(false);
  const isAdmin = false;

  const {
    data: links = defaultLinks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["affiliate-links"],
    queryFn: fetchAffiliateLinks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  React.useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to load links",
        description: "Falling back to demo data.",
        variant: "destructive",
      });
    }
  }, [isError]);

  const handleAddOrUpdateLink = () => {
    toast({
      title: "Feature Disabled",
      description: "Link management is currently unavailable.",
      variant: "destructive",
    });
  };

  const handleDeleteLink = () => {
    toast({
      title: "Feature Disabled",
      description: "Deleting links is currently unavailable.",
      variant: "destructive",
    });
  };

  const handleEditLink = (link: AffiliateLink) => {
    toast({
      title: "Feature Disabled",
      description: "Editing links is currently unavailable.",
      variant: "destructive",
    });
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setShowLinkManagement(false);
  };

  const toggleLinkManagementForm = () => {
    // toast({
    //   title: "Feature Disabled",
    //   description: "Link management is currently unavailable.",
    //   variant: "destructive",
    // });

    setShowLinkManagement(!showLinkManagement);
    if (showLinkManagement) {
      // If form was open and is now closing
      setEditingLink(null); // Clear editing state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">
          Your Affiliate Links
        </h1>
        <Button onClick={toggleLinkManagementForm} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          {showLinkManagement ? "Cancel" : "Add New Link"}
        </Button>
      </div>

      {isLoading ? (
        <p>Loading links...</p>
      ) : isError ? (
        <p>Error loading links.</p>
      ) : (
        <AffiliateLinkDisplay
          isAdmin={isAdmin}
          onDelete={handleDeleteLink}
          onEdit={handleEditLink}
        />
      )}

      <div id="link-management-section" className="mt-8">
        {showLinkManagement && (
          <LinkManagement
            onLinkAddedOrUpdated={handleAddOrUpdateLink}
            editingLink={editingLink}
            onCancelEdit={handleCancelEdit}
            isAdmin={isAdmin}
            isSubmitting={false}
          />
        )}
        <AiDescription />
      </div>
    </div>
  );
}
