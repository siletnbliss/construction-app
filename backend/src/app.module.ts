import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvService } from './common/services/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    MongooseModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (envService: EnvService) => {
        return {
          uri: envService.get('MONGO_URL'),
          autoCreate: true,
        };
      },
      inject: [EnvService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
