import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  async createListing(data: Prisma.RealEstateListingCreateInput) {
    try {
      const listing = await this.prisma.realEstateListing.create({ data });
      return {
        success: true,
        message: "Listing created successfully",
        data: listing,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async getAllListings() {
    try {
      const listings = await this.prisma.realEstateListing.findMany();
      return {
        success: true,
        message: "Listings retrieved successfully",
        data: listings,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async getListingById(id: string) {
    try {
      const listing = await this.prisma.realEstateListing.findUnique({ where: { id } });
      if (!listing) {
        throw new NotFoundException(`Listing with ID ${id} not found`);
      }
      return {
        success: true,
        message: "Listing retrieved successfully",
        data: listing,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async updateListing(id: string, data: Prisma.RealEstateListingUpdateInput) {
    try {
      const listing = await this.prisma.realEstateListing.update({
        where: { id },
        data,
      });
      return {
        success: true,
        message: "Listing updated successfully",
        data: listing,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async deleteListing(id: string) {
    try {
      await this.prisma.realEstateListing.delete({ where: { id } });
      return {
        success: true,
        message: `Listing with ID ${id} deleted successfully`,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  // Handle Prisma-specific errors and other errors gracefully
  private handlePrismaError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025": // Record not found
          throw new NotFoundException(error.meta?.cause || "Resource not found");
        case "P2002": // Unique constraint violation
          throw new BadRequestException("A unique constraint was violated");
        default:
          throw new BadRequestException("An unexpected database error occurred");
      }
    }
    throw new BadRequestException("An unexpected error occurred");
  }
}