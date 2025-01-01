import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RealEstateModule } from './realState/real-state.module';

@Module({
  imports: [AuthModule, PrismaModule, RealEstateModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
