// src/services/affiliate-link.ts
// This interface defines the structure of an AffiliateLink object used throughout the application.

/**
 * Represents an affiliate link.
 * Timestamps are stored as ISO string representations.
 */
export interface AffiliateLink {
  /**
   * Unique identifier for the link.
   */

  /**
   * Timestamp (ISO string format) indicating when the link was last updated.
   * Example: "2023-10-28T14:45:10.123Z"
   */

  // useLinks: () => {
  //   links: AffiliateLink[];
  // };
  id: string;
  productName: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  affiliateUrl: string;
  userId: string;
  createdAt: string; // ISO string format
  link: string; // The actual affiliate link URL
  onEdit: (link: AffiliateLink) => void; // Function to handle editing the link,
  onDelete: (link: AffiliateLink) => void; // Function to handle deleting the link,
  updatedAt: string; // ISO string format userId, createdAt, updatedAt
  isAdmin?: boolean; // Optional flag to indicate if the user is an admin
  url?: string;
}
