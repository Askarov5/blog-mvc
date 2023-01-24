import { Schema, model, connect } from "mongoose";

export interface IArticle {
  author: string;
  article: string;
  imageUrl?: string;
  created_date: Date;
}

// Create a Schema.
export const ArticleSchema = new Schema<IArticle>({
  author: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

// Create a Model.
export const Article = model<IArticle>("Article", ArticleSchema);
