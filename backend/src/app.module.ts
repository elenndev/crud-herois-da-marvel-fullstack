import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database_uri'),
      }),
      inject: [ConfigService],
    }),
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
