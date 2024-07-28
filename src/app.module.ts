import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './jogos/entities/jogos.entity';
import { CategoriaModule } from './categorias/categorias.module';
import { Categoria } from './categorias/entities/categorias.entity';
import { JogosModule } from './jogos/jogos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '.753159Tata.',
      database: 'db_north_games',
      entities: [Categoria, Jogo],
      synchronize: true,
      logging: true,
  }),
  CategoriaModule,
  JogosModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
