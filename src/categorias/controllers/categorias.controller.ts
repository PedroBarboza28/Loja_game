import { Categoria } from './../entities/categorias.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';

@Controller('/categorias')
export class CategoriasController {
  constructor (private readonly categoriasService: CategoriasService) {}

  @Get()
     @HttpCode(HttpStatus.OK) // Http Status 200
     findAll(): Promise<Categoria[]>{
         return this.categoriasService.findAll();
     }
 

     @Get('/:id')
     @HttpCode(HttpStatus.OK)
     findById (@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
     return this.categoriasService.findById(id);

     }

     @Get('/tipo/:tipo')
     @HttpCode(HttpStatus.OK)
     findBytipo(@Param('tipo') tipo: string): Promise<Categoria[]>{
     return this.categoriasService.findBytipo(tipo);
     }

     @Post()
     @HttpCode(HttpStatus.CREATED)
     create(@Body()categoria: Categoria): Promise<Categoria>{
      return this.categoriasService.create(categoria)
     }

     @Put()
     @HttpCode(HttpStatus.OK)
     update(@Body() categoria: Categoria): Promise<Categoria>{ 
     return this.categoriasService.update(categoria)
     }

     @Delete('/:id')
     @HttpCode(HttpStatus.NO_CONTENT)
     delete(@Param('id', ParseIntPipe) id: number){ 
     return this.categoriasService.delete(id)
     }
}