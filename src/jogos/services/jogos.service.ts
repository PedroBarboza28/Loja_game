import { CategoriasService } from './../../categorias/services/categorias.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Jogo } from '../entities/jogos.entity';

@Injectable()
export class JogosService {
  [x: string]: any;

  constructor(
    @InjectRepository(Jogo)
    private jogoRepository: Repository<Jogo>,
    private categoriasService: CategoriasService,
  ) { }

  async findAll(): Promise<Jogo[]> {
    return await this.jogoRepository.find({
      relations:{
        categoria: true
      }
    })
  };

  async findById(id: number): Promise<Jogo> {

    let buscarJogo = await this.jogoRepository.findOne({
      where: {
        id
      },
      relations: {
        categoria: true
      }
    });

    if (!buscarJogo){
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
    }
    return buscarJogo;
  };

  async findByNome(nome: string): Promise<Jogo[]> {
    return await this.jogoRepository.find({
      where: {
        nome: ILike(`%${nome}%`)
      },
      relations: {
        categoria: true
      }

    })
  }

  async findValorMenor(preco: number): Promise<Jogo[]> {
    return await this.jogoRepository.find({
      where: {
        preco: LessThan(preco)
      },
      order: {
        preco: 'DESC'
      },
      relations: {
        categoria: true
      }
    });
  }

  async findValorMaior(preco: number): Promise<Jogo[]> {
  return await this.jogoRepository.find({
    where:{
      preco: MoreThan(preco)
    },
    order: { 
      preco: 'ASC'
  },
  relations:{

    categoria: true
    
  }
  });
}

  async create(jogo: Jogo): Promise<Jogo> {
    if(jogo.categoria){
      let categoria = await this.categoriasService.findById(jogo.categoria.id)

      if(!categoria)
        throw new HttpException("Tema não encontrado", HttpStatus.NOT_FOUND);
      return await this.jogoRepository.save(jogo)
    }
    return await this.jogoRepository.save(jogo)
  };

  async update(jogo: Jogo): Promise<Jogo> {
    let buscarJogo: Jogo = await this.findById(jogo.id);

    if (!buscarJogo || !jogo.id)

      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND)

      if(jogo.categoria){
        
        let categoria = await this.categoriasService.findById(jogo.categoria.id)
        
        if(!categoria)

          throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

          return await this.jogoRepository.save(jogo);
      }

    return await this.jogoRepository.save(jogo);
  }

  async delete(id: number): Promise<DeleteResult> {

    let buscarJogo = await this.findById(id);

    if (!buscarJogo)

      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);

    return await this.jogoRepository.delete(id);

  }
}