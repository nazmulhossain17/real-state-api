import { Request, Response } from "express";
import { RealEstateListingService } from "./realState.services";

// Create a new listing
const createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const listing = await RealEstateListingService.createListing(req.body);
    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get a listing by ID
const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const listing = await RealEstateListingService.getListingById(
      req.params.id
    );
    if (!listing) {
      res.status(404).json({ success: false, message: "Listing not found" });
      return;
    }
    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get all listings
const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const listings = await RealEstateListingService.getAllListings();
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update a listing by ID
const updateListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const listing = await RealEstateListingService.updateListing(
      req.params.id,
      req.body
    );
    if (!listing) {
      res.status(404).json({ success: false, message: "Listing not found" });
      return;
    }
    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Delete a listing by ID
const deleteListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const listing = await RealEstateListingService.deleteListing(req.params.id);
    if (!listing) {
      res.status(404).json({ success: false, message: "Listing not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const RealEstateListingController = {
  createListing,
  getListingById,
  getAllListings,
  updateListing,
  deleteListing,
};
