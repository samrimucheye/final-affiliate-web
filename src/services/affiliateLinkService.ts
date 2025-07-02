// src/services/affiliateLinkService.ts
// This file is modified as Firebase Firestore functionality has been removed.
// Link management operations will be disabled or use static data.
"use server";

import type { AffiliateLink } from "@/services/affiliate-link";
// Firebase related imports are removed.
// serverTimestamp, Timestamp, FirestoreError etc. are no longer needed.
// revalidatePath is also not needed if data is static.

const defaultLinks: AffiliateLink[] = [
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
    link: "",
    onEdit: () => {},
    onDelete: () => {},
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
    link: "",
    onEdit: () => {},
    onDelete: () => {},
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
    link: "",
    onEdit: () => {},
    onDelete: () => {},
  },
];

export async function getAffiliateLinks(): Promise<AffiliateLink[]> {
  console.log(
    "AffiliateLinkService: Returning static default links as Firebase is removed."
  );
  // Simulate async operation if needed by other parts of the code
  await new Promise((resolve) => setTimeout(resolve, 100));
  return JSON.parse(JSON.stringify(defaultLinks)); // Return a deep copy
}

export async function addAffiliateLink(
  userId: string, // This parameter is kept for signature consistency, but not used
  linkData: Omit<AffiliateLink, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<{ id: string }> {
  console.warn(
    "AffiliateLinkService: addAffiliateLink called, but Firebase is removed. Operation disabled."
  );
  throw new Error(
    "FEATURE_DISABLED: Adding affiliate links is disabled as database functionality has been removed."
  );
  // return { id: `new-static-link-${Date.now()}` }; // Example if you wanted to fake it for UI
}

export async function updateAffiliateLink(
  linkId: string,
  linkData: Partial<Omit<AffiliateLink, "id" | "userId" | "createdAt">>
): Promise<void> {
  console.warn(
    `AffiliateLinkService: updateAffiliateLink called for ID ${linkId}, but Firebase is removed. Operation disabled.`
  );
  throw new Error(
    "FEATURE_DISABLED: Updating affiliate links is disabled as database functionality has been removed."
  );
}

export async function deleteAffiliateLink(linkId: string): Promise<void> {
  console.warn(
    `AffiliateLinkService: deleteAffiliateLink called for ID ${linkId}, but Firebase is removed. Operation disabled.`
  );
  throw new Error(
    "FEATURE_DISABLED: Deleting affiliate links is disabled as database functionality has been removed."
  );
}

// console.log("AffiliateLinkService: Firebase integration removed. Link operations are disabled.");
