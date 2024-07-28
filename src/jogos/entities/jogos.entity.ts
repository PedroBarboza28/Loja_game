import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categorias.entity';


@Entity({ name: 'tb_jogos' })

export class Jogo {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;
 
  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  @Column({ type: "decimal", precision:10, scale:2 })
  preco: number;

  @Column()
  foto: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.jogo, {
    onDelete: "CASCADE"
  })
  categoria: Categoria
}