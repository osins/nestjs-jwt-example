import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthGuard } from './auth/jwt.auth.guard'
import { APP_GUARD } from '@nestjs/core'



@Module({
  imports: [
    ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql' as const,
                host: configService.get<string>('DATABASE_HOST'),
                port: parseInt(configService.get<string>('DATABASE_PORT')),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASS'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [__dirname + '/entity/*{.ts}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    AuthModule, UsersModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },AppService],
})
export class AppModule {}
