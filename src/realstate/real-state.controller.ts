import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RealEstateService } from "./real-state.service";

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post('create-real-estate')
  async createListing(@Body() data: Prisma.RealEstateListingCreateInput) {
    return this.realEstateService.createListing(data);
  }

  @Get('real-estate')
  async getAllListings() {
    return this.realEstateService.getAllListings();
  }

  @Get(':id')
  async getListingById(@Param('id') id: string) {
    return this.realEstateService.getListingById(id);
  }

  @Put(':id')
  async updateListing(
    @Param('id') id: string,
    @Body() data: Prisma.RealEstateListingUpdateInput,
  ) {
    return this.realEstateService.updateListing(id, data);
  }

  @Delete(':id')
  async deleteListing(@Param('id') id: string) {
    return this.realEstateService.deleteListing(id);
  }
}