import { Module } from '@nestjs/common';
import configuration from './configuration/configuration';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
})
export class AppModule {}
