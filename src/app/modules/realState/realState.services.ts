import RealEstateListing, { IRealEstateListing } from "./realState.model";

const createListing = async (
  data: IRealEstateListing
): Promise<IRealEstateListing> => {
  const listing = new RealEstateListing(data);
  return await listing.save();
};

// Get a listing by ID
const getListingById = async (
  id: string
): Promise<IRealEstateListing | null> => {
  return await RealEstateListing.findById(id);
};

// Get all listings
const getAllListings = async (): Promise<IRealEstateListing[]> => {
  return await RealEstateListing.find();
};

// Update a listing by ID
const updateListing = async (
  id: string,
  data: Partial<IRealEstateListing>
): Promise<IRealEstateListing | null> => {
  return await RealEstateListing.findByIdAndUpdate(id, data, { new: true });
};

// Delete a listing by ID
const deleteListing = async (
  id: string
): Promise<IRealEstateListing | null> => {
  return await RealEstateListing.findByIdAndDelete(id);
};

export const RealEstateListingService = {
  createListing,
  getListingById,
  getAllListings,
  updateListing,
  deleteListing,
};
