import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PerfumesModule } from './perfumes/perfumes.module';
import { PerfumesImagesModule } from './perfumes_images/perfumes_images.module';
import { PerfumesAccordsModule } from './perfumes_accords/perfumes_accords.module';
import { PerfumesSpecialForModule } from './perfumes_special_for/perfumes_special_for.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '3306'), 10),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASS', ''),
        database: configService.get<string>('DB_NAME', 'perfumes_db'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // ⚠️ en desarrollo puedes poner true
      }),
    }),
    PerfumesModule,
    PerfumesImagesModule,
    PerfumesAccordsModule,
    PerfumesSpecialForModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



/*import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesModule } from './perfumes/perfumes.module';
import { PerfumesImagesModule } from './perfumes_images/perfumes_images.module';
import { PerfumesAccordsModule } from './perfumes_accords/perfumes_accords.module';
import { PerfumesSpecialForModule } from './perfumes_special_for/perfumes_special_for.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',  
      database: 'perfumes_db',
      autoLoadEntities: true,
      synchronize: false, // importante, no queremos que modifique la BD
    }),
    PerfumesModule,
    PerfumesImagesModule,
    PerfumesAccordsModule,
    PerfumesSpecialForModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}*/
