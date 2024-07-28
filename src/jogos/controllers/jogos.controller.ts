import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { JogosService } from '../services/jogos.service';
import { Jogo } from '../entities/jogos.entity';

@Controller('/jogos')
export class JogosController {
  constructor(private readonly jogosService: JogosService) { }

  @Get()
  @HttpCode(HttpStatus.OK) // Http Status 200
  findAll(): Promise<Jogo[]> {
    return this.jogosService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Jogo>{
    return this.jogosService.findById(id)
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<Jogo[]>{
  return this.jogosService.findByName(nome)
}

@Get('/preco/menor/:menor')
@HttpCode(HttpStatus.OK)
  findValorMenor(@Param('menor') preco: number): Promise<Jogo[]> {
    return this.jogosService.findValorMenor(preco);
  }


  @Get('/preco/maior/:maior')
  @HttpCode(HttpStatus.OK)
    findValorMaior(@Param('maior') preco: number): Promise<Jogo[]> {
      return this.jogosService.findValorMaior(preco);
    }

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body()jogo: Jogo): Promise<Jogo>{
 return this.jogosService.create(jogo)
}

@Put()
@HttpCode(HttpStatus.OK)
update(@Body() jogo: Jogo): Promise<Jogo>{ 
return this.jogosService.update(jogo)
}


@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number){ 
return this.jogosService.delete(id)
}

}