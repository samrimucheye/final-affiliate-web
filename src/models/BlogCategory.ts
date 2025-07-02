import mongoose, { Schema, model, models } from "mongoose";

const BlogCategorySchema = new Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    aiHint: String,
    amazonLink: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
    },
  },
  { timestamps: true }
);

export default models.BlogCategory || model("BlogCategory", BlogCategorySchema);
