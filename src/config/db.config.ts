import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      // database: this.config.get<string>('DB_NAME'),
      // host: this.config.get<string>('DB_HOST'),
      // username: this.config.get<string>('DB_USER'),
      // password: this.config.get<string>('DB_PASSWORD'),
      // port: Number(this.config.get<string>('DB_PORT')),
      url: this.config.get<string>('DB_URL'),
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
