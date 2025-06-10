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
  id: string;

  /**
   * The name of the product.
   * Example: "High-Performance Laptop XYZ"
   */
  productName: string;

  /**
   * A brief description of the product.
   * Example: "Boost your productivity with this top-tier laptop..."
   */
  description: string;

  /**
   * The URL of the product image.
   * Example: "https://example.com/images/laptop.jpg"
   */
  imageUrl: string;

  /**
   * An AI hint for image generation or search if placeholder is used.
   * Example: "laptop computer"
   */
  aiHint?: string;

  /**
   * The affiliate URL that directs users to the product page with your affiliate tag.
   * Example: "https://amazon.com/dp/B08N5WRWNW?tag=youraffiliatetag-20"
   */
  affiliateUrl: string;

  /**
   * The ID of the user who created this affiliate link (now 'system' for static links).
   */
  userId?: string;

  /**
   * Timestamp (ISO string format) indicating when the link was created.
   * Example: "2023-10-27T10:30:00.000Z"
   */
  createdAt?: string;

  /**
   * Timestamp (ISO string format) indicating when the link was last updated.
   * Example: "2023-10-28T14:45:10.123Z"
   */
  updatedAt?: string;

  useLinks: () => {
    links: AffiliateLink[];
  };
}
