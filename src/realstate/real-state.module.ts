import { Module } from "@nestjs/common";
import { RealEstateController } from "./real-state.controller";
import { RealEstateService } from "./real-state.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    controllers: [RealEstateController],
    providers: [RealEstateService, PrismaService],
})

export class RealEstateModule {}