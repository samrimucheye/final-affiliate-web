"use client";

import { AffiliateLink } from "@/services/affiliate-link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  PlusCircle,
  AlertTriangle,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";
// import LinkManagement from "@/components/LinkManagement";
import AiDescription from "@/components/AiDescription";
import LinkManagement from "@/components/LinkManagement";

type ApiResponse = {
  data: AffiliateLink[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const [showLinkManagement, setShowLinkManagement] = useState(false);
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Fetch affiliate links from API with pagination
  const {
    data: apiData,
    isLoading: linksLoading,
    error: linksError,
    refetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["affiliateLinks", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/affiliate-links?page=${page}&limit=${pageSize}`
      );
      if (!res.ok) throw new Error("Failed to fetch links");
      return res.json();
    },
    // keepPreviousData: true, // Removed because not supported in current react-query version
  });

  const links = apiData?.data ?? [];
  const totalPages = apiData?.totalPages ?? 1;

  const loading = status === "loading" || linksLoading;

  const toggleLinkManagementForm = () => setShowLinkManagement((prev) => !prev);

  const handleEditLink = (link: AffiliateLink) => {
    setEditingLink(link);
    setShowLinkManagement(true);
  };

  const handleDeleteLink = (id: string) => {
    // Implement delete logic here
    fetch(`/api/affiliate-links/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete link");
        refetch();
      })
      .catch((err) => {
        alert(`Error deleting link: ${err.message}`);
      });
    alert(`Delete link with id: ${id}`);
  };

  const handleAddOrUpdateLink = async (linkData: Partial<AffiliateLink>) => {
    try {
      // If editing, send PUT; otherwise, POST
      const method = editingLink ? "PUT" : "POST";
      const url = editingLink
        ? `/api/affiliate-links/${editingLink.id}`
        : "/api/affiliate-links";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      });
      if (!res.ok) throw new Error("Failed to save link");
      setShowLinkManagement(false);
      setEditingLink(null);
      refetch();
    } catch (err: any) {
      alert(`Error saving link: ${err.message}`);
    }
  };

  const handleCancelEdit = () => {
    setShowLinkManagement(false);
    setEditingLink(null);
  };

  // Pagination controls
  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span className="px-2 text-sm">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );

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

      {!linksLoading && !linksError && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No affiliate links found. Add your first link!
              </div>
            ) : (
              links.map((link: AffiliateLink, idx) => (
                <Card
                  // key={link.id}
                  key={`link-${idx}`} // Use index as key for simplicity in this example
                  className="hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden rounded-lg border max-w-md w-full"
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
                      onClick={() => {
                        window.open(
                          link.affiliateUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                      aria-label={`Promote ${link.productName}`}
                    >
                      Promote Now <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    {(isAdmin || (user && user.email === link.userId)) && (
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditLink(link)}
                          aria-label={`Edit ${link.productName}`}
                          title="Edit Link"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteLink(link.id)}
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
              ))
            )}
          </div>
          {totalPages > 1 && <Pagination />}
        </>
      )}

      <div id="link-management-section" className="mt-8">
        {showLinkManagement && user && (
          <LinkManagement
            onLinkAddedOrUpdated={handleAddOrUpdateLink}
            editingLink={editingLink}
            onCancelEdit={handleCancelEdit}
            isSubmitting={false}
          />
        )}
      </div>

      {user && <AiDescription />}
    </div>
  );
}
