import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categorias.entity';
import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [TypeOrmModule],
})
export class CategoriaModule {}