import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './entities/jogos.entity';
import { JogosService } from './services/jogos.service';
import { JogosController } from './controllers/jogos.controller';
import { CategoriasService } from '../categorias/services/categorias.service';
import { CategoriaModule } from '../categorias/categorias.module';


@Module({
  imports: [TypeOrmModule.forFeature([Jogo]), CategoriaModule],
  controllers:[JogosController],
  providers: [JogosService, CategoriasService],
  exports: [TypeOrmModule],
})
export class JogosModule {}