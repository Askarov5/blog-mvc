import { Schema, model, connect } from "mongoose";

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: Number;
  created_date: Date;
}

export const ContactSchema = new Schema<IContact>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  phone: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

// Create a Model.
export const Contact = model<IContact>("Contacts", ContactSchema);
