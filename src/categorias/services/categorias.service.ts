import { Categoria } from './../entities/categorias.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        jogo: true
      }
    });

  }
  
  async findById(id: number): Promise<Categoria> {

    let categoria = await this.categoriaRepository.findOne({
        where: {
            id
        },
        relations: {
            jogo: true
        }
    });

    if (!categoria)
        throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return categoria;
}

async findBytipo(tipo: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
        where: {
            tipo: ILike(`%${tipo}%`)
        },
        relations: {
            jogo: true
        }
    })
}

async create(Categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(Categoria);
}

async update(categoria: Categoria): Promise<Categoria> {

    let buscaCategoria = await this.findById(categoria.id);

    if (!buscaCategoria || !categoria.id)
        throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return await this.categoriaRepository.save(categoria);
}

async delete(id: number): Promise<DeleteResult> {

    let buscaCategoria = await this.findById(id);

    if (!buscaCategoria)
        throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

    return await this.categoriaRepository.delete(id);

}

}