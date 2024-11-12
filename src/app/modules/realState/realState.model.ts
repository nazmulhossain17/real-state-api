import mongoose, { Document, Schema } from "mongoose";

// Define the interface
export interface IRealEstateListing extends Document {
  name: string;
  description: string;
  images: string[];
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

// Define the schema
const RealEstateListingSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
});

// Export the model
const RealEstateListing = mongoose.model<IRealEstateListing>(
  "RealEstateListing",
  RealEstateListingSchema
);
export default RealEstateListing;
