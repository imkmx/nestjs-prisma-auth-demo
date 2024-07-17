import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { DatabaseConfig } from './database.config';
import { AppConfig } from './app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [AuthConfig, DatabaseConfig, AppConfig],
        }),
    ],
})
export class AppConfigModule {}