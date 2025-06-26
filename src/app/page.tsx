"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import LinkManagement from "@/components/LinkManagement";
import AiDescription from "@/components/AiDescription";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import AffiliateLinkDisplay from "@/components/AffiliateLinkDisplay";
import { AffiliateLink } from "@/services/affiliate-link";
// Implement or re-export the correct component here, or ensure the import is correct.
// This is a placeholder. Replace with the actual implementation or correct import.

// Default affiliate links data matching AffiliateLink[] type
const defaultLinksData: AffiliateLink[] = [
  {
    id: "default-link-1",
    productName: "High-Performance Laptop",
    description:
      "Boost your productivity with this top-tier laptop, perfect for work and play. Features the latest processor and a stunning display.",
    imageUrl: "https://placehold.co/300x200.png",
    aiHint: "laptop computer",
    affiliateUrl:
      "https://www.amazon.com/s?k=high+performance+laptop&_encoding=UTF8&tag=yourtag-20",
    userId: "system",
    createdAt: new Date("2024-01-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T10:00:00Z").toISOString(),
  },
  {
    id: "default-link-2",
    productName: "Wireless Noise-Cancelling Headphones",
    description:
      "Immerse yourself in sound with these comfortable, high-fidelity headphones. Long battery life and crystal-clear audio.",
    imageUrl: "https://placehold.co/300x200.png",
    aiHint: "headphones audio",
    affiliateUrl:
      "https://www.amazon.com/s?k=wireless+noise+cancelling+headphones&_encoding=UTF8&tag=yourtag-20",
    userId: "system",
    createdAt: new Date("2024-01-02T11:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-02T11:00:00Z").toISOString(),
  },
  {
    id: "default-link-3",
    productName: "Ergonomic Office Chair",
    description:
      "Support your back and improve posture with this adjustable ergonomic chair. Ideal for long hours of work or gaming.",
    imageUrl: "https://placehold.co/300x200.png",
    aiHint: "office chair furniture",
    affiliateUrl:
      "https://www.amazon.com/s?k=ergonomic+office+chair&_encoding=UTF8&tag=yourtag-20",
    userId: "system",
    createdAt: new Date("2024-01-03T12:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-03T12:00:00Z").toISOString(),
  },
];

// API helpers to call backend routes you implement to connect to MongoDB
async function getAffiliateLinks(): Promise<AffiliateLink[]> {
  const res = await fetch("/api/affiliate-links");
  if (!res.ok) throw new Error("Failed to fetch affiliate links");
  return res.json();
}

async function addAffiliateLink(
  linkData: Omit<AffiliateLink, "id" | "createdAt" | "updatedAt">
) {
  const res = await fetch("/api/affiliate-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) throw new Error("Failed to add affiliate link");
  return res.json();
}

async function updateAffiliateLink(id: string, linkData: AffiliateLink) {
  const res = await fetch(`/api/affiliate-links/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) throw new Error("Failed to update affiliate link");
  return res.json();
}

async function deleteAffiliateLink(id: string) {
  const res = await fetch(`/api/affiliate-links/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete affiliate link");
  // Use the AffiliateLink type from the service import above
}

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const isAdmin = user?.email === "admin@example.com"; // Adjust admin logic as needed

  const [showLinkManagement, setShowLinkManagement] = useState(false);
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);

  const queryClient = useQueryClient();

  const {
    data: links = [],
    isLoading: linksLoading,
    error: linksError,
  } = useQuery<AffiliateLink[], Error>({
    queryKey: ["affiliateLinks"],
    queryFn: getAffiliateLinks,
    enabled: true,
    initialData: defaultLinksData,
  });

  const loading = status === "loading" || linksLoading;

  // Add new link mutation
  const addLinkMutation = useMutation({
    mutationFn: (
      linkData: Omit<AffiliateLink, "id" | "createdAt" | "updatedAt">
    ) => {
      if (!user) throw new Error("User not authenticated");
      return addAffiliateLink({ ...linkData, userId: user.email || "" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliateLinks"] });
      toast({
        title: "Link Added!",
        description: "Your new affiliate link has been saved.",
      });
      setShowLinkManagement(false);
      setEditingLink(null);
    },
    onError: (error: Error) => {
      console.error("Error adding link on client:", error);
      toast({
        title: "Error Adding Link",
        description: error.message || "Could not add the link.",
        variant: "destructive",
      });
    },
  });

  // Update link mutation
  const updateLinkMutation = useMutation({
    mutationFn: (linkData: AffiliateLink) => {
      if (!user || (!isAdmin && user.email !== linkData.userId)) {
        throw new Error(
          "Unauthorized: You do not have permission to update this link."
        );
      }
      return updateAffiliateLink(linkData.id, linkData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliateLinks"] });
      toast({
        title: "Link Updated!",
        description: "The affiliate link has been successfully updated.",
      });
      setShowLinkManagement(false);
      setEditingLink(null);
    },
    onError: (error: Error) => {
      console.error("Error updating link on client:", error);
      toast({
        title: "Error Updating Link",
        description: error.message || "Could not update the link.",
        variant: "destructive",
      });
    },
  });

  // Delete link mutation
  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: string) => {
      if (!user || !isAdmin) {
        throw new Error(
          "Unauthorized: You do not have permission to delete links."
        );
      }
      return deleteAffiliateLink(linkId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliateLinks"] });
      toast({
        title: "Link Deleted!",
        description: "The affiliate link has been removed.",
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting link on client:", error);
      toast({
        title: "Error Deleting Link",
        description: error.message || "Could not delete the link.",
        variant: "destructive",
      });
    },
  });

  const handleAddOrUpdateLink = (
    linkData:
      | Omit<AffiliateLink, "id" | "createdAt" | "updatedAt">
      | AffiliateLink
  ) => {
    if ("id" in linkData && linkData.id) {
      if (user && (isAdmin || user.email === linkData.userId)) {
        updateLinkMutation.mutate(linkData as AffiliateLink);
      } else {
        toast({
          title: "Permission Denied",
          description: "You cannot edit this link.",
          variant: "destructive",
        });
      }
    } else {
      if (user) {
        addLinkMutation.mutate(
          linkData as Omit<AffiliateLink, "id" | "createdAt" | "updatedAt">
        );
      } else {
        toast({
          title: "Not Logged In",
          description: "Please log in to add a link.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteLink = (id: string) => {
    if (user && isAdmin) {
      deleteLinkMutation.mutate(id);
    } else {
      toast({
        title: "Permission Denied",
        description: "Only admins can delete links.",
        variant: "destructive",
      });
    }
  };

  const handleEditLink = (link: AffiliateLink) => {
    if (user && (isAdmin || user.email === link.userId)) {
      setEditingLink(link);
      setShowLinkManagement(true);
    } else {
      toast({
        title: "Permission Denied",
        description: "You cannot edit this link.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setShowLinkManagement(false);
  };

  const toggleLinkManagementForm = () => {
    if (showLinkManagement) {
      handleCancelEdit();
    } else {
      if (user) {
        setShowLinkManagement(true);
      } else {
        toast({
          title: "Login Required",
          description: "Please log in to add a new link.",
          variant: "default",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Skeleton className="h-9 w-64 mb-4 sm:mb-0" />
          <Skeleton className="h-11 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">
          Your Affiliate Links
        </h1>
        <p>
          {user
            ? ` Welcome, ${user.name || user.email}!`
            : " Please log in to add your links."}
        </p>
        {user && (
          <Button onClick={toggleLinkManagementForm} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            {showLinkManagement ? "Cancel" : "Add New Link"}
          </Button>
        )}
      </div>

      {linksError && (
        <div className="my-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
          <span>
            Error loading links: {linksError.message}. This could be due to
            missing backend API or database issues.
          </span>
        </div>
      )}

      {linksLoading && !linksError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-72 w-full rounded-lg" />
          ))}
        </div>
      )}
      {
        // md:grid-cols-2 lg:grid-cols-3
      }
      {!linksLoading && !linksError && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No affiliate links found. Add your first link!
            </div>
          ) : (
            links.map((link, idx) => (
              <AffiliateLinkDisplay
                key={idx}
                link={link}
                onDelete={handleDeleteLink}
                onEdit={handleEditLink}
                isAdmin={isAdmin}
              />
            ))
          )}
        </div>
      )}

      <div id="link-management-section" className="mt-8">
        {showLinkManagement && user && (
          <LinkManagement
            onLinkAddedOrUpdated={handleAddOrUpdateLink}
            editingLink={editingLink}
            onCancelEdit={handleCancelEdit}
            isSubmitting={
              addLinkMutation.status === "pending" ||
              updateLinkMutation.status === "pending"
            }
          />
        )}
      </div>

      {user && <AiDescription />}
    </div>
  );
}
