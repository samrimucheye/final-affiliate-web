import { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: String,
    shortDescription: String,
    imageUrl: String,
    aiHint: String,
    date: Date,
    author: String,
    amazonLink: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
    }, // Optional field for category ID
  },
  { timestamps: true }
);

export default models.BlogPost || model("BlogPost", BlogPostSchema);
