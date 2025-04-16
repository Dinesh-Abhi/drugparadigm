import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DrugModalityModule } from './drug_modality/drug_modality.module';
import * as SuperTokensConfig from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlModule } from './config/mysql/mysql.module';
import { MysqlService } from './config/mysql/mysql.service';
import { MysqlDatabaseProviderModule } from './config/mysql/provider.module';
import { ConfigAppModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 10, // 10 seconds
      limit: 30, // 30 requests per ttl period
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigAppModule, // Use the ConfigModule
    MysqlDatabaseProviderModule,
    TypeOrmModule,
    MysqlModule,

    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: SuperTokensConfig.connectionUri,
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: SuperTokensConfig.appInfo,
    }),
    DrugModalityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
