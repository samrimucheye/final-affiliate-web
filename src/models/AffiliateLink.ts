import mongoose, { Schema, Document } from "mongoose";

export interface IAffiliateLink extends Document {
  productName: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  userId?: string; // Optional if needed
  createdAt: Date;
  updatedAt: Date;
}

const AffiliateLinkSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    affiliateUrl: { type: String, required: true },
    userId: { type: String }, // Optional
  },
  { timestamps: true }
);

export default mongoose.models.AffiliateLink ||
  mongoose.model<IAffiliateLink>("AffiliateLink", AffiliateLinkSchema);
