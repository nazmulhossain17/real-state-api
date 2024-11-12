import express from "express";
import { RealEstateListingController } from "./realState.controller";

const router = express.Router();

router.post("/", RealEstateListingController.createListing);
router.get("/:id", RealEstateListingController.getListingById);
router.get("/", RealEstateListingController.getAllListings);
router.put("/:id", RealEstateListingController.updateListing);
router.delete("/:id", RealEstateListingController.deleteListing);

export default router;
