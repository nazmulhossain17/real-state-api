import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [PrismaModule, ConfigModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})

export class AuthModule {}